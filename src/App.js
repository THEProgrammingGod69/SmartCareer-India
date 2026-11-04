import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Layout from './components/layout/Layout';

// Main Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CareerQuiz from './pages/CareerQuiz';
import QuizResults from './pages/QuizResults';
import ExploreCareer from './pages/ExploreCareer';
import CareerDetail from './pages/CareerDetail';
import CareerTrends from './pages/CareerTrends';
import AICoach from './pages/AICoach';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PremiumFeatures from './pages/PremiumFeatures';

// Premium Features
import CognitiveFit from './pages/premium/CognitiveFit';
import BurnoutPrediction from './pages/premium/BurnoutPrediction';
import CareerSwitching from './pages/premium/CareerSwitching';
import RiskvsReward from './pages/premium/RiskvsReward';
import RiskvsRewardAnalyzer from './pages/premium/RiskvsRewardAnalyzer';
import PersonalizedCareerPath from './pages/premium/PersonalizedCareerPath';
import SmartResumeBuilder from './pages/premium/SmartResumeBuilder';
import CareerChallenges from './pages/premium/CareerChallenges';
import ChallengesPage from './pages/ChallengesPage';
import Scholarships from './pages/Scholarships';
import AskProfessional from './pages/premium/AskProfessional';
import CareerImpact from './pages/premium/careerimpact';
import LearningPath from './pages/premium/LearningPath';
import SkillTracker from './pages/premium/SkillTracker';
import MockInterview from './pages/premium/MockInterview';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* App Routes (no login required) */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="career-quiz" element={<CareerQuiz />} />
          <Route path="quiz-results" element={<QuizResults />} />
          <Route path="explore-careers" element={<ExploreCareer />} />
          <Route path="career/:id" element={<CareerDetail />} />
          <Route path="career-trends" element={<CareerTrends />} />
          <Route path="scholarships" element={<Scholarships />} />
          <Route path="ai-coach" element={<AICoach />} />
          <Route path="premium-features" element={<PremiumFeatures />} />
          {/* Premium Feature Routes */}
          <Route path="premium/ask-professional" element={<AskProfessional />} />
          <Route path="premium/risk-vs-reward" element={<RiskvsReward />} />
          <Route path="premium/risk-vs-reward-analyzer" element={<RiskvsRewardAnalyzer />} />
          <Route path="premium/cognitive-fit" element={<CognitiveFit />} />
          <Route path="premium/burnout-prediction" element={<BurnoutPrediction />} />
          <Route path="premium/career-switching" element={<CareerSwitching />} />
          <Route path="premium/personalized-career-path" element={<PersonalizedCareerPath />} />
          <Route path="premium/smart-resume" element={<SmartResumeBuilder />} />
          <Route path="premium/career-challenges" element={<CareerChallenges />} />
          <Route path="premium/career-impact" element={<CareerImpact />} />
          <Route path="learning-path" element={<LearningPath />} />
          <Route path="skill-tracker" element={<SkillTracker />} />
          <Route path="premium/mock-interview" element={<MockInterview />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;