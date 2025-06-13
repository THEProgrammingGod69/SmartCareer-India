import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Main Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CareerQuiz from './pages/CareerQuiz';
import QuizResults from './pages/QuizResults';
import ExploreCareer from './pages/ExploreCareer_fixed';
import CareerDetail from './pages/CareerDetail_fixed';
import CareerTrends from './pages/CareerTrends';
import AICoach from './pages/AICoach';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PremiumFeatures from './pages/PremiumFeatures';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';


// Theme is now managed by ThemeContext

// Premium Features
import CareerSimulation from './pages/premium/CareerSimulation';
import CognitiveFit from './pages/premium/CognitiveFit';
import BurnoutPrediction from './pages/premium/BurnoutPrediction';
import CareerSwitching from './pages/premium/CareerSwitching';
import RiskvsReward from './pages/premium/RiskvsReward';
import RiskvsRewardAnalyzer from './pages/premium/RiskvsRewardAnalyzer';
import PersonalizedCareerPath from './pages/premium/PersonalizedCareerPath';
import SmartResumeBuilder from './pages/premium/SmartResumeBuilder';
import CareerChallenges from './pages/premium/CareerChallenges';
import ChallengesPage from './pages/ChallengesPage';
import AskProfessional from './pages/premium/AskProfessional';
import CareerImpact from './pages/premium/careerimpact';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="career-quiz" element={
            <ProtectedRoute>
              <CareerQuiz />
            </ProtectedRoute>
          } />
          <Route path="quiz-results" element={
            <ProtectedRoute>
              <QuizResults />
            </ProtectedRoute>
          } />
          <Route path="explore-careers" element={
            <ProtectedRoute>
              <ExploreCareer />
            </ProtectedRoute>
          } />
          <Route path="career/:id" element={
            <ProtectedRoute>
              <CareerDetail />
            </ProtectedRoute>
          } />
          <Route path="career-trends" element={
            <ProtectedRoute>
              <CareerTrends />
            </ProtectedRoute>
          } />
          <Route path="ai-coach" element={
            <ProtectedRoute>
              <AICoach />
            </ProtectedRoute>
          } />
          <Route path="premium-features" element={
            <ProtectedRoute>
              <PremiumFeatures />
            </ProtectedRoute>
          } />
          {/* Premium Feature Routes */}
          <Route path="premium/career-simulation" element={
            <ProtectedRoute>
              <CareerSimulation />
            </ProtectedRoute>
          } />
          <Route path="premium/ask-professional" element={
            <ProtectedRoute>
              <AskProfessional />
            </ProtectedRoute>
          } />
          <Route path="premium/risk-vs-reward" element={
            <ProtectedRoute>
              <RiskvsReward />
            </ProtectedRoute>
          } />
          <Route path="premium/risk-vs-reward-analyzer" element={
            <ProtectedRoute>
              <RiskvsRewardAnalyzer />
            </ProtectedRoute>
          } />
          <Route path="premium/cognitive-fit" element={
            <ProtectedRoute>
              <CognitiveFit />
            </ProtectedRoute>
          } />
          <Route path="premium/burnout-prediction" element={
            <ProtectedRoute>
              <BurnoutPrediction />
            </ProtectedRoute>
          } />
          <Route path="premium/career-switching" element={
            <ProtectedRoute>
              <CareerSwitching />
            </ProtectedRoute>
          } />
          <Route path="premium/personalized-career-path" element={
            <ProtectedRoute>
              <PersonalizedCareerPath />
            </ProtectedRoute>
          } />
          <Route path="premium/smart-resume" element={
            <ProtectedRoute>
              <SmartResumeBuilder />
            </ProtectedRoute>
          } />
          <Route path="premium/career-challenges" element={
            <ProtectedRoute>
              <CareerChallenges />
            </ProtectedRoute>
          } />
          <Route path="premium/career-impact" element={
            <ProtectedRoute>
              <CareerImpact />
            </ProtectedRoute>
          } />
          <Route path="challenges" element={
            <ProtectedRoute>
              <ChallengesPage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="admin-user-management" element={
            <ProtectedRoute>
              <AdminUserManagement />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;