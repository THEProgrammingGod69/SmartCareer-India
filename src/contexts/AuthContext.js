import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoles, setUserRoles] = useState({ isPremium: false, isAdmin: false });
  const [loading, setLoading] = useState(true);
  
  // Create or update user document in Firestore
  async function createUserDocument(user, additionalData = {}) {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { email, displayName, photoURL } = user;
      try {
        await setDoc(userRef, {
          email,
          displayName: displayName || additionalData.displayName || '',
          photoURL: photoURL || '',
          createdAt: serverTimestamp(),
          isPremium: false,
          isAdmin: false,
          ...additionalData
        });
      } catch (error) {
        console.error('Error creating user document', error);
      }
    }
    
    return userRef;
  }

  // Fetch user roles from Firestore
  async function fetchUserRoles(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Temporarily grant premium access to all users without changing admin status
        setUserRoles({
          isPremium: true, // Force premium to true for all users
          isAdmin: userData.isAdmin || false,
          subscription: userData.subscription || {
            status: 'active',
            plan: 'temporary_access',
            current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          }
        });
        return { ...userData, isPremium: true };
      }
      
      return { isPremium: true, isAdmin: false };
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return { isPremium: true, isAdmin: false };
    }
  }

  // Update user's premium status
  async function updatePremiumStatus(isPremium, subscriptionDetails = null) {
    try {
      if (!currentUser) return false;
      
      const userRef = doc(db, 'users', currentUser.uid);
      
      const updateData = {
        isPremium,
        updatedAt: serverTimestamp(),
      };
      
      if (subscriptionDetails) {
        updateData.subscription = subscriptionDetails;
      }
      
      await updateDoc(userRef, updateData);
      
      // Update local state
      setUserRoles(prev => ({
        ...prev,
        isPremium,
        subscription: subscriptionDetails || prev.subscription
      }));
      
      return true;
    } catch (error) {
      console.error('Error updating premium status:', error);
      return false;
    }
  }

  // Grant admin access to a user (admin only function)
  async function grantAdminAccess(uid) {
    try {
      if (!currentUser || !userRoles.isAdmin) return false;
      
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        isAdmin: true,
        updatedAt: serverTimestamp(),
      });
      
      return true;
    } catch (error) {
      console.error('Error granting admin access:', error);
      return false;
    }
  }

  // Grant premium access to a user by email (admin only function)
  async function grantPremiumByEmail(email, duration = 12) { // duration in months
    try {
      if (!currentUser || !userRoles.isAdmin) return false;
      
      // Find user by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, message: 'User not found' };
      }
      
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, 'users', userDoc.id);
      
      // Calculate expiration date
      const now = new Date();
      const expirationDate = new Date(now.setMonth(now.getMonth() + duration));
      
      await updateDoc(userRef, {
        isPremium: true,
        subscription: {
          status: 'active',
          plan: 'admin_granted',
          current_period_end: expirationDate,
          cancel_at_period_end: true,
          updated_at: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      });
      
      return { success: true, message: `Premium access granted to ${email} for ${duration} months` };
    } catch (error) {
      console.error('Error granting premium access by email:', error);
      return { success: false, message: error.message };
    }
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function updateUserProfile(user, data) {
    return updateProfile(user, data);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Create user document if it doesn't exist
        await createUserDocument(user);
        
        // Fetch user roles
        await fetchUserRoles(user.uid);
      } else {
        // Reset roles when logged out
        setUserRoles({ isPremium: false, isAdmin: false });
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRoles,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    updateUserProfile,
    updatePremiumStatus,
    grantAdminAccess,
    grantPremiumByEmail,
    fetchUserRoles
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}