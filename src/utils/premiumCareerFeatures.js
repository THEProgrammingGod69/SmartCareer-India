// Premium Career Features
// This utility provides advanced career guidance features including:
// - Career Simulation (AR/VR)
// - Cognitive Career Fit Analysis
// - Burnout & Lifestyle Prediction
// - Smart Learning Path Generator
// - Career Mentorship Platform
// - Career Re-evaluation Engine
// - Global Career Compatibility Score
// - Gamified Career Challenges
// - Personal Career Journal
// - Risk vs. Reward Analyzer
// - AI Career Impact Forecaster
// - Real-Time Career Opportunity Feed
// - Skill-Gap Identifier + Auto-Fill Courses
// - Alternate Career Persona Generator
// - AI Role Model Interview
// - Smart Resume Builder (Career-Based)
// - Micro-Career Explorer
// - Peer Career Tracker
// - Career Switching Engine
// - Confidential Career Coach (AI Therapist Mode)

// Import career data
import { sampleCareers } from '../pages/ExploreCareer_fixed';
import { expandedCareers } from '../data/expandedCareers';

// Combine all career data
const allCareers = [...sampleCareers];

// ========== CAREER SIMULATION (AR/VR) ==========

/**
 * Get available AR/VR career simulations for a specific career
 * @param {String} careerTitle - The title of the career
 * @returns {Object|null} - Simulation data or null if not available
 */
// export const getCareerSimulation = (careerTitle) => {
  const simulations = {
    'Data Scientist': {
      simulationType: 'mixed',
      description: 'Experience a day analyzing complex datasets and building predictive models',
      duration: '30 minutes',
      skills: ['Data Analysis', 'Programming', 'Problem Solving'],
      scenarios: [
        'Morning team standup meeting',
        'Data cleaning and preprocessing',
        'Model building and evaluation',
        'Presenting insights to stakeholders'
      ],
      premium: true
    },
    'UX/UI Designer': {
      simulationType: 'augmented',
      description: 'Design interfaces and test usability in a simulated environment',
      duration: '25 minutes',
      skills: ['Visual Design', 'User Testing', 'Prototyping'],
      scenarios: [
        'User research session',
        'Wireframing a new feature',
        'Usability testing with stakeholders',
        'Design review meeting'
      ],
      premium: false
    },
    'Full Stack Developer': {
      simulationType: 'immersive',
      description: 'Build a web application from scratch in a collaborative environment',
      duration: '45 minutes',
      skills: ['Coding', 'Debugging', 'System Architecture'],
      scenarios: [
        'Planning application architecture',
        'Frontend development',
        'Backend API implementation',
        'Code review and debugging'
      ],
      premium: true
    },
    'Cybersecurity Analyst': {
      simulationType: 'immersive',
      description: 'Detect and respond to simulated cyber attacks in real-time',
      duration: '40 minutes',
      skills: ['Threat Detection', 'Security Analysis', 'Incident Response'],
      scenarios: [
        'Security monitoring',
        'Threat hunting',
        'Incident response',
        'Security assessment'
      ],
      premium: true
    },
    'Product Manager': {
      simulationType: 'mixed',
      description: 'Lead a product team through feature development and launch',
      duration: '35 minutes',
      skills: ['Leadership', 'Strategic Thinking', 'Communication'],
      scenarios: [
        'Product roadmap planning',
        'Feature prioritization meeting',
        'Cross-functional team coordination',
        'Product launch preparation'
      ],
      premium: true
    },
    'Financial Analyst': {
      simulationType: 'augmented',
      description: 'Analyze financial data and prepare investment recommendations',
      duration: '30 minutes',
      skills: ['Financial Modeling', 'Data Analysis', 'Reporting'],
      scenarios: [
        'Market analysis',
        'Financial modeling',
        'Investment committee presentation',
        'Client consultation'
      ],
      premium: true
    }
  };
  
  return simulations[careerTitle] || null;
};

// ========== COGNITIVE CAREER FIT ANALYZER ==========

/**
 * Analyze cognitive fit for careers based on cognitive traits
 * @param {Object} cognitiveProfile - User's cognitive profile from tests
 * @returns {Array} - Careers with cognitive fit scores
 */
// export const analyzeCognitiveFit = (cognitiveProfile) => {
  // Default cognitive profile if none provided
  const defaultProfile = {
    attentionSpan: 0.5,       // 0-1 scale
    decisionSpeed: 0.5,       // 0-1 scale
    emotionalReactivity: 0.5, // 0-1 scale
    analyticalThinking: 0.5,  // 0-1 scale
    creativeThinking: 0.5,    // 0-1 scale
    stressResilience: 0.5,    // 0-1 scale
    socialProcessing: 0.5     // 0-1 scale
  };
  
  const profile = cognitiveProfile || defaultProfile;
  
  // Career cognitive requirements (idealized profiles)
  const careerCognitiveProfiles = {
    'Data Scientist': {
      attentionSpan: 0.8,
      decisionSpeed: 0.6,
      emotionalReactivity: 0.4,
      analyticalThinking: 0.9,
      creativeThinking: 0.6,
      stressResilience: 0.7,
      socialProcessing: 0.5
    },
    'UX/UI Designer': {
      attentionSpan: 0.7,
      decisionSpeed: 0.6,
      emotionalReactivity: 0.7,
      analyticalThinking: 0.6,
      creativeThinking: 0.9,
      stressResilience: 0.6,
      socialProcessing: 0.8
    },
    'Full Stack Developer': {
      attentionSpan: 0.8,
      decisionSpeed: 0.7,
      emotionalReactivity: 0.4,
      analyticalThinking: 0.8,
      creativeThinking: 0.7,
      stressResilience: 0.7,
      socialProcessing: 0.5
    },
    'Cybersecurity Analyst': {
      attentionSpan: 0.9,
      decisionSpeed: 0.8,
      emotionalReactivity: 0.3,
      analyticalThinking: 0.9,
      creativeThinking: 0.5,
      stressResilience: 0.8,
      socialProcessing: 0.4
    },
    'Product Manager': {
      attentionSpan: 0.7,
      decisionSpeed: 0.8,
      emotionalReactivity: 0.6,
      analyticalThinking: 0.7,
      creativeThinking: 0.7,
      stressResilience: 0.8,
      socialProcessing: 0.9
    }
  };
  
  // Calculate cognitive fit for each career
  return allCareers.map(career => {
    const cognitiveProfile = careerCognitiveProfiles[career.title] || {
      attentionSpan: 0.5,
      decisionSpeed: 0.5,
      emotionalReactivity: 0.5,
      analyticalThinking: 0.5,
      creativeThinking: 0.5,
      stressResilience: 0.5,
      socialProcessing: 0.5
    };
    
    // Calculate Euclidean distance between profiles (lower is better)
    let distanceSum = 0;
    let traitCount = 0;
    
    for (const trait in profile) {
      if (cognitiveProfile[trait] !== undefined) {
        distanceSum += Math.pow(profile[trait] - cognitiveProfile[trait], 2);
        traitCount++;
      }
    }
    
    const distance = Math.sqrt(distanceSum / traitCount);
    const fitScore = 1 - distance; // Convert to similarity score (higher is better)
    
    return {
      ...career,
      cognitiveFitScore: Math.round(fitScore * 100),
      cognitiveStrengths: getCognitiveStrengths(profile, cognitiveProfile),
      cognitiveGaps: getCognitiveGaps(profile, cognitiveProfile)
    };
  }).sort((a, b) => b.cognitiveFitScore - a.cognitiveFitScore);
};

/**
 * Identify cognitive strengths for a career
 * @param {Object} userProfile - User's cognitive profile
 * @param {Object} careerProfile - Career's ideal cognitive profile
 * @returns {Array} - List of cognitive strengths
 */
const getCognitiveStrengths = (userProfile, careerProfile) => {
  const strengths = [];
  
  if (userProfile.analyticalThinking >= 0.7 && careerProfile.analyticalThinking >= 0.7) {
    strengths.push('Analytical Thinking');
  }
  
  if (userProfile.creativeThinking >= 0.7 && careerProfile.creativeThinking >= 0.7) {
    strengths.push('Creative Thinking');
  }
  
  if (userProfile.attentionSpan >= 0.7 && careerProfile.attentionSpan >= 0.7) {
    strengths.push('Sustained Attention');
  }
  
  if (userProfile.stressResilience >= 0.7 && careerProfile.stressResilience >= 0.7) {
    strengths.push('Stress Resilience');
  }
  
  if (userProfile.socialProcessing >= 0.7 && careerProfile.socialProcessing >= 0.7) {
    strengths.push('Social Intelligence');
  }
  
  return strengths;
};

/**
 * Identify cognitive gaps for a career
 * @param {Object} userProfile - User's cognitive profile
 * @param {Object} careerProfile - Career's ideal cognitive profile
 * @returns {Array} - List of cognitive gaps
 */
const getCognitiveGaps = (userProfile, careerProfile) => {
  const gaps = [];
  
  if (userProfile.analyticalThinking < 0.5 && careerProfile.analyticalThinking >= 0.7) {
    gaps.push('Analytical Thinking');
  }
  
  if (userProfile.creativeThinking < 0.5 && careerProfile.creativeThinking >= 0.7) {
    gaps.push('Creative Thinking');
  }
  
  if (userProfile.attentionSpan < 0.5 && careerProfile.attentionSpan >= 0.7) {
    gaps.push('Sustained Attention');
  }
  
  if (userProfile.stressResilience < 0.5 && careerProfile.stressResilience >= 0.7) {
    gaps.push('Stress Resilience');
  }
  
  if (userProfile.socialProcessing < 0.5 && careerProfile.socialProcessing >= 0.7) {
    gaps.push('Social Intelligence');
  }
  
  return gaps;
};

// ========== BURNOUT & LIFESTYLE PREDICTION ==========

/**
 * Predict burnout risk and lifestyle compatibility for careers
 * @param {Object} userPreferences - User's lifestyle preferences
 * @returns {Array} - Careers with burnout and lifestyle predictions
 */
// export const predictBurnoutAndLifestyle = (userPreferences = {}) => {
  // Default preferences if none provided
  const defaultPreferences = {
    workLifeBalance: 0.7,     // 0-1 scale (higher = more balance preferred)
    stressPreference: 0.3,    // 0-1 scale (higher = more stress tolerance)
    workloadPreference: 0.5,  // 0-1 scale (higher = heavier workload preferred)
    flexibilityNeeded: 0.7,   // 0-1 scale (higher = more flexibility needed)
    socialInteraction: 0.6    // 0-1 scale (higher = more social interaction preferred)
  };
  
  const preferences = { ...defaultPreferences, ...userPreferences };
  
  // Career lifestyle profiles
  const careerLifestyleProfiles = {
    'Data Scientist': {
      workLifeBalance: 0.6,
      stressLevel: 0.6,
      typicalWorkload: 0.7,
      flexibility: 0.6,
      socialInteraction: 0.5,
      burnoutRate: 'Moderate',
      burnoutRisk: 0.5
    },
    'UX/UI Designer': {
      workLifeBalance: 0.7,
      stressLevel: 0.5,
      typicalWorkload: 0.6,
      flexibility: 0.7,
      socialInteraction: 0.7,
      burnoutRate: 'Low to Moderate',
      burnoutRisk: 0.4
    },
    'Full Stack Developer': {
      workLifeBalance: 0.5,
      stressLevel: 0.7,
      typicalWorkload: 0.8,
      flexibility: 0.6,
      socialInteraction: 0.4,
      burnoutRate: 'Moderate to High',
      burnoutRisk: 0.7
    },
    'Cybersecurity Analyst': {
      workLifeBalance: 0.4,
      stressLevel: 0.8,
      typicalWorkload: 0.7,
      flexibility: 0.4,
      socialInteraction: 0.5,
      burnoutRate: 'High',
      burnoutRisk: 0.8
    },
    'Product Manager': {
      workLifeBalance: 0.5,
      stressLevel: 0.7,
      typicalWorkload: 0.8,
      flexibility: 0.5,
      socialInteraction: 0.9,
      burnoutRate: 'Moderate to High',
      burnoutRisk: 0.6
    },
    'Financial Analyst': {
      workLifeBalance: 0.4,
      stressLevel: 0.8,
      typicalWorkload: 0.8,
      flexibility: 0.3,
      socialInteraction: 0.6,
      burnoutRate: 'High',
      burnoutRisk: 0.7
    },
    'Human Resources Manager': {
      workLifeBalance: 0.6,
      stressLevel: 0.6,
      typicalWorkload: 0.7,
      flexibility: 0.6,
      socialInteraction: 0.9,
      burnoutRate: 'Moderate',
      burnoutRisk: 0.5
    },
    'Healthcare Administrator': {
      workLifeBalance: 0.5,
      stressLevel: 0.7,
      typicalWorkload: 0.8,
      flexibility: 0.4,
      socialInteraction: 0.7,
      burnoutRate: 'Moderate to High',
      burnoutRisk: 0.6
    }
  };
  
  // Calculate lifestyle compatibility for each career
  return allCareers.map(career => {
    const lifestyleProfile = careerLifestyleProfiles[career.title] || {
      workLifeBalance: 0.5,
      stressLevel: 0.5,
      typicalWorkload: 0.5,
      flexibility: 0.5,
      socialInteraction: 0.5,
      burnoutRate: 'Moderate',
      burnoutRisk: 0.5
    };
    
    // Calculate compatibility score (higher is better)
    const workLifeScore = 1 - Math.abs(preferences.workLifeBalance - lifestyleProfile.workLifeBalance);
    const stressScore = 1 - Math.abs(preferences.stressPreference - lifestyleProfile.stressLevel);
    const workloadScore = 1 - Math.abs(preferences.workloadPreference - lifestyleProfile.typicalWorkload);
    const flexibilityScore = 1 - Math.abs(preferences.flexibilityNeeded - lifestyleProfile.flexibility);
    const socialScore = 1 - Math.abs(preferences.socialInteraction - lifestyleProfile.socialInteraction);
    
    const compatibilityScore = (
      workLifeScore * 0.3 +
      stressScore * 0.2 +
      workloadScore * 0.15 +
      flexibilityScore * 0.2 +
      socialScore * 0.15
    );
    
    // Calculate personalized burnout risk
    const personalBurnoutRisk = calculatePersonalBurnoutRisk(
      lifestyleProfile.burnoutRisk,
      preferences,
      lifestyleProfile
    );
    
    return {
      ...career,
      lifestyleCompatibility: Math.round(compatibilityScore * 100),
      burnoutRisk: personalBurnoutRisk,
      burnoutRiskLevel: getBurnoutRiskLevel(personalBurnoutRisk),
      lifestyleFactors: {
        workLifeBalance: lifestyleProfile.workLifeBalance,
        stressLevel: lifestyleProfile.stressLevel,
        typicalWorkload: lifestyleProfile.typicalWorkload,
        flexibility: lifestyleProfile.flexibility,
        socialInteraction: lifestyleProfile.socialInteraction
      }
    };
  }).sort((a, b) => b.lifestyleCompatibility - a.lifestyleCompatibility);
};

/**
 * Calculate personalized burnout risk based on career and preferences
 * @param {Number} baseBurnoutRisk - Base burnout risk for the career
 * @param {Object} preferences - User's lifestyle preferences
 * @param {Object} careerProfile - Career's lifestyle profile
 * @returns {Number} - Personalized burnout risk (0-1)
 */
const calculatePersonalBurnoutRisk = (baseBurnoutRisk, preferences, careerProfile) => {
  // Adjust burnout risk based on preference mismatches
  let riskAdjustment = 0;
  
  // Work-life balance mismatch increases risk
  if (preferences.workLifeBalance > 0.7 && careerProfile.workLifeBalance < 0.5) {
    riskAdjustment += 0.2;
  }
  
  // Stress tolerance mismatch increases risk
  if (preferences.stressPreference < 0.4 && careerProfile.stressLevel > 0.7) {
    riskAdjustment += 0.2;
  }
  
  // Flexibility mismatch increases risk
  if (preferences.flexibilityNeeded > 0.7 && careerProfile.flexibility < 0.4) {
    riskAdjustment += 0.15;
  }
  
  // Calculate adjusted risk, capped at 0.95
  return Math.min(0.95, baseBurnoutRisk + riskAdjustment);
};

/**
 * Get burnout risk level description
 * @param {Number} riskScore - Burnout risk score (0-1)
 * @returns {String} - Risk level description
 */


// Location filter utility
const filterByLocation = (careers, location) => careers.filter(c => c.locations?.some(loc => loc.toLowerCase().includes(location?.toLowerCase())));

const getBurnoutRiskLevel = (riskScore) => {
  if (riskScore < 0.3) return 'Low';
  if (riskScore < 0.5) return 'Low to Moderate';
  if (riskScore < 0.7) return 'Moderate';
  if (riskScore < 0.85) return 'Moderate to High';
  return 'High';
};

// ========== SMART LEARNING PATH GENERATOR ==========

/**
 * Generate a personalized learning path for a career
 * @param {String} careerTitle - The title of the career
 * @param {Object} userProfile - User's current profile
 * @returns {Object} - Personalized learning path
 */
// export const generateLearningPath = (careerTitle, userProfile = {}) => {
  // Default user profile if none provided
  const defaultProfile = {
    currentEducation: 'High School',
    currentSkills: [],
    learningPreference: 'balanced', // 'fast-track', 'balanced', 'comprehensive'
    timeAvailable: 'part-time'      // 'full-time', 'part-time', 'minimal'
  };
  
  const profile = { ...defaultProfile, ...userProfile };
  
  // Career learning paths
  const careerLearningPaths = {
    'Data Scientist': {
      education: [
        { type: 'Degree', name: 'Bachelor\'s in Computer Science, Statistics, or related field', duration: '4 years', required: true },
        { type: 'Degree', name: 'Master\'s in Data Science or related field', duration: '1-2 years', required: false }
      ],
      certifications: [
        { name: 'Microsoft Certified: Azure Data Scientist Associate', duration: '3-6 months', difficulty: 'Intermediate' },
        { name: 'IBM Data Science Professional Certificate', duration: '3-6 months', difficulty: 'Beginner to Intermediate' },
        { name: 'Google Data Analytics Professional Certificate', duration: '6 months', difficulty: 'Beginner' }
      ],
      courses: [
        { name: 'Machine Learning', provider: 'Coursera (Stanford)', duration: '3 months', difficulty: 'Intermediate' },
        { name: 'Deep Learning Specialization', provider: 'Coursera (deeplearning.ai)', duration: '3 months', difficulty: 'Intermediate' },
        { name: 'Python for Data Science and Machine Learning', provider: 'Udemy', duration: '2 months', difficulty: 'Beginner' }
      ],
      projects: [
        { name: 'Predictive Analytics Project', description: 'Build a predictive model using real-world data', duration: '1-2 months' },
        { name: 'Data Visualization Dashboard', description: 'Create an interactive dashboard to visualize complex datasets', duration: '2-4 weeks' },
        { name: 'Machine Learning Competition', description: 'Participate in a Kaggle competition', duration: 'Varies' }
      ],
      skills: [
        'Python', 'R', 'SQL', 'Machine Learning', 'Statistical Analysis', 'Data Visualization', 'Big Data Technologies'
      ]
    },
    'UX/UI Designer': {
      education: [
        { type: 'Degree', name: 'Bachelor\'s in Design, HCI, or related field', duration: '4 years', required: false }
      ],
      certifications: [
        { name: 'Google UX Design Professional Certificate', duration: '6 months', difficulty: 'Beginner' },
        { name: 'Certified User Experience Professional (CUXP)', duration: '3-6 months', difficulty: 'Intermediate' },
        { name: 'Interaction Design Foundation Certification', duration: 'Varies', difficulty: 'Beginner to Advanced' }
      ],
      courses: [
        { name: 'UI/UX Design Bootcamp', provider: 'Udemy', duration: '3 months', difficulty: 'Beginner' },
        { name: 'Human-Computer Interaction', provider: 'Coursera', duration: '2 months', difficulty: 'Intermediate' },
        { name: 'Design Thinking', provider: 'IDEO', duration: '1 month', difficulty: 'Beginner' }
      ],
      projects: [
        { name: 'Mobile App Redesign', description: 'Redesign an existing mobile app with improved UX', duration: '2-4 weeks' },
        { name: 'UX Research Study', description: 'Conduct user research and create personas', duration: '2-3 weeks' },
        { name: 'Interactive Prototype', description: 'Build a high-fidelity interactive prototype', duration: '3-4 weeks' }
      ],
      skills: [
        'Wireframing', 'Prototyping', 'User Research', 'Visual Design', 'Figma', 'Adobe XD', 'Usability Testing'
      ]
    },
    'Full Stack Developer': {
      education: [
        { type: 'Degree', name: 'Bachelor\'s in Computer Science or related field', duration: '4 years', required: false }
      ],
      certifications: [
        { name: 'AWS Certified Developer', duration: '3-6 months', difficulty: 'Intermediate' },
        { name: 'Microsoft Certified: Azure Developer Associate', duration: '3-6 months', difficulty: 'Intermediate' },
        { name: 'Full Stack Web Developer Nanodegree', provider: 'Udacity', duration: '4 months', difficulty: 'Intermediate' }
      ],
      courses: [
        { name: 'The Web Developer Bootcamp', provider: 'Udemy', duration: '3 months', difficulty: 'Beginner' },
        { name: 'Full Stack Open', provider: 'University of Helsinki', duration: '3-6 months', difficulty: 'Intermediate' },
        { name: 'JavaScript Algorithms and Data Structures', provider: 'freeCodeCamp', duration: '2 months', difficulty: 'Intermediate' }
      ],
      projects: [
        { name: 'Full Stack Web Application', description: 'Build a complete web app with frontend and backend', duration: '2-3 months' },
        { name: 'RESTful API', description: 'Design and implement a RESTful API', duration: '2-4 weeks' },
        { name: 'Real-time Chat Application', description: 'Build a real-time chat app using WebSockets', duration: '3-4 weeks' }
      ],
      skills: [
        'JavaScript', 'HTML/CSS', 'React', 'Node.js', 'SQL/NoSQL Databases', 'Git', 'API Design', 'DevOps'
      ]
    }
  };
  
  // Get learning path for the specified career
  const learningPath = careerLearningPaths[careerTitle] || {
    education: [],
    certifications: [],
    courses: [],
    projects: [],
    skills: []
  };
  
  // Customize learning path based on user profile
  const customizedPath = customizeLearningPath(learningPath, userProfile);
  
  return {
    careerTitle,
    customizedPath,
    timeToCompletion: estimateTimeToCompletion(customizedPath, userProfile),
    recommendedSequence: generateSequence(customizedPath, userProfile),
    estimatedCost: estimateCost(customizedPath)
  };
};

/**
 * Customize learning path based on user profile
 * @param {Object} learningPath - Base learning path for career
 * @param {Object} userProfile - User's current profile
 * @returns {Object} - Customized learning path
 */
const customizeLearningPath = (learningPath, userProfile) => {
  const customizedPath = { ...learningPath };
  
  // Adjust education based on current education
  if (userProfile.currentEducation === 'Bachelor\'s Degree' || userProfile.currentEducation === 'Master\'s Degree') {
    customizedPath.education = customizedPath.education.filter(edu => 
      !edu.name.includes('Bachelor') || edu.name.includes('different field'));
  }
  
  // Adjust based on learning preference
  if (userProfile.learningPreference === 'fast-track') {
    // Prioritize certifications and shorter courses
    customizedPath.certifications = customizedPath.certifications.filter(cert => 
      cert.duration.includes('3') || cert.duration.includes('month'));
    customizedPath.courses = customizedPath.courses.filter(course => 
      !course.duration.includes('6') && !course.duration.includes('year'));
  } else if (userProfile.learningPreference === 'comprehensive') {
    // Include more in-depth options
    // (In a real implementation, we would add more comprehensive options)
  }
  
  // Adjust based on time available
  if (userProfile.timeAvailable === 'minimal') {
    // Limit to essential courses and projects
    customizedPath.courses = customizedPath.courses.slice(0, 2);
    customizedPath.projects = customizedPath.projects.slice(0, 1);
  }
  
  // Remove skills user already has
  customizedPath.skills = customizedPath.skills.filter(skill => 
    !userProfile.currentSkills.includes(skill));
  
  return customizedPath;
};

/**
 * Estimate time to completion for learning path
 * @param {Object} learningPath - Customized learning path
 * @param {Object} userProfile - User's current profile
 * @returns {Object} - Time estimates
 */
const estimateTimeToCompletion = (learningPath, userProfile) => {
  let minMonths = 0;
  let maxMonths = 0;
  
  // Calculate time for education
  learningPath.education.forEach(edu => {
    if (edu.duration.includes('year')) {
      const years = parseInt(edu.duration);
      minMonths += years * 12;
      maxMonths += years * 12;
    } else if (edu.duration.includes('-')) {
      const [min, max] = edu.duration.split('-').map(d => parseInt(d));
      minMonths += min;
      maxMonths += max;
    }
  });
  
  // Calculate time for certifications and courses
  const certAndCourseMonths = learningPath.certifications.concat(learningPath.courses)
    .reduce((total, item) => {
      if (item.duration.includes('-')) {
        const [min, max] = item.duration.split('-').map(d => parseInt(d));
        return { min: total.min + min, max: total.max + max };
      } else if (item.duration.includes('month')) {
        const months = parseInt(item.duration);
        return { min: total.min + months, max: total.max + months };
      }
      return total;
    }, { min: 0, max: 0 });
  
  minMonths += certAndCourseMonths.min;
  maxMonths += certAndCourseMonths.max;
  
  // Adjust based on time availability
  const timeMultiplier = {
    'full-time': 1,
    'part-time': 1.5,
    'minimal': 2.5
  }[userProfile.timeAvailable] || 1.5;
  
  return {
    minMonths: Math.round(minMonths * timeMultiplier),
    maxMonths: Math.round(maxMonths * timeMultiplier),
    fullTimeEquivalent: { min: minMonths, max: maxMonths }
  };
};

/**
 * Generate recommended sequence for learning path
 * @param {Object} learningPath - Customized learning path
 * @param {Object} userProfile - User's current profile
 * @returns {Array} - Ordered sequence of learning activities
 */
const generateSequence = (learningPath, userProfile) => {
  const sequence = [];
  
  // Start with foundational courses
  const foundationalCourses = learningPath.courses
    .filter(course => course.difficulty === 'Beginner')
    .map(course => ({ ...course, type: 'course' }));
  sequence.push(...foundationalCourses);
  
  // Add certifications
  const certifications = learningPath.certifications
    .map(cert => ({ ...cert, type: 'certification' }));
  sequence.push(...certifications);
  
  // Add advanced courses
  const advancedCourses = learningPath.courses
    .filter(course => course.difficulty !== 'Beginner')
    .map(course => ({ ...course, type: 'course' }));
  sequence.push(...advancedCourses);
  
  // Add projects
  const projects = learningPath.projects
    .map(project => ({ ...project, type: 'project' }));
  sequence.push(...projects);
  
  return sequence;
};

/**
 * Estimate cost for learning path
 * @param {Object} learningPath - Customized learning path
 * @returns {Object} - Cost estimates
 */
const estimateCost = (learningPath) => {
  // Estimated costs for different types of learning resources
  const costEstimates = {
    degree: { min: 200000, max: 1500000 }, // In INR
    certification: { min: 10000, max: 50000 },
    course: { min: 2000, max: 15000 },
    bootcamp: { min: 50000, max: 200000 }
  };
  
  let minCost = 0;
  let maxCost = 0;
  
  // Calculate education costs
  learningPath.education.forEach(edu => {
    if (edu.type === 'Degree') {
      minCost += costEstimates.degree.min;
      maxCost += costEstimates.degree.max;
    }
  });
  
  // Calculate certification costs
  learningPath.certifications.forEach(cert => {
    minCost += costEstimates.certification.min;
    maxCost += costEstimates.certification.max;
  });
  
  // Calculate course costs
  learningPath.courses.forEach(course => {
    if (course.provider && course.provider.includes('Bootcamp')) {
      minCost += costEstimates.bootcamp.min;
      maxCost += costEstimates.bootcamp.max;
    } else {
      minCost += costEstimates.course.min;
      maxCost += costEstimates.course.max;
    }
  });
  
  return {
    minCost,
    maxCost,
    formattedRange: `₹${(minCost/1000).toFixed(0)}K - ₹${(maxCost/1000).toFixed(0)}K`
  };
};

// ========== AI ROLE MODEL INTERVIEW ==========

/**
 * Get simulated interview with an industry expert role model
 * @param {String} expertName - Name of the expert to interview
 * @param {String} question - Question to ask the expert
 * @returns {Object} - Expert information and response
 */
export const getAIRoleModelInterview = (expertName, question = '') => {
  // Database of expert profiles
  
  // Mock experts database
  const experts = {
    'careerAdvisor': {
      name: 'Dr. Sarah Johnson',
      title: 'Senior Career Strategist',
      expertise: ['Career Transitions', 'Skill Development', 'Industry Trends'],
      responses: {
        general: ['Focus on transferable skills', 'Consider emerging industries', 'Network strategically'],
        technical: ['Upskill through certifications', 'Build portfolio projects', 'Follow industry leaders']
      }
    }
  };

  // Get expert profile or return error
  const expert = {
    'Sundar Pichai': {
      name: 'Sundar Pichai',
      title: 'CEO of Google and Alphabet',
      background: 'Born in India, studied at IIT, Stanford, and Wharton. Joined Google in 2004 and became CEO in 2015.',
      expertise: ['Technology Leadership', 'Product Management', 'AI Strategy'],
      career: ['Product Manager at Google', 'Led Chrome and Android development', 'CEO of Google', 'CEO of Alphabet'],
      image: 'https://example.com/sundar_pichai.jpg',
      responses: {
        career_advice: 'Focus on building products that solve real problems. Don\'t worry too much about the career ladder; instead, focus on impact and learning. I\'ve always tried to work on things that I found interesting and challenging.',
        leadership: 'Leadership is about creating an environment where people can do their best work. Listen more than you talk, and make sure everyone feels their voice is heard. Diverse teams make better decisions.',
        innovation: 'Innovation comes from giving people the freedom to try new things and learn from failures. At Google, we\'ve always encouraged people to spend time on projects they\'re passionate about, which has led to many of our most successful products.',
        work_life_balance: 'It\'s important to find what works for you. I try to be fully present whether I\'m at work or at home. Technology should help us be more efficient, not keep us constantly connected to work.',
        future_tech: 'AI will continue to transform every industry. The companies that will thrive are those that can harness AI to solve real problems for their customers while being thoughtful about the ethical implications.',
        default: 'That\'s an interesting question. I believe in focusing on the user and everything else will follow. Building technology that helps people in their daily lives has always been my north star.'
      }
    },
    'Kalpana Chawla': {
      name: 'Kalpana Chawla',
      title: 'NASA Astronaut and Engineer',
      background: 'Born in India, earned aerospace engineering degrees from Punjab Engineering College, University of Texas, and University of Colorado. First Indian-born woman in space.',
      expertise: ['Aerospace Engineering', 'Space Flight', 'Research'],
      career: ['Research Scientist at NASA', 'Astronaut', 'Mission Specialist on Space Shuttle Columbia'],
      image: 'https://example.com/kalpana_chawla.jpg',
      responses: {
        perseverance: 'The path to your dreams is never easy. I faced many challenges coming from a small town in India to becoming an astronaut, but I never gave up. When you have a goal, you have to be willing to work hard and overcome obstacles.',
        women_in_stem: 'Do not be afraid to pursue your dreams because you are a woman. The field needs diverse perspectives. Find mentors who support you, and remember that your unique viewpoint is valuable.',
        education: 'Education is the foundation of achievement. Never stop learning. I continued my education through multiple advanced degrees because I knew knowledge would open doors to opportunities.',
        space_experience: 'Looking at Earth from space gives you a perspective that changes you forever. You see no borders, just one beautiful planet that we all share. This perspective makes you think about how we should work together to solve our common challenges.',
        advice_to_youth: 'Follow your dreams, no matter how difficult they seem. The stars are not too far if you have the passion and determination to reach them. And remember, the journey itself is as rewarding as reaching the destination.',
        default: 'The greatest challenge is to not be afraid to dream big. Set your goals high, and don\'t stop until you get there. The sky is not the limit - your mind is.'
      }
    },
    'Elon Musk': {
      name: 'Elon Musk',
      title: 'Entrepreneur and CEO of Tesla, SpaceX',
      background: 'Born in South Africa, studied at University of Pennsylvania. Founded multiple companies including PayPal, Tesla, SpaceX, Neuralink, and The Boring Company.',
      expertise: ['Electric Vehicles', 'Space Technology', 'Renewable Energy', 'AI'],
      career: ['Co-founder of PayPal', 'CEO of Tesla', 'CEO of SpaceX', 'Founder of Neuralink and The Boring Company'],
      image: 'https://example.com/elon_musk.jpg',
      responses: {
        entrepreneurship: 'Starting a company is like eating glass and staring into the abyss. It\'s not for everyone. You need to be prepared for extreme stress and long hours. But if you\'re creating something that will have a significant positive impact on the world, it\'s worth it.',
        innovation: 'The most important thing is to focus on innovation that matters. Ask yourself: Will this make a meaningful difference to humanity\'s future? If not, it might not be worth your time.',
        failure: 'Failure is an option here. If things are not failing, you are not innovating enough. SpaceX had three rocket failures before we succeeded. Tesla nearly went bankrupt multiple times. Persistence through failure is key.',
        future_tech: 'Sustainable energy and making life multiplanetary are essential for humanity\'s long-term survival. AI is both our greatest opportunity and potentially our greatest existential threat - we need to approach it carefully.',
        work_ethic: 'There\'s no substitute for hard work. When others are sleeping, I\'m working. When others are working, I\'m working harder. You can\'t change the world on a 40-hour work week.',
        default: 'The first step is to establish that something is possible; then probability will occur. If you\'re not progressing, you\'re regressing, so keep moving forward.'
      }
    }
  }[expertName];
  if (!expert) {
    return {
      error: 'Expert not found',
      availableExperts: Object.keys({
          'Sundar Pichai': {
            name: 'Sundar Pichai',
            title: 'CEO of Google and Alphabet',
            background: 'Born in India, studied at IIT, Stanford, and Wharton. Joined Google in 2004 and became CEO in 2015.',
            expertise: ['Technology Leadership', 'Product Management', 'AI Strategy'],
            career: ['Product Manager at Google', 'Led Chrome and Android development', 'CEO of Google', 'CEO of Alphabet'],
            image: 'https://example.com/sundar_pichai.jpg',
            responses: {
              career_advice: 'Focus on building products that solve real problems. Don\'t worry too much about the career ladder; instead, focus on impact and learning. I\'ve always tried to work on things that I found interesting and challenging.',
              leadership: 'Leadership is about creating an environment where people can do their best work. Listen more than you talk, and make sure everyone feels their voice is heard. Diverse teams make better decisions.',
              innovation: 'Innovation comes from giving people the freedom to try new things and learn from failures. At Google, we\'ve always encouraged people to spend time on projects they\'re passionate about, which has led to many of our most successful products.',
              work_life_balance: 'It\'s important to find what works for you. I try to be fully present whether I\'m at work or at home. Technology should help us be more efficient, not keep us constantly connected to work.',
              future_tech: 'AI will continue to transform every industry. The companies that will thrive are those that can harness AI to solve real problems for their customers while being thoughtful about the ethical implications.',
              default: 'That\'s an interesting question. I believe in focusing on the user and everything else will follow. Building technology that helps people in their daily lives has always been my north star.'
            }
          },
          'Kalpana Chawla': {
            name: 'Kalpana Chawla',
            title: 'NASA Astronaut and Engineer',
            background: 'Born in India, earned aerospace engineering degrees from Punjab Engineering College, University of Texas, and University of Colorado. First Indian-born woman in space.',
            expertise: ['Aerospace Engineering', 'Space Flight', 'Research'],
            career: ['Research Scientist at NASA', 'Astronaut', 'Mission Specialist on Space Shuttle Columbia'],
            image: 'https://example.com/kalpana_chawla.jpg',
            responses: {
              perseverance: 'The path to your dreams is never easy. I faced many challenges coming from a small town in India to becoming an astronaut, but I never gave up. When you have a goal, you have to be willing to work hard and overcome obstacles.',
              women_in_stem: 'Do not be afraid to pursue your dreams because you are a woman. The field needs diverse perspectives. Find mentors who support you, and remember that your unique viewpoint is valuable.',
              education: 'Education is the foundation of achievement. Never stop learning. I continued my education through multiple advanced degrees because I knew knowledge would open doors to opportunities.',
              space_experience: 'Looking at Earth from space gives you a perspective that changes you forever. You see no borders, just one beautiful planet that we all share. This perspective makes you think about how we should work together to solve our common challenges.',
              advice_to_youth: 'Follow your dreams, no matter how difficult they seem. The stars are not too far if you have the passion and determination to reach them. And remember, the journey itself is as rewarding as reaching the destination.',
              default: 'The greatest challenge is to not be afraid to dream big. Set your goals high, and don\'t stop until you get there. The sky is not the limit - your mind is.'
            }
          },
          'Elon Musk': {
            name: 'Elon Musk',
            title: 'Entrepreneur and CEO of Tesla, SpaceX',
            background: 'Born in South Africa, studied at University of Pennsylvania. Founded multiple companies including PayPal, Tesla, SpaceX, Neuralink, and The Boring Company.',
            expertise: ['Electric Vehicles', 'Space Technology', 'Renewable Energy', 'AI'],
            career: ['Co-founder of PayPal', 'CEO of Tesla', 'CEO of SpaceX', 'Founder of Neuralink and The Boring Company'],
            image: 'https://example.com/elon_musk.jpg',
            responses: {
              entrepreneurship: 'Starting a company is like eating glass and staring into the abyss. It\'s not for everyone. You need to be prepared for extreme stress and long hours. But if you\'re creating something that will have a significant positive impact on the world, it\'s worth it.',
              innovation: 'The most important thing is to focus on innovation that matters. Ask yourself: Will this make a meaningful difference to humanity\'s future? If not, it might not be worth your time.',
              failure: 'Failure is an option here. If things are not failing, you are not innovating enough. SpaceX had three rocket failures before we succeeded. Tesla nearly went bankrupt multiple times. Persistence through failure is key.',
              future_tech: 'Sustainable energy and making life multiplanetary are essential for humanity\'s long-term survival. AI is both our greatest opportunity and potentially our greatest existential threat - we need to approach it carefully.',
              work_ethic: 'There\'s no substitute for hard work. When others are sleeping, I\'m working. When others are working, I\'m working harder. You can\'t change the world on a 40-hour work week.',
              default: 'The first step is to establish that something is possible; then probability will occur. If you\'re not progressing, you\'re regressing, so keep moving forward.'
            }
          }
        })
    };
  }
  
  // Generate response based on question
  // Get question from function parameters
  const question = typeof arguments[0] === 'string' ? arguments[0] : '';
  
  let response = '';
  if (!question) {
    // If no question, return a general introduction
    response = `Hello, I'm ${expert.name}, ${expert.title}. ${expert.background.split('.')[0]}. I'd be happy to share insights from my experience in ${expert.expertise.join(', ')}.`;
  } else {
    // Analyze question to determine the most relevant response category
    const questionLower = question.toLowerCase();
    let responseCategory = 'default';
    
    // Check question against keywords for each response category
    for (const category in expert.responses) {
      const categoryKeywords = getCategoryKeywords(category);
      if (categoryKeywords.some(keyword => questionLower.includes(keyword))) {
        responseCategory = category;
        break;
      }
    }
    
    // Check question against keywords for each response category
    for (const category in expert.responses) {
      const categoryKeywords = getCategoryKeywords(category);
      if (categoryKeywords.some(keyword => questionLower.includes(keyword))) {
        responseCategory = category;
        break;
      }
    }
    
    // Check question against keywords for each response category
    for (const category in expert.responses) {
      const categoryKeywords = getCategoryKeywords(category);
      if (categoryKeywords.some(keyword => questionLower.includes(keyword))) {
        responseCategory = category;
        break;
      }
    }
    
    response = expert.responses[responseCategory];
  }
  
  return {
    ...expert,
    response
  };
};

/**
 * Calculate match between user traits and persona traits
 * @param {Array} userTraits - User's traits
 * @param {Array} personaTraits - Persona's traits
 * @returns {Number} - Match ratio (0-1)
 */
const calculateTraitMatch = (userTraits, personaTraits) => {
  if (!userTraits || !userTraits.length || !personaTraits || !personaTraits.length) {
    return 0;
  }
  
  // Count exact and partial matches
  let exactMatches = 0;
  let partialMatches = 0;
  
  userTraits.forEach(userTrait => {
    // Check for exact matches
    const hasExactMatch = personaTraits.some(personaTrait => 
      personaTrait.toLowerCase() === userTrait.toLowerCase()
    );
    
    if (hasExactMatch) {
      exactMatches++;
      return;
    }
    
    // Check for partial matches
    const hasPartialMatch = personaTraits.some(personaTrait => 
      personaTrait.toLowerCase().includes(userTrait.toLowerCase()) ||
      userTrait.toLowerCase().includes(personaTrait.toLowerCase())
    );
    
    if (hasPartialMatch) {
      partialMatches++;
    }
  });
  
  // Calculate match ratio (exact matches count fully, partial matches count half)
  return (exactMatches + (partialMatches * 0.5)) / Math.max(userTraits.length, personaTraits.length);
};


// ========== AI ROLE MODEL INTERVIEW ==========

/**
 * Helper function to get keywords for response categories
 * @param {String} category - Response category
 * @returns {Array} - Keywords related to the category
 */
const getCategoryKeywords = (category) => {
  const keywordMap = {
    career_advice: ['career', 'advice', 'path', 'growth', 'progress', 'advance'],
    leadership: ['lead', 'team', 'manage', 'direct', 'vision', 'inspire'],
    innovation: ['innovat', 'creat', 'new', 'invent', 'disrupt', 'transform'],
    work_life_balance: ['balance', 'life', 'stress', 'burnout', 'family', 'personal'],
    future_tech: ['future', 'technology', 'trend', 'predict', 'coming', 'next'],
    perseverance: ['persever', 'challeng', 'difficult', 'obstacle', 'overcome', 'persist'],
    women_in_stem: ['women', 'gender', 'diversity', 'inclusion', 'female', 'equality'],
    education: ['educat', 'learn', 'study', 'degree', 'school', 'knowledge'],
    space_experience: ['space', 'astronaut', 'earth', 'orbit', 'mission', 'shuttle'],
    advice_to_youth: ['young', 'youth', 'start', 'begin', 'early', 'student'],
    entrepreneurship: ['entrepreneur', 'startup', 'business', 'company', 'venture', 'found'],
    failure: ['fail', 'mistake', 'wrong', 'error', 'setback', 'loss'],
    work_ethic: ['work', 'ethic', 'hard', 'effort', 'discipline', 'commit']
  };
  
  return keywordMap[category] || [];
};            
      
const personalities = {
    'Kalpana Chawla': {
      name: 'Kalpana Chawla',
      title: 'NASA Astronaut and Engineer',
      background: 'Born in India, earned aerospace engineering degrees from Punjab Engineering College, University of Texas, and University of Colorado. First Indian-born woman in space.',
      expertise: ['Aerospace Engineering', 'Space Flight', 'Research'],
      career: ['Research Scientist at NASA', 'Astronaut', 'Mission Specialist on Space Shuttle Columbia'],
      image: 'https://example.com/kalpana_chawla.jpg',
      responses: {
        perseverance: 'The path to your dreams is never easy. I faced many challenges coming from a small town in India to becoming an astronaut, but I never gave up. When you have a goal, you have to be willing to work hard and overcome obstacles.',
        women_in_stem: 'Do not be afraid to pursue your dreams because you are a woman. The field needs diverse perspectives. Find mentors who support you, and remember that your unique viewpoint is valuable.',
        education: 'Education is the foundation of achievement. Never stop learning. I continued my education through multiple advanced degrees because I knew knowledge would open doors to opportunities.',
        space_experience: 'Looking at Earth from space gives you a perspective that changes you forever. You see no borders, just one beautiful planet that we all share. This perspective makes you think about how we should work together to solve our common challenges.',
        advice_to_youth: 'Follow your dreams, no matter how difficult they seem. The stars are not too far if you have the passion and determination to reach them. And remember, the journey itself is as rewarding as reaching the destination.',
        default: 'The greatest challenge is to not be afraid to dream big. Set your goals high, and don\'t stop until you get there. The sky is not the limit - your mind is.'
      }
    },
    'Elon Musk': {
      name: 'Elon Musk',
      title: 'Entrepreneur and CEO of Tesla, SpaceX',
      background: 'Born in South Africa, studied at University of Pennsylvania. Founded multiple companies including PayPal, Tesla, SpaceX, Neuralink, and The Boring Company.',
      expertise: ['Electric Vehicles', 'Space Technology', 'Renewable Energy', 'AI'],
      career: ['Co-founder of PayPal', 'CEO of Tesla', 'CEO of SpaceX', 'Founder of Neuralink and The Boring Company'],
      image: 'https://example.com/elon_musk.jpg',
      responses: {
        entrepreneurship: 'Starting a company is like eating glass and staring into the abyss. It\'s not for everyone. You need to be prepared for extreme stress and long hours. But if you\'re creating something that will have a significant positive impact on the world, it\'s worth it.',
        innovation: 'The most important thing is to focus on innovation that matters. Ask yourself: Will this make a meaningful difference to humanity\'s future? If not, it might not be worth your time.',
        failure: 'Failure is an option here. If things are not failing, you are not innovating enough. SpaceX had three rocket failures before we succeeded. Tesla nearly went bankrupt multiple times. Persistence through failure is key.',
        future_tech: 'Sustainable energy and making life multiplanetary are essential for humanity\'s long-term survival. AI is both our greatest opportunity and potentially our greatest existential threat - we need to approach it carefully.',
        work_ethic: 'There\'s no substitute for hard work. When others are sleeping, I\'m working. When others are working, I\'m working harder. You can\'t change the world on a 40-hour work week.',
        default: 'The first step is to establish that something is possible; then probability will occur. If you\'re not progressing, you\'re regressing, so keep moving forward.'
      }
    }};
  

  // Mock experts database
  const experts = {
    'careerAdvisor': {
      name: 'Dr. Sarah Johnson',
      title: 'Senior Career Strategist',
      expertise: ['Career Transitions', 'Skill Development', 'Industry Trends'],
      responses: {
        general: ['Focus on transferable skills', 'Consider emerging industries', 'Network strategically'],
        technical: ['Upskill through certifications', 'Build portfolio projects', 'Follow industry leaders']
      }
    }
  };

  // Get expert profile or return error
  function getExpert(expertName, question) {
    // Expert database
    const experts = {
      'careerAdvisor': {
        name: 'Dr. Sarah Johnson',
        title: 'Senior Career Strategist',
        expertise: ['Career Transitions', 'Skill Development', 'Industry Trends'],
        responses: {
          general: ['Focus on transferable skills', 'Consider emerging industries', 'Network strategically'],
          technical: ['Upskill through certifications', 'Build portfolio projects', 'Follow industry leaders']
        }
      }
    };
    const expert = experts[expertName] || {};
    if (!expert || !expert?.name || !expert?.responses) {
        return {
          error: 'Expert not available',
          availableExperts: Object.keys(experts).filter(e => experts[e]?.responses),
          suggestion: 'Try asking a general career question'
        };
    }
    return expert; // Return the expert if found
  }

  // Generate response with fallbacks
  // Get question from function parameters
  const question = typeof arguments[0] === 'string' ? arguments[0] : '';
  
  let response = '';
  if (!question) {
    const safeBackground = expert.background?.split('.')[0] || 'experienced professional';
    const safeExpertise = expert.expertise?.join(', ') || 'various technical fields';
    response = `Hello, I'm ${expert.name || 'a career expert'}, ${expert.title || 'senior professional'}. 
      ${safeBackground}. I'd be happy to share insights from my experience in ${safeExpertise}.`;
  } else {
    const questionLower = question.toLowerCase();
    let matches = 0;
    let responseCategory = 'default';

    // Enhanced keyword matching with minimum threshold
    for (const category in expert.responses) {
      const keywords = getCategoryKeywords(category);
      const matchCount = keywords.filter(kw => questionLower.includes(kw)).length;
      
      if (matchCount > matches || (matchCount === matches && category === 'default')) {
        matches = matchCount;
        responseCategory = category;
      }
    }

    response = expert.responses[responseCategory] || 
      `I recommend focusing on ${expert.expertise?.[0] || 'core industry skills'}. ` +
      'Would you like me to suggest learning resources?.';
  }

  function getExpertResponse(expert, response) {
    return {
      ...expert,
      response
    };
  }

/**
 * Get match level description based on score
 * @param {Number} score - Match score (0-100)
 * @returns {String} - Match level description
 */
const getMatchLevel = (score) => {
  if (score >= 80) return 'Excellent Match';
  if (score >= 60) return 'Strong Match';
  if (score >= 40) return 'Good Match';
  if (score >= 20) return 'Moderate Match';
  return 'Weak Match';
};

// ========== REAL-TIME CAREER OPPORTUNITY FEED ==========

/**
 * Get real-time career opportunities based on user's path
 * @param {String} careerPath - User's chosen career path
 * @param {Object} userProfile - User's profile information
 * @returns {Object} - Career opportunities data
 */
export const getCareerOpportunities = (careerPath, userProfile = {}) => {
  // Default opportunities structure
  const defaultOpportunities = {
    jobs: [],
    internships: [],
    competitions: [],
    hackathons: [],
    scholarships: [],
    lastUpdated: new Date().toISOString(),
    source: 'Simulated API Data'
  };
  
  // Sample opportunities data by career path
  const opportunitiesByCareer = {
    'Data Scientist': {
      jobs: [
        { title: 'Junior Data Scientist', company: 'TechCorp', location: 'Bangalore', salary: '₹8,00,000 - ₹12,00,000', postedDate: '2023-07-15', url: 'https://example.com/job1' },
        { title: 'Data Scientist', company: 'AnalyticsPro', location: 'Hyderabad', salary: '₹12,00,000 - ₹18,00,000', postedDate: '2023-07-10', url: 'https://example.com/job2' },
        { title: 'Machine Learning Engineer', company: 'AI Solutions', location: 'Remote', salary: '₹15,00,000 - ₹22,00,000', postedDate: '2023-07-05', url: 'https://example.com/job3' }
      ],
      internships: [
        { title: 'Data Science Intern', company: 'DataMinds', location: 'Mumbai', stipend: '₹25,000/month', duration: '6 months', postedDate: '2023-07-12', url: 'https://example.com/intern1' },
        { title: 'ML Research Intern', company: 'Research Labs', location: 'Pune', stipend: '₹30,000/month', duration: '3 months', postedDate: '2023-07-08', url: 'https://example.com/intern2' }
      ],
      competitions: [
        { title: 'Predictive Analytics Challenge', organizer: 'Kaggle', prize: '$10,000', deadline: '2023-08-15', url: 'https://example.com/comp1' },
        { title: 'AI for Good Hackathon', organizer: 'TechForChange', prize: '$5,000', deadline: '2023-09-01', url: 'https://example.com/comp2' }
      ],
      hackathons: [
        { title: 'Data Science Hackathon', organizer: 'TechFest', location: 'Online', date: '2023-08-20', prize: '₹2,00,000', url: 'https://example.com/hack1' },
        { title: 'ML Model Building Contest', organizer: 'AI Community', location: 'Bangalore', date: '2023-09-15', prize: '₹3,00,000', url: 'https://example.com/hack2' }
      ],
      scholarships: [
        { title: 'Data Science Excellence Scholarship', provider: 'Tech Foundation', amount: '₹2,50,000', deadline: '2023-08-30', url: 'https://example.com/schol1' },
        { title: 'Women in AI Scholarship', provider: 'WomenTech', amount: '₹3,00,000', deadline: '2023-09-15', url: 'https://example.com/schol2' }
      ]
    },
    'UX/UI Designer': {
      jobs: [
        { title: 'UI Designer', company: 'DesignStudio', location: 'Bangalore', salary: '₹7,00,000 - ₹12,00,000', postedDate: '2023-07-14', url: 'https://example.com/job4' },
        { title: 'UX/UI Designer', company: 'CreativeMinds', location: 'Mumbai', salary: '₹10,00,000 - ₹15,00,000', postedDate: '2023-07-09', url: 'https://example.com/job5' },
        { title: 'Senior UX Designer', company: 'UserFirst', location: 'Delhi', salary: '₹15,00,000 - ₹25,00,000', postedDate: '2023-07-03', url: 'https://example.com/job6' }
      ],
      internships: [
        { title: 'UI Design Intern', company: 'VisualArts', location: 'Pune', stipend: '₹20,000/month', duration: '6 months', postedDate: '2023-07-11', url: 'https://example.com/intern3' },
        { title: 'UX Research Intern', company: 'UserLabs', location: 'Hyderabad', stipend: '₹25,000/month', duration: '4 months', postedDate: '2023-07-07', url: 'https://example.com/intern4' }
      ],
      competitions: [
        { title: 'UI Design Challenge', organizer: 'Behance', prize: '$3,000', deadline: '2023-08-20', url: 'https://example.com/comp3' },
        { title: 'UX Case Study Competition', organizer: 'DesignWeek', prize: '$2,500', deadline: '2023-09-10', url: 'https://example.com/comp4' }
      ],
      hackathons: [
        { title: 'UI Design Sprint Challenge', organizer: 'DesignHub', location: 'Online', date: '2023-08-25', prize: '₹1,50,000', url: 'https://example.com/hack3' },
        { title: 'UX Hackathon', organizer: 'UX Community', location: 'Mumbai', date: '2023-09-20', prize: '₹2,00,000', url: 'https://example.com/hack4' }
      ],
      scholarships: [
        { title: 'Creative Design Scholarship', provider: 'Design Academy', amount: '₹2,00,000', deadline: '2023-08-25', url: 'https://example.com/schol3' },
        { title: 'UX Research Fellowship', provider: 'UX Foundation', amount: '₹2,50,000', deadline: '2023-09-10', url: 'https://example.com/schol4' }
      ]
    },
    'Full Stack Developer': {
      jobs: [
        { title: 'Junior Full Stack Developer', company: 'WebTech', location: 'Bangalore', salary: '₹8,00,000 - ₹14,00,000', postedDate: '2023-07-15', url: 'https://example.com/job7' },
        { title: 'Full Stack Engineer', company: 'SoftSolutions', location: 'Hyderabad', salary: '₹12,00,000 - ₹20,00,000', postedDate: '2023-07-08', url: 'https://example.com/job8' },
        { title: 'Senior Full Stack Developer', company: 'TechInnovate', location: 'Remote', salary: '₹18,00,000 - ₹30,00,000', postedDate: '2023-07-02', url: 'https://example.com/job9' }
      ],
      internships: [
        { title: 'Web Development Intern', company: 'CodeCraft', location: 'Delhi', stipend: '₹25,000/month', duration: '6 months', postedDate: '2023-07-13', url: 'https://example.com/intern5' },
        { title: 'Full Stack Intern', company: 'DevHub', location: 'Chennai', stipend: '₹30,000/month', duration: '3 months', postedDate: '2023-07-06', url: 'https://example.com/intern6' }
      ],
      competitions: [
        { title: 'Full Stack Development Challenge', organizer: 'GitHub', prize: '$5,000', deadline: '2023-08-10', url: 'https://example.com/comp5' },
        { title: 'Web App Innovation Contest', organizer: 'TechFest', prize: '$4,000', deadline: '2023-09-05', url: 'https://example.com/comp6' }
      ],
      hackathons: [
        { title: 'Code-a-thon', organizer: 'DevCommunity', location: 'Online', date: '2023-08-15', prize: '₹2,50,000', url: 'https://example.com/hack5' },
        { title: 'Web Development Hackathon', organizer: 'CodeFest', location: 'Bangalore', date: '2023-09-10', prize: '₹3,50,000', url: 'https://example.com/hack6' }
      ],
      scholarships: [
        { title: 'Coding Excellence Scholarship', provider: 'Tech Foundation', amount: '₹2,00,000', deadline: '2023-08-20', url: 'https://example.com/schol5' },
        { title: 'Software Engineering Scholarship', provider: 'Dev Academy', amount: '₹2,50,000', deadline: '2023-09-05', url: 'https://example.com/schol6' }
      ]
    }
  };
  
  // Get opportunities for the specified career path or return empty structure
  const opportunities = opportunitiesByCareer[careerPath] || {
    jobs: [],
    internships: [],
    competitions: [],
    hackathons: [],
    scholarships: []
  };
  
  // Personalize opportunities if user profile is provided
  if (userProfile && Object.keys(userProfile).length > 0) {
    return personalizeOpportunities(opportunities, userProfile, careerPath);
  }
  
  return { ...defaultOpportunities, ...opportunities };
};

/**
 * Personalize opportunities based on user profile
 * @param {Object} opportunities - Base opportunities
 * @param {Object} userProfile - User's profile
 * @param {String} careerPath - User's career path
 * @returns {Object} - Personalized opportunities
 */
const personalizeOpportunities = (opportunities, userProfile, careerPath) => {
  const personalized = JSON.parse(JSON.stringify(opportunities));
  
  // Filter jobs based on experience level
  if (userProfile.experienceLevel) {
    personalized.jobs = filterJobsByExperience(personalized.jobs, userProfile.experienceLevel);
  }
  
  // Filter by location preference
  if (userProfile.locationPreference) {
    personalized.jobs = filterByLocation(personalized.jobs, userProfile.locationPreference);
    personalized.internships = filterByLocation(personalized.internships, userProfile.locationPreference);
    personalized.hackathons = filterByLocation(personalized.hackathons, userProfile.locationPreference);
  }
  
  // Add personalization metadata
  personalized.isPersonalized = true;
  personalized.personalizedFor = userProfile.name || 'User';
  
  return personalized;
};

/**
 * Filter jobs by experience level
 * @param {Array} jobs - List of jobs
 * @param {String} experienceLevel - User's experience level
 * @returns {Array} - Filtered jobs
 */
const filterJobsByExperience = (jobs, experienceLevel) => {
  // Map experience levels to job titles
  const experienceMappings = {
    'Entry Level': ['Junior', 'Entry', 'Associate', 'Trainee'],
    'Mid Level': ['', 'Mid', 'Intermediate'],
    'Senior Level': ['Senior', 'Lead', 'Principal', 'Manager']
  };
  
  return jobs.filter(job => {
            const title = job.title.toLowerCase();
            const levelKeywords = experienceMappings[experienceLevel] || [];
            return levelKeywords.some(keyword => 
                title.includes(keyword.toLowerCase())
            );
        });
};

