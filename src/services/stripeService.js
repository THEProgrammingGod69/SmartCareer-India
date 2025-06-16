/* eslint-disable no-unused-vars */
// Stripe Payment Service for Premium Features
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// In a production environment, these API calls would be handled by a secure backend
// This is a frontend implementation for demonstration purposes only

const stripeService = {
  // Initialize Stripe with public key
  initStripe: async () => {
    if (!window.Stripe) {
      console.error('Stripe.js not loaded');
      return null;
    }
    
    // Replace with your actual Stripe publishable key
    return window.Stripe('pk_test_51OxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  },

  // Create a checkout session for subscription
  createCheckoutSession: async (userId, priceId, customerEmail) => {
    try {
      // In a real implementation, this would be a secure API call to your backend
      // which would then create a Stripe checkout session
      
      // For demo purposes, we'll simulate creating a session
      const sessionRef = await addDoc(collection(db, 'stripe_customers', userId, 'checkout_sessions'), {
        price: priceId,
        success_url: window.location.origin + '/premium-features?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: window.location.origin + '/premium-features',
        customer_email: customerEmail,
        created: serverTimestamp(),
      });

      // Get the document ID for reference
      const sessionId = sessionRef.id;
      
      // In a real implementation, this would redirect to Stripe
      // For our functional demo, we'll return a direct success path
      return {
        sessionId: sessionId,
        url: window.location.origin + '/premium-features?session_id=' + sessionId,
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  // Check if user has an active subscription
  checkSubscriptionStatus: async (userId) => {
    try {
      // In a real implementation, this would check the actual subscription status in Stripe
      // For demo purposes, we'll check a simulated status in Firestore
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists() && userDoc.data().subscription) {
        const subscription = userDoc.data().subscription;
        return {
          active: subscription.status === 'active',
          plan: subscription.plan,
          current_period_end: subscription.current_period_end?.toDate() || null,
          cancel_at_period_end: subscription.cancel_at_period_end || false,
        };
      }
      
      return { active: false };
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return { active: false, error: error.message };
    }
  },

  // Update user's premium status after successful payment
  updatePremiumStatus: async (userId, subscriptionDetails) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Update user document with subscription details
      await updateDoc(userRef, {
        isPremium: true,
        subscription: {
          status: 'active',
          plan: subscriptionDetails.plan,
          current_period_end: subscriptionDetails.current_period_end,
          cancel_at_period_end: false,
          updated_at: serverTimestamp(),
        },
      });

      return true;
    } catch (error) {
      console.error('Error updating premium status:', error);
      return false;
    }
  },

  // Cancel subscription
  cancelSubscription: async (userId, subscriptionId) => {
    try {
      // In a real implementation, this would call your backend to cancel the subscription in Stripe
      // For demo purposes, we'll just update the local status
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        'subscription.cancel_at_period_end': true,
        'subscription.updated_at': serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }
  },

  // Get available subscription plans
  getSubscriptionPlans: async () => {
    // In a real implementation, these would be fetched from Stripe
    // For demo purposes, we'll return hardcoded plans
    return [
      {
        id: 'price_monthly',
        name: 'Monthly Premium',
        price: 3999, // Changed to 39.99 rupees (stored in paise)
        interval: 'month',
        currency: 'INR',
        description: 'Full access to all premium features',
      },
      {
        id: 'price_yearly',
        name: 'Yearly Premium',
        price: 35000, // Changed to 350 rupees (stored in paise)
        interval: 'year',
        currency: 'INR',
        description: 'Full access to all premium features at a discounted rate',
        discount: '27%', // Updated discount percentage
      },
    ];
  },
};

export default stripeService;
