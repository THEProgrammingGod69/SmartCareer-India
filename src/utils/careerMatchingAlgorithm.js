// Career Matching Algorithm
// This utility provides functions to match quiz answers with career options
// Enhanced with innovative features: AR/VR simulations, blockchain tracking, cognitive dissonance reduction,
// swarm intelligence, and neurocognitive pattern analysis

import { sampleCareers } from '../pages/ExploreCareer_fixed';
import { expandedCareers } from '../data/expandedCareers';

// Combine all career data for matching
const allCareers = [...sampleCareers];

// AR/VR Career Simulation data
const arVrSimulations = {
  available: true,
  simulationTypes: {
    immersive: 'Full VR experience with haptic feedback',
    augmented: 'AR overlay on real-world environments',
    mixed: 'Combination of VR and AR elements'
  },
  careers: {
    'Data Scientist': {
      simulationType: 'mixed',
      description: 'Experience a day analyzing complex datasets and building predictive models',
      duration: '30 minutes',
      skills: ['Data Analysis', 'Programming', 'Problem Solving']
    },
    'UX/UI Designer': {
      simulationType: 'augmented',
      description: 'Design interfaces and test usability in a simulated environment',
      duration: '25 minutes',
      skills: ['Visual Design', 'User Testing', 'Prototyping']
    },
    'Full Stack Developer': {
      simulationType: 'immersive',
      description: 'Build a web application from scratch in a collaborative environment',
      duration: '45 minutes',
      skills: ['Coding', 'Debugging', 'System Architecture']
    },
    'Cybersecurity Analyst': {
      simulationType: 'immersive',
      description: 'Detect and respond to simulated cyber attacks in real-time',
      duration: '40 minutes',
      skills: ['Threat Detection', 'Security Analysis', 'Incident Response']
    }
  }
};

// Blockchain Career Milestone Tracker
const blockchainMilestoneTracker = {
  available: true,
  features: [
    'Immutable record of career achievements',
    'Verified skill certifications',
    'Transparent education credentials',
    'Project portfolio validation',
    'Secure sharing with potential employers'
  ],
  milestoneTypes: [
    'Education completion',
    'Skill certification',
    'Project completion',
    'Work experience',
    'Awards and recognition'
  ]
};

// Swarm Intelligence Career Suggestion System
const swarmIntelligenceSystem = {
  available: true,
  description: 'Leverages collective career paths of similar users to provide recommendations',
  dataPoints: [
    'Career transitions of similar profiles',
    'Skill acquisition patterns',
    'Education-to-career pathways',
    'Industry movement trends',
    'Satisfaction metrics across career stages'
  ]
};

// Cognitive Dissonance Reduction System
const cognitiveDissonanceSystem = {
  available: true,
  description: 'AI-powered system to help users resolve career decision conflicts',
  conflictTypes: [
    'Value conflicts between career options',
    'Skill-interest misalignment',
    'Short-term vs long-term goals',
    'Security vs passion tradeoffs',
    'Location vs opportunity conflicts'
  ],
  resolutionStrategies: [
    'Comparative analysis of conflicting options',
    'Value prioritization exercises',
    'Future self visualization',
    'Pros/cons weighted decision matrix',
    'Incremental transition planning'
  ]
};

// Neurocognitive Pattern Analysis
const neurocognitiveAnalysis = {
  available: true,
  description: 'Analyzes user interaction patterns to detect underlying preferences',
  metrics: [
    'Response timing variations',
    'Hesitation patterns on specific questions',
    'Answer revision frequency',
    'Question dwelling time',
    'Consistency across related questions'
  ],
  insights: [
    'Unconscious career preferences',
    'Hidden skill affinities',
    'Emotional responses to career options',
    'Decision confidence levels',
    'Cognitive biases in career selection'
  ]
};

// Define weights for different question categories
const CATEGORY_WEIGHTS = {
  personality: 0.25,  // p1-p7 questions
  generalSkills: 0.2, // s1-s5 questions
  technicalSkills: 0.2, // t1-t5 questions
  interests: 0.25, // i1-i7 questions
  workEnvironment: 0.1, // w1-w5 questions
  priorities: 0.1, // c1-c4 questions
  education: 0.1 // e1-e3 questions
};

// Career traits mapping to quiz questions
const CAREER_TRAIT_MAPPING = {
  // Personality traits mapping
  'p1': { high: ['Team-oriented', 'Collaborative', 'Social'], low: ['Independent', 'Autonomous', 'Self-directed'] },
  'p2': { high: ['Analytical', 'Problem-solver', 'Logical'], low: ['Intuitive', 'Spontaneous'] },
  'p3': { high: ['Structured', 'Process-oriented', 'Detail-oriented'], low: ['Creative', 'Innovative', 'Flexible'] },
  'p4': { high: ['Risk-taker', 'Entrepreneurial', 'Innovative'], low: ['Cautious', 'Methodical', 'Risk-averse'] },
  'p5': { high: ['Leadership', 'Decisive', 'Assertive'], low: ['Supportive', 'Collaborative', 'Team player'] },
  'p6': { high: ['Mentoring', 'Supportive', 'Empathetic'], low: ['Task-focused', 'Results-oriented'] },
  'p7': { high: ['Organized', 'Planner', 'Strategic'], low: ['Adaptable', 'Flexible', 'Spontaneous'] },
  
  // Skills mapping
  's1': { high: ['Data Analysis', 'Statistical Analysis', 'Research'], low: [] },
  's2': { high: ['Communication', 'Teaching', 'Presentation'], low: [] },
  's3': { high: ['Design', 'Creative', 'Visual Thinking'], low: [] },
  's4': { high: ['Project Management', 'Organization', 'Leadership'], low: [] },
  's5': { high: ['Negotiation', 'Sales', 'Persuasion'], low: [] },
  
  // Technical skills mapping
  't1': { high: ['Programming', 'Software Development', 'Coding'], low: [] },
  't2': { high: ['Data Analysis', 'Business Intelligence', 'Analytics'], low: [] },
  't3': { high: ['Graphic Design', 'UI/UX', 'Digital Content Creation'], low: [] },
  't4': { high: ['Troubleshooting', 'Technical Support', 'Problem Solving'], low: [] },
  't5': { high: ['Financial Analysis', 'Accounting', 'Budgeting'], low: [] },
  
  // Industry interests mapping
  'i1': { high: ['Technology', 'Computing', 'IT'], low: [] },
  'i2': { high: ['Creative Arts', 'Design', 'Media'], low: [] },
  'i3': { high: ['Business', 'Finance', 'Entrepreneurship'], low: [] },
  'i4': { high: ['Healthcare', 'Medicine', 'Social Services'], low: [] },
  'i5': { high: ['Environment', 'Sustainability', 'Conservation'], low: [] },
  'i6': { high: ['Education', 'Research', 'Academia'], low: [] },
  'i7': { high: ['Engineering', 'Manufacturing', 'Construction'], low: [] },
  
  // Work environment mapping
  'w1': { high: ['Fast-paced', 'Dynamic', 'High-energy'], low: ['Steady-paced', 'Methodical', 'Calm'] },
  'w2': { high: ['Work-life Balance', 'Flexible', 'Stable'], low: ['Career-focused', 'Ambitious', 'Driven'] },
  'w3': { high: ['Travel', 'Mobile', 'Field-based'], low: ['Location-stable', 'Office-based'] },
  'w4': { high: ['Team-based', 'Collaborative', 'Social'], low: ['Independent', 'Autonomous', 'Self-directed'] },
  'w5': { high: ['High-pressure', 'Deadline-driven', 'Fast-paced'], low: ['Low-pressure', 'Measured-pace', 'Relaxed'] },
  
  // Career priorities mapping
  'c1': { high: ['High-paying', 'Lucrative', 'Financial'], low: [] }, // Salary importance
  'c2': { high: ['Stable', 'Secure', 'Established'], low: [] }, // Job security importance
  'c3': { high: ['Growth-oriented', 'Advancement', 'Progressive'], low: [] }, // Career growth importance
  'c4': { high: ['Social Impact', 'Meaningful', 'Purpose-driven'], low: [] }, // Social impact importance
  
  // Education mapping
  'edu_levels': [
    { value: 1, level: 'High School' },
    { value: 2, level: 'Diploma/Certificate' },
    { value: 3, level: "Bachelor's Degree" },
    { value: 4, level: "Master's Degree" },
    { value: 5, level: 'Doctorate/PhD' }
  ]
};

/**
 * Calculate career matches based on quiz answers
 * @param {Object} answers - The quiz answers object
 * @param {Object} interactionData - Optional data about user's interaction patterns
 * @returns {Array} - Sorted array of career matches with match percentages
 */
export const calculateCareerMatches = (answers, interactionData = null) => {
  if (!answers || Object.keys(answers).length === 0) {
    return [];
  }

  // Extract personality traits from answers
  const personalityTraits = extractPersonalityTraits(answers);
  
  // Extract skills from answers
  const skills = extractSkills(answers);
  
  // Extract interests from answers
  const interests = extractInterests(answers);
  
  // Apply neurocognitive pattern analysis if interaction data is available
  let neurocognitiveInsights = {};
  if (interactionData && neurocognitiveAnalysis.available) {
    neurocognitiveInsights = analyzeInteractionPatterns(interactionData);
  }
  
  // Calculate match scores for each career
  const careerMatches = allCareers.map(career => {
    // Standard matching algorithm
    let matchScore = calculateMatchScore(career, personalityTraits, skills, interests, answers);
    
    // Apply swarm intelligence if available
    if (swarmIntelligenceSystem.available) {
      const swarmBoost = calculateSwarmIntelligenceBoost(career, answers);
      matchScore = matchScore * 0.85 + swarmBoost * 0.15; // 15% weight to swarm intelligence
    }
    
    // Apply neurocognitive insights if available
    if (Object.keys(neurocognitiveInsights).length > 0) {
      const neurocognitiveBoost = calculateNeurocognitiveBoost(career, neurocognitiveInsights);
      matchScore = matchScore * 0.9 + neurocognitiveBoost * 0.1; // 10% weight to neurocognitive insights
    }
    
    return {
      ...career,
      matchPercentage: Math.round(matchScore * 100),
      hasArVrSimulation: arVrSimulations.careers[career.title] ? true : false,
      hasDissonanceAnalysis: cognitiveDissonanceSystem.available,
      hasBlockchainTracking: blockchainMilestoneTracker.available
    };
  });
  
  // Sort by match percentage (highest first)
  return careerMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

/**
 * Extract personality traits from quiz answers
 * @param {Object} answers - The quiz answers object
 * @returns {Array} - Array of personality traits
 */
const extractPersonalityTraits = (answers) => {
  const traits = [];
  
  // Process personality questions (p1-p7)
  for (let i = 1; i <= 7; i++) {
    const questionId = `p${i}`;
    const answer = answers[questionId];
    
    if (answer && answer >= 4) { // High score (4-5)
      traits.push(...(CAREER_TRAIT_MAPPING[questionId]?.high || []));
    } else if (answer && answer <= 2) { // Low score (1-2)
      traits.push(...(CAREER_TRAIT_MAPPING[questionId]?.low || []));
    }
  }
  
  return traits;
};

/**
 * Extract skills from quiz answers
 * @param {Object} answers - The quiz answers object
 * @returns {Array} - Array of skills
 */
const extractSkills = (answers) => {
  const skills = [];
  
  // Process general skills questions (s1-s5)
  for (let i = 1; i <= 5; i++) {
    const questionId = `s${i}`;
    const answer = answers[questionId];
    
    if (answer && answer >= 4) { // High skill level (4-5)
      skills.push(...(CAREER_TRAIT_MAPPING[questionId]?.high || []));
    }
  }
  
  // Process technical skills questions (t1-t5)
  for (let i = 1; i <= 5; i++) {
    const questionId = `t${i}`;
    const answer = answers[questionId];
    
    if (answer && answer >= 4) { // High skill level (4-5)
      skills.push(...(CAREER_TRAIT_MAPPING[questionId]?.high || []));
    }
  }
  
  return skills;
};

/**
 * Extract interests from quiz answers
 * @param {Object} answers - The quiz answers object
 * @returns {Array} - Array of interests
 */
const extractInterests = (answers) => {
  const interests = [];
  
  // Process interest questions (i1-i7)
  for (let i = 1; i <= 7; i++) {
    const questionId = `i${i}`;
    const answer = answers[questionId];
    
    if (answer && answer >= 4) { // High interest level (4-5)
      interests.push(...(CAREER_TRAIT_MAPPING[questionId]?.high || []));
    }
  }
  
  return interests;
};

/**
 * Calculate match score for a career based on user traits, skills, and interests
 * @param {Object} career - The career to calculate match for
 * @param {Array} personalityTraits - User's personality traits
 * @param {Array} skills - User's skills
 * @param {Array} interests - User's interests
 * @param {Object} answers - All quiz answers for additional matching
 * @returns {Number} - Match score between 0 and 1
 */
const calculateMatchScore = (career, personalityTraits, skills, interests, answers) => {
  if (!career.quizParams) {
    return 0.5; // Default score for careers without matching parameters
  }
  
  // Calculate personality match
  const personalityMatch = calculateTraitMatch(
    personalityTraits, 
    career.quizParams.personalityTraits || []
  );
  
  // Calculate skills match
  const skillsMatch = calculateTraitMatch(
    skills, 
    career.quizParams.requiredSkills || []
  );
  
  // Calculate interests match
  const interestsMatch = calculateTraitMatch(
    interests, 
    career.quizParams.interestAreas || []
  );
  
  // Calculate education match
  const educationMatch = calculateEducationMatch(answers.e1, career);
  
  // Calculate work environment match
  const workEnvMatch = calculateWorkEnvironmentMatch(answers, career);
  
  // Calculate priorities match (salary, growth, etc.)
  const prioritiesMatch = calculatePrioritiesMatch(answers, career);
  
  // Weighted average of all match components
  const weightedScore = (
    (personalityMatch * CATEGORY_WEIGHTS.personality) +
    (skillsMatch * CATEGORY_WEIGHTS.generalSkills) +
    (interestsMatch * CATEGORY_WEIGHTS.interests) +
    (educationMatch * CATEGORY_WEIGHTS.education) +
    (workEnvMatch * CATEGORY_WEIGHTS.workEnvironment) +
    (prioritiesMatch * CATEGORY_WEIGHTS.priorities)
  ) / (
    CATEGORY_WEIGHTS.personality +
    CATEGORY_WEIGHTS.generalSkills +
    CATEGORY_WEIGHTS.interests +
    CATEGORY_WEIGHTS.education +
    CATEGORY_WEIGHTS.workEnvironment +
    CATEGORY_WEIGHTS.priorities
  );
  
  // Ensure score is between 0.4 and 0.95 to avoid extreme scores
  return Math.min(0.95, Math.max(0.4, weightedScore));
};

/**
 * Calculate match between two sets of traits
 * @param {Array} userTraits - User's traits
 * @param {Array} careerTraits - Career's required traits
 * @returns {Number} - Match score between 0 and 1
 */
const calculateTraitMatch = (userTraits, careerTraits) => {
  if (!careerTraits || careerTraits.length === 0) {
    return 0.5; // Neutral score if no traits to match
  }
  
  if (!userTraits || userTraits.length === 0) {
    return 0.3; // Low score if user has no matching traits
  }
  
  // Count how many career traits match with user traits
  let matchCount = 0;
  for (const careerTrait of careerTraits) {
    if (userTraits.some(trait => 
      trait.toLowerCase().includes(careerTrait.toLowerCase()) || 
      careerTrait.toLowerCase().includes(trait.toLowerCase())
    )) {
      matchCount++;
    }
  }
  
  // Calculate match percentage
  return matchCount / careerTraits.length;
};

/**
 * Calculate education match
 * @param {Number} userEducationLevel - User's education level (1-5)
 * @param {Object} career - Career to match against
 * @returns {Number} - Match score between 0 and 1
 */
const calculateEducationMatch = (userEducationLevel, career) => {
  if (!userEducationLevel || !career.education) {
    return 0.5; // Neutral score if data is missing
  }
  
  // Simple education matching based on keywords
  const educationStr = Array.isArray(career.education) 
    ? career.education.join(' ') 
    : career.education;
  
  // Check if user's education level meets career requirements
  if ((userEducationLevel >= 4) && (educationStr.includes('Master') || educationStr.includes('PhD'))) {
    return 1.0; // Perfect match for advanced degrees
  } else if ((userEducationLevel >= 3) && educationStr.includes('Bachelor')) {
    return 0.9; // Good match for bachelor's
  } else if ((userEducationLevel >= 2) && (educationStr.includes('Diploma') || educationStr.includes('Certificate'))) {
    return 0.7; // Decent match for diploma/certificate
  } else if ((userEducationLevel >= 1) && (!educationStr.includes('Bachelor') && !educationStr.includes('Master'))) {
    return 0.5; // Possible match for high school if no higher education required
  } else {
    return 0.3; // Low match if education requirements not met
  }
};

/**
 * Calculate work environment match
 * @param {Object} answers - Quiz answers
 * @param {Object} career - Career to match against
 * @returns {Number} - Match score between 0 and 1
 */
const calculateWorkEnvironmentMatch = (answers, career) => {
  // This would be more sophisticated in a real implementation
  // For now, we'll use a simplified approach
  
  // Default to moderate match
  let matchScore = 0.5;
  
  // Increment score based on work environment preferences
  // This is a simplified example - a real implementation would be more comprehensive
  if ((career.category === 'Technology') && (answers.i1 >= 4)) {
    matchScore += 0.2;
  } else if ((career.category === 'Design') && (answers.i2 >= 4)) {
    matchScore += 0.2;
  } else if ((career.category === 'Finance') && (answers.i3 >= 4)) {
    matchScore += 0.2;
  } else if ((career.category === 'Healthcare') && (answers.i4 >= 4)) {
    matchScore += 0.2;
  }
  
  // Cap at 1.0
  return Math.min(1.0, matchScore);
};

/**
 * Calculate priorities match (salary, growth, etc.)
 * @param {Object} answers - Quiz answers
 * @param {Object} career - Career to match against
 * @returns {Number} - Match score between 0 and 1
 */
const calculatePrioritiesMatch = (answers, career) => {
  // Default to moderate match
  let matchScore = 0.5;
  
  // Salary importance (c1)
  if (answers.c1 >= 4) { // High importance on salary
    // Check if career has high salary
    if ((career.salary && (career.salary.includes('20,00,000'))) || 
        (career.salary && (career.salary.includes('25,00,000')))) {
      matchScore += 0.15;
    } else if (career.salary && career.salary.includes('5,00,000')) {
      matchScore -= 0.1; // Penalize low salary if salary is important
    }
  }
  
  // Growth importance (c3)
  if (answers.c3 >= 4) { // High importance on growth
    if (career.growth && (career.growth.includes('High') || career.growth.includes('high'))) {
      matchScore += 0.15;
    } else if (career.growth && career.growth.includes('Low')) {
      matchScore -= 0.1; // Penalize low growth if growth is important
    }
  }
  
  // Social impact importance (c4)
  if (answers.c4 >= 4) { // High importance on social impact
    if (career.category === 'Healthcare' || 
        career.category === 'Education' || 
        career.category === 'Non-profit') {
      matchScore += 0.15;
    }
  }
  
  // Ensure score is between 0.2 and 1.0
  return Math.min(1.0, Math.max(0.2, matchScore));
};

/**
 * Analyze user interaction patterns for neurocognitive insights
 * @param {Object} interactionData - Data about user's quiz interactions
 * @returns {Object} - Neurocognitive insights
 */
const analyzeInteractionPatterns = (interactionData) => {
  // This would contain complex analysis in a real implementation
  // For now, we'll return a simplified version
  const insights = {};
  
  if (interactionData.responseTimes) {
    // Analyze which questions took longer to answer
    const slowestResponses = Object.entries(interactionData.responseTimes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
      
    insights.hesitationAreas = slowestResponses;
  }
  
  if (interactionData.revisions) {
    // Questions that were revised multiple times indicate uncertainty
    insights.uncertaintyAreas = Object.keys(interactionData.revisions)
      .filter(q => interactionData.revisions[q] > 1);
  }
  
  return insights;
};

/**
 * Calculate boost from swarm intelligence data
 * @param {Object} career - Career to calculate boost for
 * @param {Object} answers - User's quiz answers
 * @returns {Number} - Boost value between 0 and 1
 */
const calculateSwarmIntelligenceBoost = (career, answers) => {
  // In a real implementation, this would query a database of user paths
  // For now, we'll use a simplified approach based on career popularity
  const popularCareers = ['Data Scientist', 'Full Stack Developer', 'UX/UI Designer'];
  
  if (popularCareers.includes(career.title)) {
    return 0.8; // Popular career gets a boost
  }
  
  // Check if this career is a common transition for people with similar interests
  const userInterests = Object.keys(answers)
    .filter(q => q.startsWith('i') && answers[q] >= 4)
    .map(q => CAREER_TRAIT_MAPPING[q]?.high || [])
    .flat();
    
  // Simple check if career category matches user interests
  if (userInterests.some(interest => 
    career.category.toLowerCase().includes(interest.toLowerCase()) ||
    interest.toLowerCase().includes(career.category.toLowerCase())
  )) {
    return 0.6; // Career matches interests from similar users
  }
  
  return 0.3; // Default boost
};

/**
 * Calculate boost from neurocognitive insights
 * @param {Object} career - Career to calculate boost for
 * @param {Object} insights - Neurocognitive insights
 * @returns {Number} - Boost value between 0 and 1
 */
const calculateNeurocognitiveBoost = (career, insights) => {
  let boost = 0.5; // Default neutral boost
  
  // Check if user hesitated on questions related to this career's field
  if (insights.hesitationAreas) {
    const relevantHesitations = insights.hesitationAreas.filter(q => {
      // Check if hesitation was on a question related to this career
      if (q.startsWith('i') && CAREER_TRAIT_MAPPING[q]) {
        const traits = CAREER_TRAIT_MAPPING[q].high;
        return traits.some(trait => 
          career.category.includes(trait) || 
          (career.quizParams?.interestAreas || []).includes(trait)
        );
      }
      return false;
    });
    
    // Hesitation could indicate interest or uncertainty
    // For simplicity, we'll interpret it as interest
    if (relevantHesitations.length > 0) {
      boost += 0.2;
    }
  }
  
  return Math.min(1.0, boost);
};

/**
 * Get detailed information for a career
 * @param {Number} careerId - The ID of the career
 * @returns {Object} - Detailed career information with enhanced features
 */
export const getCareerDetails = (careerId) => {
  // First check expanded careers
  const expandedCareer = expandedCareers.find(career => career.id === careerId);
  let careerInfo = expandedCareer || sampleCareers.find(career => career.id === careerId);
  
  if (careerInfo) {
    // Add enhanced feature information
    return {
      ...careerInfo,
      arVrSimulation: arVrSimulations.careers[careerInfo.title] || null,
      blockchainTracking: blockchainMilestoneTracker.available ? {
        available: true,
        milestoneTypes: blockchainMilestoneTracker.milestoneTypes
      } : null,
      cognitiveDissonanceAnalysis: cognitiveDissonanceSystem.available ? {
        available: true,
        conflictTypes: cognitiveDissonanceSystem.conflictTypes
      } : null
    };
  }
  
  return null;
};

/**
 * Save quiz results to user profile with blockchain verification option
 * @param {Object} quizResults - The quiz results to save
 * @param {String} userId - The user ID to save results for
 * @param {Boolean} useBlockchain - Whether to use blockchain for verification (default: false)
 * @returns {Boolean} - Success status
 */
export const saveQuizResults = (quizResults, userId, useBlockchain = false) => {
  // In a real app, this would save to a database and potentially to blockchain
  const savedResults = JSON.parse(localStorage.getItem('savedQuizResults') || '{}');
  
  const resultData = {
    date: new Date().toISOString(),
    results: quizResults.slice(0, 5), // Save top 5 matches
    blockchainVerified: false
  };
  
  // If blockchain tracking is enabled and requested
  if (blockchainMilestoneTracker.available && useBlockchain) {
    // In a real implementation, this would create a blockchain record
    // For now, we'll just simulate it
    resultData.blockchainVerified = true;
    resultData.blockchainId = `bct-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    resultData.verificationUrl = `https://career-blockchain.example.com/verify/${resultData.blockchainId}`;
  }
  
  savedResults[userId] = resultData;
  localStorage.setItem('savedQuizResults', JSON.stringify(savedResults));
  return true;
};

/**
 * Get saved quiz results for a user
 * @param {String} userId - The user ID to get results for
 * @returns {Object} - The saved quiz results
 */
export const getSavedQuizResults = (userId) => {
  const savedResults = JSON.parse(localStorage.getItem('savedQuizResults') || '{}');
  return savedResults[userId] || null;
};

/**
 * Get AR/VR simulation details for a career
 * @param {String} careerTitle - The title of the career
 * @returns {Object|null} - AR/VR simulation details or null if not available
 */
export const getArVrSimulation = (careerTitle) => {
  return arVrSimulations.careers[careerTitle] || null;
};

/**
 * Analyze cognitive dissonance between two career options
 * @param {Number} careerId1 - First career ID
 * @param {Number} careerId2 - Second career ID
 * @returns {Object} - Analysis of conflicts and resolution strategies
 */
export const analyzeCognitiveDissonance = (careerId1, careerId2) => {
  if (!cognitiveDissonanceSystem.available) {
    return { available: false };
  }
  
  const career1 = getCareerDetails(careerId1);
  const career2 = getCareerDetails(careerId2);
  
  if (!career1 || !career2) {
    return { error: 'One or both careers not found' };
  }
  
  // Identify conflicts between the two careers
  const conflicts = [];
  
  // Salary differences
  if (career1.salary !== career2.salary) {
    conflicts.push({
      type: 'Financial considerations',
      description: `${career1.title} and ${career2.title} have different salary ranges`,
      resolution: 'Consider your financial goals and lifestyle requirements'
    });
  }
  
  // Skill set differences
  const uniqueSkills1 = career1.skills.filter(skill => !career2.skills.includes(skill));
  const uniqueSkills2 = career2.skills.filter(skill => !career1.skills.includes(skill));
  if (uniqueSkills1.length > 0 || uniqueSkills2.length > 0) {
    conflicts.push({
      type: 'Skill requirements',
      description: 'These careers require different skill sets',
      career1Skills: uniqueSkills1,
      career2Skills: uniqueSkills2,
      resolution: 'Evaluate which skills align better with your strengths and interests'
    });
  }
  
  // Growth potential differences
  if (career1.growth !== career2.growth) {
    conflicts.push({
      type: 'Growth potential',
      description: `${career1.title} has ${career1.growth} growth while ${career2.title} has ${career2.growth} growth`,
      resolution: 'Consider your long-term career aspirations and industry trends'
    });
  }
  
  // Education requirements
  if (career1.education !== career2.education) {
    conflicts.push({
      type: 'Education requirements',
      description: 'These careers have different educational prerequisites',
      career1Education: career1.education,
      career2Education: career2.education,
      resolution: 'Consider your current education level and willingness to pursue further education'
    });
  }
  
  return {
    available: true,
    career1: { id: career1.id, title: career1.title },
    career2: { id: career2.id, title: career2.title },
    conflicts,
    resolutionStrategies: cognitiveDissonanceSystem.resolutionStrategies,
    recommendedStrategy: cognitiveDissonanceSystem.resolutionStrategies[Math.floor(Math.random() * cognitiveDissonanceSystem.resolutionStrategies.length)]
  };
};

/**
 * Track career milestone in blockchain
 * @param {String} userId - User ID
 * @param {Object} milestone - Milestone details
 * @returns {Object} - Blockchain transaction details
 */
export const trackCareerMilestone = (userId, milestone) => {
  if (!blockchainMilestoneTracker.available) {
    return { available: false };
  }
  
  // In a real implementation, this would create a blockchain transaction
  // For now, we'll simulate it
  const transaction = {
    id: `bct-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    timestamp: new Date().toISOString(),
    milestoneType: milestone.type,
    milestoneData: milestone.data,
    verified: true,
    verificationUrl: `https://career-blockchain.example.com/verify/milestone/${Date.now()}`
  };
  
  // Store in local storage for demo purposes
  const savedMilestones = JSON.parse(localStorage.getItem('careerMilestones') || '{}');
  if (!savedMilestones[userId]) {
    savedMilestones[userId] = [];
  }
  savedMilestones[userId].push(transaction);
  localStorage.setItem('careerMilestones', JSON.stringify(savedMilestones));
  
  return transaction;
};

/**
 * Get user's tracked career milestones
 * @param {String} userId - User ID
 * @returns {Array} - List of tracked milestones
 */
export const getUserMilestones = (userId) => {
  const savedMilestones = JSON.parse(localStorage.getItem('careerMilestones') || '{}');
  return savedMilestones[userId] || [];
};