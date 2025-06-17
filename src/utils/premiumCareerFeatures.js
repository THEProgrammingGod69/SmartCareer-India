// Premium Career Features
import { sampleCareers } from '../pages/ExploreCareer_fixed';

// Combine all career data
export const allCareers = [...sampleCareers];

// ========== COGNITIVE CAREER FIT ANALYZER ==========

/**
 * Get cognitive strengths for a career
 * @param {Object} userProfile - User's cognitive profile
 * @param {Object} careerProfile - Career's cognitive profile
 * @returns {Array} - List of cognitive strengths
 */
const getCognitiveStrengths = (userProfile, careerProfile) => {
  if (!userProfile || !careerProfile) return [];
  
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
 * Get cognitive gaps for a career
 * @param {Object} userProfile - User's cognitive profile
 * @param {Object} careerProfile - Career's cognitive profile
 * @returns {Array} - List of cognitive gaps
 */
const getCognitiveGaps = (userProfile, careerProfile) => {
  if (!userProfile || !careerProfile) return [];
  
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

/**
 * Analyze cognitive fit for careers based on cognitive traits
 * @param {Object} cognitiveProfile - User's cognitive profile from tests
 * @returns {Array} - Careers with cognitive fit scores
 */
export const analyzeCognitiveFit = (cognitiveProfile) => {
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
    
    const strengths = getCognitiveStrengths(profile, cognitiveProfile);
    const gaps = getCognitiveGaps(profile, cognitiveProfile);
    
    return {
      ...career,
      cognitiveFitScore: Math.round(fitScore * 100),
      cognitiveStrengths: strengths,
      cognitiveGaps: gaps
    };
  }).sort((a, b) => b.cognitiveFitScore - a.cognitiveFitScore);
};

// ========== BURNOUT & LIFESTYLE PREDICTION ==========

/**
 * Predict burnout risk and lifestyle compatibility for careers
 * @param {Object} userPreferences - User's lifestyle preferences
 * @returns {Array} - Careers with burnout and lifestyle predictions
 */
export const predictBurnoutAndLifestyle = (userPreferences = {}) => {
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
-    'UX/UI Designer': {
      workLifeBalance: 0.7,
      stressLevel: 0.5,
      typicalWorkload: 0.6,
      flexibility: 0.7,
      socialInteraction: 0.8,
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
    
    // Calculate compatibility scores
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

// Helper function to calculate personal burnout risk
const calculatePersonalBurnoutRisk = (baseRisk, preferences, profile) => {
  let riskScore = baseRisk;
  
  // Adjust risk based on preference mismatches
  if (Math.abs(preferences.workLifeBalance - profile.workLifeBalance) > 0.3) {
    riskScore += 0.1;
  }
  
  if (Math.abs(preferences.stressPreference - profile.stressLevel) > 0.3) {
    riskScore += 0.15;
  }
  
  if (Math.abs(preferences.workloadPreference - profile.typicalWorkload) > 0.3) {
    riskScore += 0.1;
  }
  
  return Math.min(1, Math.max(0, riskScore));
};

// Helper function to get burnout risk level
const getBurnoutRiskLevel = (riskScore) => {
  if (riskScore < 0.3) return 'Low';
  if (riskScore < 0.5) return 'Low to Moderate';
  if (riskScore < 0.7) return 'Moderate';
  if (riskScore < 0.85) return 'Moderate to High';
  return 'High';
};

// ========== CAREER SIMULATION ==========

/**
 * Get career simulation data for a specific career
 * @param {String} careerTitle - The title of the career to simulate
 * @returns {Object} - Career simulation data
 */
export const getCareerSimulation = (careerTitle) => {
  const careerSimulations = {
    'Data Scientist': {
      simulationType: 'immersive',
      description: 'Experience data analysis and machine learning model development',
      duration: '45 minutes',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      scenarios: [
        'Data exploration and cleaning',
        'Model training and evaluation',
        'Presenting insights to stakeholders',
        'Deploying ML models'
      ]
    },
    'UX/UI Designer': {
      simulationType: 'interactive',
      description: 'Design user interfaces and conduct usability testing',
      duration: '40 minutes',
      skills: ['UI Design', 'User Research', 'Prototyping'],
      scenarios: [
        'User research and persona creation',
        'Wireframing a new feature',
        'Usability testing with stakeholders',
        'Design review meeting'
      ]
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
      ]
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
      ]
    },
    'Product Manager': {
      simulationType: 'mixed',
      description: 'Lead a product team through feature development and launch',
      duration: '50 minutes',
      skills: ['Leadership', 'Strategy', 'Communication'],
      scenarios: [
        'Product strategy meeting',
        'Feature prioritization',
        'Team coordination',
        'Stakeholder presentation'
      ]
    },
    'Financial Analyst': {
      simulationType: 'interactive',
      description: 'Analyze financial data and make investment recommendations',
      duration: '35 minutes',
      skills: ['Financial Analysis', 'Market Research', 'Risk Assessment'],
      scenarios: [
        'Market analysis',
        'Financial modeling',
        'Investment research',
        'Client presentation'
      ]
    }
  };

  // Return simulation data for the requested career or a default template
  return careerSimulations[careerTitle] || {
    simulationType: 'basic',
    description: `Experience a day in the life of a ${careerTitle}`,
    duration: '30 minutes',
    skills: ['Professional Skills', 'Communication', 'Problem Solving'],
    scenarios: [
      'Daily planning and organization',
      'Team collaboration',
      'Problem solving',
      'Project completion'
    ]
  };
};