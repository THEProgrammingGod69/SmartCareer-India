import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  initializeChallengesInFirestore,
  getChallengesByCareerInterest,
  getRecommendedChallenges,
  getUserProgress,
  submitChallenge,
  getUserCompletedChallenges,
  getLeaderboard,
  getChallengesBySkill,
  getMotivationalMessage
} from '../utils/careerChallengesData';

const ChallengesContext = createContext();

export const useChallenges = () => useContext(ChallengesContext);

export const ChallengesProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [recommendedChallenges, setRecommendedChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Initialize challenges in Firestore when the app starts
  useEffect(() => {
    const initializeChallenges = async () => {
      try {
        await initializeChallengesInFirestore();
      } catch (error) {
        console.error('Failed to initialize challenges:', error);
      }
    };

    initializeChallenges();
  }, []);

  // Load user progress when user changes
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        setUserProgress(null);
        setCompletedChallenges([]);
        setRecommendedChallenges([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get user progress
        const progress = await getUserProgress(currentUser.uid);
        setUserProgress(progress);

        // Get completed challenges
        const completed = await getUserCompletedChallenges(currentUser.uid);
        setCompletedChallenges(completed);

        // Get recommended challenges
        const recommended = await getRecommendedChallenges(currentUser.uid);
        setRecommendedChallenges(recommended);

        // Get leaderboard
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);

        setLoading(false);
      } catch (err) {
        console.error('Error loading user challenge data:', err);
        setError('Failed to load challenge data. Please try again later.');
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  // Submit a challenge
  const handleSubmitChallenge = async (challengeId, submission) => {
    if (!currentUser) {
      throw new Error('You must be logged in to submit a challenge');
    }

    try {
      const result = await submitChallenge(currentUser.uid, challengeId, submission);

      if (result.success) {
        // Refresh user data after submission
        const progress = await getUserProgress(currentUser.uid);
        setUserProgress(progress);

        const completed = await getUserCompletedChallenges(currentUser.uid);
        setCompletedChallenges(completed);

        const recommended = await getRecommendedChallenges(currentUser.uid);
        setRecommendedChallenges(recommended);

        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
      }

      return result;
    } catch (error) {
      console.error('Error submitting challenge:', error);
      throw error;
    }
  };

  // Get challenges by career interest
  const fetchChallengesByCareerInterest = async (careerInterest) => {
    try {
      return await getChallengesByCareerInterest(careerInterest);
    } catch (error) {
      console.error('Error fetching challenges by career interest:', error);
      throw error;
    }
  };

  // Get challenges by skill
  const fetchChallengesBySkill = async (skill) => {
    try {
      return await getChallengesBySkill(skill);
    } catch (error) {
      console.error('Error fetching challenges by skill:', error);
      throw error;
    }
  };

  // Get motivational message
  const getMotivationMessage = () => {
    return getMotivationalMessage();
  };

  // Refresh user data
  const refreshUserData = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      // Get user progress
      const progress = await getUserProgress(currentUser.uid);
      setUserProgress(progress);

      // Get completed challenges
      const completed = await getUserCompletedChallenges(currentUser.uid);
      setCompletedChallenges(completed);

      // Get recommended challenges
      const recommended = await getRecommendedChallenges(currentUser.uid);
      setRecommendedChallenges(recommended);

      // Get leaderboard
      const leaderboardData = await getLeaderboard();
      setLeaderboard(leaderboardData);

      setLoading(false);
    } catch (err) {
      console.error('Error refreshing user challenge data:', err);
      setError('Failed to refresh challenge data. Please try again later.');
      setLoading(false);
    }
  };

  const value = {
    userProgress,
    completedChallenges,
    recommendedChallenges,
    leaderboard,
    loading,
    error,
    submitChallenge: handleSubmitChallenge,
    getChallengesByCareerInterest: fetchChallengesByCareerInterest,
    getChallengesBySkill: fetchChallengesBySkill,
    getMotivationalMessage: getMotivationMessage,
    refreshUserData
  };

  return (
    <ChallengesContext.Provider value={value}>
      {children}
    </ChallengesContext.Provider>
  );
};