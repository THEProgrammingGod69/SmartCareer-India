/* eslint-disable no-unused-vars */
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, arrayUnion, increment } from 'firebase/firestore';
import { careerChallenges, getRecommendedChallenges } from '../utils/careerChallengesData';

// Get user challenges data
export const getUserChallengesData = async (userId) => {
  try {
    const userChallengesRef = doc(db, 'userChallenges', userId);
    const userChallengesDoc = await getDoc(userChallengesRef);
    
    if (userChallengesDoc.exists()) {
      return userChallengesDoc.data();
    } else {
      // Initialize user challenges data if it doesn't exist
      const initialData = {
        points: 0,
        badges: [],
        completedChallenges: [],
        submissions: [],
        lastUpdated: new Date()
      };
      
      await setDoc(userChallengesRef, initialData);
      return initialData;
    }
  } catch (error) {
    console.error('Error getting user challenges data:', error);
    throw error;
  }
};

// Submit a challenge
export const submitChallenge = async (userId, challengeId, submission) => {
  try {
    // Find the challenge
    const challenge = careerChallenges.find(c => c.id === challengeId);
    
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    const userChallengesRef = doc(db, 'userChallenges', userId);
    
    // Get current user data
    const userData = await getUserChallengesData(userId);
    
    // Check if challenge is already completed
    if (userData.completedChallenges.includes(challengeId)) {
      return {
        success: false,
        message: 'You have already completed this challenge.'
      };
    }
    
    // Update user challenges data
    await updateDoc(userChallengesRef, {
      points: increment(challenge.points),
      completedChallenges: arrayUnion(challengeId),
      badges: userData.badges.includes(challenge.badge) 
        ? userData.badges 
        : [...userData.badges, challenge.badge],
      submissions: arrayUnion({
        challengeId,
        submission,
        submittedAt: new Date(),
        points: challenge.points,
        badge: challenge.badge
      }),
      lastUpdated: new Date()
    });
    
    // Return success response
    return {
      success: true,
      points: challenge.points,
      totalPoints: userData.points + challenge.points,
      badge: !userData.badges.includes(challenge.badge) ? challenge.badge : null,
      message: `Great job! You've earned ${challenge.points} points for completing this challenge!`
    };
  } catch (error) {
    console.error('Error submitting challenge:', error);
    throw error;
  }
};

// Get recommended challenges for a user
export const getRecommendedChallengesForUser = async (userId, careerInterest) => {
  try {
    // Get user data
    const userData = await getUserChallengesData(userId);
    
    // Get recommended challenges
    return getRecommendedChallenges(careerInterest, userData.completedChallenges);
  } catch (error) {
    console.error('Error getting recommended challenges:', error);
    // Return default recommendations if there's an error
    return getRecommendedChallenges(careerInterest, []);
  }
};

// Get next challenge message
export const getNextChallengeMessage = async (userId, userName, careerInterest) => {
  try {
    // Get user data
    const userData = await getUserChallengesData(userId);
    
    // Get recommended challenges
    const recommendations = getRecommendedChallenges(careerInterest, userData.completedChallenges);
    
    if (recommendations.length === 0) {
      return `Great work, ${userName}! You've completed all available challenges.`;
    }
    
    return `You're doing great, ${userName}! Let's now tackle the '${recommendations[0].title}' challenge!`;
  } catch (error) {
    console.error('Error getting next challenge message:', error);
    return `Keep up the good work, ${userName}!`;
  }
};
