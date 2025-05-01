// New Premium Career Features
// This utility provides additional advanced career guidance features including:
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

// ========== SMART RESUME BUILDER (CAREER-BASED) ==========

/**
 * Generate a career-specific resume template with auto-filled data
 * @param {String} careerTitle - The title of the career
 * @param {Object} userData - User's profile and journey data
 * @param {Boolean} isPremium - Whether user has premium access
 * @returns {Object} - Resume data and template
 */
export const generateSmartResume = (careerTitle, userData = {}, isPremium = false) => {
  // Default user data if none provided
  const defaultUserData = {
    personalInfo: {
      name: 'User Name',
      email: 'user@example.com',
      phone: '+91 9876543210',
      location: 'Mumbai, India',
      linkedIn: 'linkedin.com/in/username'
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: []
  };
  
  const userInfo = { ...defaultUserData, ...userData };
  
  // Career-specific resume templates
  const resumeTemplates = {
    'Data Scientist': {
      sections: ['Skills', 'Experience', 'Projects', 'Education', 'Certifications'],
      skillsFormat: 'categorized', // 'categorized', 'list', 'rating'
      experienceFormat: 'detailed', // 'detailed', 'concise'
      highlightedSections: ['Projects', 'Skills'],
      keywordsToHighlight: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'AI'],
      color: '#3a86ff',
      style: 'modern'
    },
    'UX/UI Designer': {
      sections: ['Portfolio', 'Skills', 'Experience', 'Education', 'Certifications'],
      skillsFormat: 'categorized',
      experienceFormat: 'detailed',
      highlightedSections: ['Portfolio', 'Skills'],
      keywordsToHighlight: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD'],
      color: '#8b5cf6',
      style: 'creative'
    },
    'Full Stack Developer': {
      sections: ['Skills', 'Projects', 'Experience', 'Education', 'Certifications'],
      skillsFormat: 'categorized',
      experienceFormat: 'detailed',
      highlightedSections: ['Projects', 'Skills'],
      keywordsToHighlight: ['JavaScript', 'React', 'Node.js', 'API', 'Database'],
      color: '#10b981',
      style: 'technical'
    },
    'Product Manager': {
      sections: ['Experience', 'Skills', 'Projects', 'Education', 'Certifications'],
      skillsFormat: 'list',
      experienceFormat: 'detailed',
      highlightedSections: ['Experience', 'Projects'],
      keywordsToHighlight: ['Strategy', 'Roadmap', 'User-Centric', 'Cross-Functional', 'Agile'],
      color: '#f59e0b',
      style: 'professional'
    }
  };
  
  // Get template for the specified career or use default
  const template = resumeTemplates[careerTitle] || {
    sections: ['Experience', 'Education', 'Skills', 'Projects', 'Certifications'],
    skillsFormat: 'list',
    experienceFormat: 'concise',
    highlightedSections: ['Experience', 'Skills'],
    keywordsToHighlight: [],
    color: '#3a86ff',
    style: 'standard'
  };
  
  // Generate resume content with AI-based suggestions
  const resumeContent = generateResumeContent(userInfo, template, careerTitle);
  
  // Add premium features if user has premium access
  const premiumFeatures = isPremium ? {
    exportOptions: ['PDF', 'DOCX', 'LinkedIn', 'Indeed', 'Naukri'],
    aiSuggestions: generateAISuggestions(userInfo, careerTitle),
    alternateVersions: generateAlternateVersions(userInfo, careerTitle),
    keywordOptimization: true,
    atsCompatibilityScore: calculateATSScore(resumeContent, careerTitle)
  } : {
    exportOptions: ['PDF'],
    aiSuggestions: [],
    alternateVersions: [],
    keywordOptimization: false,
    atsCompatibilityScore: null
  };
  
  return {
    template,
    content: resumeContent,
    ...premiumFeatures
  };
};

/**
 * Generate resume content based on user data and career
 * @param {Object} userData - User's profile data
 * @param {Object} template - Resume template
 * @param {String} careerTitle - Target career
 * @returns {Object} - Structured resume content
 */
const generateResumeContent = (userData, template, careerTitle) => {
  // In a real implementation, this would use AI to generate optimized content
  // For now, we'll return structured user data with some enhancements
  
  // Enhance skills section with career-relevant skills
  const enhancedSkills = enhanceSkillsForCareer(userData.skills, careerTitle);
  
  // Enhance experience descriptions to highlight relevant achievements
  const enhancedExperience = enhanceExperienceForCareer(userData.experience, careerTitle);
  
  return {
    personalInfo: userData.personalInfo,
    skills: enhancedSkills,
    experience: enhancedExperience,
    education: userData.education,
    projects: userData.projects,
    certifications: userData.certifications,
    summary: generateCareerSummary(userData, careerTitle)
  };
};

/**
 * Enhance user skills for specific career
 * @param {Array} userSkills - User's skills
 * @param {String} careerTitle - Target career
 * @returns {Array} - Enhanced skills
 */
const enhanceSkillsForCareer = (userSkills, careerTitle) => {
  // Career-specific skill categories and important skills
  const careerSkills = {
    'Data Scientist': {
      categories: {
        'Programming Languages': ['Python', 'R', 'SQL'],
        'Machine Learning': ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning'],
        'Data Visualization': ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn'],
        'Big Data': ['Hadoop', 'Spark', 'Kafka']
      },
      important: ['Python', 'Machine Learning', 'Statistical Analysis', 'Data Visualization']
    },
    'UX/UI Designer': {
      categories: {
        'Design Tools': ['Figma', 'Adobe XD', 'Sketch', 'Photoshop'],
        'Research': ['User Interviews', 'Usability Testing', 'A/B Testing'],
        'Design Skills': ['Wireframing', 'Prototyping', 'Visual Design'],
        'Collaboration': ['Design Systems', 'Handoff', 'Team Collaboration']
      },
      important: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    }
  };
  
  // Get skills for the specified career or use default
  const skillsData = careerSkills[careerTitle] || {
    categories: {
      'General Skills': [],
      'Technical Skills': [],
      'Soft Skills': []
    },
    important: []
  };
  
  // Categorize user skills and highlight important ones
  // In a real implementation, this would use AI to categorize and enhance skills
  return userSkills;
};

/**
 * Enhance user experience descriptions for specific career
 * @param {Array} experience - User's experience
 * @param {String} careerTitle - Target career
 * @returns {Array} - Enhanced experience
 */
const enhanceExperienceForCareer = (experience, careerTitle) => {
  // In a real implementation, this would use AI to enhance experience descriptions
  // to highlight achievements relevant to the target career
  return experience;
};

/**
 * Generate career-specific summary
 * @param {Object} userData - User's profile data
 * @param {String} careerTitle - Target career
 * @returns {String} - Professional summary
 */
const generateCareerSummary = (userData, careerTitle) => {
  // In a real implementation, this would use AI to generate a tailored summary
  return `Experienced professional with a background in ${userData.experience.length > 0 ? userData.experience[0].field : 'relevant fields'} seeking opportunities as a ${careerTitle}.`;
};

/**
 * Generate AI-based suggestions for resume improvement
 * @param {Object} userData - User's profile data
 * @param {String} careerTitle - Target career
 * @returns {Array} - Suggestions for improvement
 */
const generateAISuggestions = (userData, careerTitle) => {
  // In a real implementation, this would use AI to generate personalized suggestions
  return [
    'Add more quantifiable achievements to your experience section',
    `Highlight projects that demonstrate your skills in ${careerTitle}-related areas`,
    'Consider adding relevant certifications to strengthen your profile',
    'Use more action verbs in your experience descriptions'
  ];
};

/**
 * Generate alternate resume versions for different contexts
 * @param {Object} userData - User's profile data
 * @param {String} careerTitle - Target career
 * @returns {Array} - Alternate resume versions
 */
const generateAlternateVersions = (userData, careerTitle) => {
  // In a real implementation, this would generate different resume versions
  return [
    { name: 'Standard', description: 'Balanced resume for most applications' },
    { name: 'Achievement-focused', description: 'Emphasizes quantifiable results' },
    { name: 'Skills-focused', description: 'Highlights technical expertise' }
  ];
};

/**
 * Calculate ATS compatibility score
 * @param {Object} resumeContent - Resume content
 * @param {String} careerTitle - Target career
 * @returns {Number} - ATS compatibility score (0-100)
 */
const calculateATSScore = (resumeContent, careerTitle) => {
  // In a real implementation, this would analyze the resume for ATS compatibility
  return 85; // Example score
};

// ========== MICRO-CAREER EXPLORER ==========

/**
 * Explore niche career paths that are usually overlooked
 * @param {String} baseCareer - The base career to find niche paths for
 * @param {Boolean} isPremium - Whether user has premium access
 * @returns {Array} - Niche career paths
 */
export const exploreMicroCareers = (baseCareer = null, isPremium = false) => {
  // Database of niche careers
  const nicheCareers = [
    {
      title: 'Ethical Hacker for Medical Devices',
      baseCareer: 'Cybersecurity Analyst',
      description: 'Specialize in identifying security vulnerabilities in medical devices to protect patient safety and data privacy.',
      skills: ['Cybersecurity', 'Medical Device Knowledge', 'Penetration Testing', 'Risk Assessment'],
      education: 'Bachelor\'s in Cybersecurity or Computer Science with healthcare specialization',
      salary: '₹12,00,000 - ₹25,00,000 per year',
      growth: 'High',
      uniqueValue: 'Combines cybersecurity expertise with healthcare impact',
      spotlight: true
    },
    {
      title: 'Wildlife Videographer with AI Drones',
      baseCareer: 'Videographer',
      description: 'Capture wildlife footage using AI-powered drones that can track and film animals in their natural habitats without human interference.',
      skills: ['Drone Piloting', 'Wildlife Knowledge', 'Video Editing', 'AI Programming'],
      education: 'Bachelor\'s in Film/Photography with courses in Wildlife Biology and AI',
      salary: '₹8,00,000 - ₹20,00,000 per year',
      growth: 'Medium',
      uniqueValue: 'Blends technology with nature conservation',
      spotlight: true
    },
    {
      title: 'Financial Coach for Athletes',
      baseCareer: 'Financial Advisor',
      description: 'Provide specialized financial guidance for athletes who often have high earnings for short periods and unique career trajectories.',
      skills: ['Financial Planning', 'Sports Industry Knowledge', 'Career Transition Planning', 'Investment Strategy'],
      education: 'Bachelor\'s in Finance with Sports Management knowledge',
      salary: '₹10,00,000 - ₹30,00,000 per year',
      growth: 'Medium',
      uniqueValue: 'Addresses the unique financial challenges of athletic careers',
      spotlight: true
    },
    {
      title: 'Sustainable Fashion Supply Chain Analyst',
      baseCareer: 'Supply Chain Analyst',
      description: 'Optimize fashion supply chains for sustainability, tracing materials from source to consumer and minimizing environmental impact.',
      skills: ['Supply Chain Management', 'Sustainability Metrics', 'Textile Knowledge', 'Data Analysis'],
      education: 'Bachelor\'s in Supply Chain Management with Sustainability focus',
      salary: '₹8,00,000 - ₹18,00,000 per year',
      growth: 'High',
      uniqueValue: 'Combines fashion industry with environmental impact',
      spotlight: false
    },
    {
      title: 'Neuromarketing Specialist',
      baseCareer: 'Marketing Specialist',
      description: 'Apply neuroscience techniques to understand consumer behavior and create more effective marketing strategies.',
      skills: ['Neuroscience Basics', 'Marketing', 'Data Analysis', 'Consumer Psychology'],
      education: 'Bachelor\'s in Marketing with Neuroscience or Psychology courses',
      salary: '₹9,00,000 - ₹20,00,000 per year',
      growth: 'Medium',
      uniqueValue: 'Uses brain science to enhance marketing effectiveness',
      spotlight: false
    },
    {
      title: 'AI Ethics Consultant',
      baseCareer: 'Data Scientist',
      description: 'Help organizations develop and implement ethical frameworks for AI systems to ensure responsible and unbiased technology.',
      skills: ['AI/ML Knowledge', 'Ethics', 'Policy Development', 'Bias Detection'],
      education: 'Master\'s in AI, Computer Science, or Ethics',
      salary: '₹15,00,000 - ₹30,00,000 per year',
      growth: 'High',
      uniqueValue: 'Ensures AI development aligns with human values and ethics',
      spotlight: true
    }
  ];
  
  // Filter by base career if specified
  let filteredCareers = baseCareer ? 
    nicheCareers.filter(career => career.baseCareer === baseCareer) : 
    nicheCareers;
  
  // For non-premium users, limit results and hide some details
  if (!isPremium) {
    // Only show spotlight careers for non-premium users
    filteredCareers = filteredCareers.filter(career => career.spotlight);
    
    // Limit to 3 results for non-premium
    filteredCareers = filteredCareers.slice(0, 3);
    
    // Remove some premium details
    filteredCareers = filteredCareers.map(career => ({
      ...career,
      uniqueValue: undefined,
      spotlight: undefined
    }));
  }
  
  // Add premium feature - weekly spotlight
  const weeklySpotlight = isPremium ? {
    title: 'Weekly Spotlight',
    description: 'Each week we highlight a rare, high-potential career path with detailed insights and interviews with professionals.',
    currentSpotlight: nicheCareers.find(career => career.spotlight) || nicheCareers[0],
    previousSpotlights: ['Quantum Computing Ethics Officer', 'Bioprinting Specialist', 'Climate Migration Consultant']
  } : null;
  
  return {
    careers: filteredCareers,
    weeklySpotlight,
    totalAvailable: nicheCareers.length,
    premiumUnlock: !isPremium ? 'Unlock all niche careers with premium' : undefined
  };
};

// ========== PEER CAREER TRACKER ==========

/**
 * Track and compare career progress with peers
 * @param {String} userId - Current user ID
 * @param {Array} peerIds - IDs of peers to track
 * @param {Boolean} isPremium - Whether user has premium access
 * @returns {Object} - Peer comparison data
 */
export const trackPeerCareers = (userId, peerIds = [], isPremium = false) => {
  // In a real implementation, this would fetch data from a database
  // For now, we'll generate sample data
  
  // Sample user data
  const userData = {
    id: userId,
    name: 'Current User',
    career: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    education: [
      { degree: 'B.Tech in Computer Science', institution: 'VIT University', year: 2022 }
    ],
    certifications: [
      { name: 'Machine Learning Specialization', provider: 'Coursera', year: 2023 }
    ],
    projects: [
      { name: 'Customer Churn Prediction', description: 'Built a model to predict customer churn', year: 2023 }
    ],
    milestones: [
      { title: 'First Internship', description: 'Data Science Intern at Tech Corp', date: '2022-06' },
      { title: 'Completed Major Project', description: 'Predictive Analytics for E-commerce', date: '2023-01' }
    ]
  };
  
  // Sample peer data
  const peersData = [
    {
      id: 'peer1',
      name: 'Peer 1',
      career: 'Data Scientist',
      skills: ['Python', 'R', 'Deep Learning', 'NLP'],
      education: [
        { degree: 'B.Tech in Computer Science', institution: 'VIT University', year: 2022 }
      ],
      certifications: [
        { name: 'Deep Learning Specialization', provider: 'Coursera', year: 2023 }
      ],
      projects: [
        { name: 'Sentiment Analysis Tool', description: 'Built an NLP tool for sentiment analysis', year: 2023 }
      ],
      milestones: [
        { title: 'Research Internship', description: 'AI Research at Tech Institute', date: '2022-05' },
        { title: 'Published Paper', description: 'Research paper on NLP techniques', date: '2023-02' }
      ],
      isVisible: true
    },
    {
      id: 'peer2',
      name: 'Peer 2',
      career: 'UX/UI Designer',
      skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design'],
      education: [
        { degree: 'B.Des in Interaction Design', institution: 'Design Institute', year: 2022 }
      ],
      certifications: [
        { name: 'UX Design Professional Certificate', provider: 'Google', year: 2023 }
      ],
      projects: [
        { name: 'E-commerce App Redesign', description: 'Redesigned the UX for a major e-commerce platform', year: 2023 }
      ],
      milestones: [
        { title: 'Design Internship', description: 'UX Intern at Design Studio', date: '2022-06' },
        { title: 'Design Award', description: 'Won student design competition', date: '2023-03' }
      ],
      isVisible: true
    }
  ];
  
  // Filter peers by provided IDs if any
  const filteredPeers = peerIds.length > 0 ? 
    peersData.filter(peer => peerIds.includes(peer.id)) : 
    peersData;
  
  // Generate comparison metrics
  const comparisonMetrics = generateComparisonMetrics(userData, filteredPeers);
  
  // Generate collaboration opportunities
  const collaborationOpportunities = isPremium ? 
    generateCollaborationOpportunities(userData, filteredPeers) : 
    [];
  
  // For non-premium users, limit data
  if (!isPremium) {
    // Limit visible peers
    const limitedPeers = filteredPeers.slice(0, 1).map(peer => ({
      ...peer,
      projects: peer.projects.slice(0, 1),
      milestones: peer.milestones.slice(0, 1)
    }));
    
    return {
      user: {
        ...userData,
        projects: userData.projects.slice(0, 1),
        milestones: userData.milestones.slice(0, 1)
      },
      peers: limitedPeers,
      comparisonMetrics: comparisonMetrics.slice(0, 2),
      collaborationOpportunities: [],
      premiumUnlock: 'Unlock full peer tracking with premium'
    };
  }
  
  return {
    user: userData,
    peers: filteredPeers,
    comparisonMetrics,
    collaborationOpportunities,
    suggestedPeers: generateSuggestedPeers(userData)
  };
};

/**
 * Generate comparison metrics between user and peers
 * @param {Object} userData - User data
 * @param {Array} peersData - Peers data
 * @returns {Array} - Comparison metrics
 */
const generateComparisonMetrics = (userData, peersData) => {
  // In a real implementation, this would generate meaningful comparisons
  return [
    {
      name: 'Skill Overlap',
      description: 'Common skills between you and your peers',
      user: userData.skills.length,
      peers: peersData.map(peer => ({
        id: peer.id,
        name: peer.name,
        value: peer.skills.filter(skill => userData.skills.includes(skill)).length,
        total: peer.skills.length
      }))
    },
    {
      name: 'Certification Progress',
      description: 'Number of professional certifications',
      user: userData.certifications.length,
      peers: peersData.map(peer => ({
        id: peer.id,
        name: peer.name,
        value: peer.certifications.length
      }))
    },
    {
      name: 'Project Portfolio',
      description: 'Number of completed projects',
      user: userData.projects.length,
      peers: peersData.map(peer => ({
        id: peer.id,
        name: peer.name,
        value: peer.projects.length
      }))
    }
  ];
};

/**
 * Generate collaboration opportunities with peers
 * @param {Object} userData - User data
 * @param {Array} peersData - Peers data
 * @returns {Array} - Collaboration opportunities
 */
const generateCollaborationOpportunities = (userData, peersData) => {
  // In a real implementation, this would identify meaningful collaboration opportunities
  return [
    {
      title: 'Joint Project Opportunity',
      description: 'Collaborate with Peer 1 on a machine learning project combining your data visualization skills with their NLP expertise',
      peers: ['peer1'],
      potentialOutcome: 'Enhanced portfolio with cross-domain project'
    },
    {
      title: 'Study Group',
      description: 'Form a study group with peers to prepare for advanced certifications',
      peers: ['peer1', 'peer2'],
      potentialOutcome: 'Higher certification success rate'
    }
  ];
};

/**
 * Generate suggested peers based on user profile
 * @param {Object} userData - User data
 * @returns {Array} - Suggested peers
 */
const generateSuggestedPeers = (userData) => {
  // In a real implementation, this would suggest relevant peers from the database
  return [
    {
      id: 'suggested1',
      name: 'Suggested Peer 1',
      career: 'Data Engineer',
      matchReason: 'Complementary skills in data pipeline development'
    },
    {
      id: 'suggested2',
      name: 'Suggested Peer 2',
      career: 'ML Engineer',
      matchReason: 'Similar career trajectory with focus on deployment'
    }
  ];
};

// ========== CAREER SWITCHING ENGINE ==========

/**
 * Analyze career switching possibilities for a user
 * @param {String} currentCareer - User's current career
 * @param {Array} userSkills - User's current skills
 * @param {Boolean} isPremium - Whether user has premium access
 * @returns {Object} - Career switching analysis
 */
export const analyzeCareerSwitch = (currentCareer, userSkills = [], isPremium = false) => {
  // Get all careers except current one
  const potentialCareers = allCareers.filter(career => career.title !== currentCareer);
  
  // Calculate transferability scores for each potential career
  const careerMatches = potentialCareers.map(career => {
    const transferabilityScore = calculateTransferabilityScore(currentCareer, career.title, userSkills);
    const transitionDifficulty = calculateTransitionDifficulty(transferabilityScore);
    const timeToTransition = estimateTransitionTime(transferabilityScore, career.title);
    const requiredTraining = identifyRequiredTraining(currentCareer, career.title, userSkills);
    
    return {
      career: career.title,
      category: career.category,
      transferabilityScore: Math.round(transferabilityScore * 100),
      transitionDifficulty,
      timeToTransition,
      requiredTraining: requiredTraining.slice(0, isPremium ? requiredTraining.length : 2),
      skillGaps: identifySkillGaps(userSkills, career.skills).slice(0, isPremium ? 10 : 3),
      transferableSkills: identifyTransferableSkills(userSkills, career.skills).slice(0, isPremium ? 10 : 3)
    };
  });
  
  // Sort by transferability score (highest first)
  const sortedMatches = careerMatches.sort((a, b) => b.transferabilityScore - a.transferabilityScore);
  
  // For non-premium users, limit results
  const limitedMatches = isPremium ? sortedMatches : sortedMatches.slice(0, 3);
  
  // Generate transition plan for top match
  const topMatch = sortedMatches[0];
  const transitionPlan = isPremium ? 
    generateTransitionPlan(currentCareer, topMatch.career, userSkills) : 
    null;
  
  return {
    currentCareer,
    matches: limitedMatches,
    transitionPlan,
    totalMatches: sortedMatches.length,
    premiumUnlock: !isPremium ? 'Unlock full career switching analysis with premium' : undefined
  };
};

/**
 * Calculate transferability score between careers
 * @param {String} sourceCareer - Source career
 * @param {String} targetCareer - Target career
 * @param {Array} userSkills - User's current skills
 * @returns {Number} - Transferability score (0-1)
 */
const calculateTransferabilityScore = (sourceCareer, targetCareer, userSkills) => {
  // Career transferability matrix (sample data)
  const transferabilityMatrix = {
    'Data Scientist': {
      'Machine Learning Engineer': 0.9,
      'Data Engineer': 0.8,
      'Business Analyst': 0.7,
      'UX/UI Designer': 0.3,
      'Product Manager': 0.6,
      'Full Stack Developer': 0.5
    },
    'UX/UI Designer': {
      'Product Manager': 0.7,
      'Web Developer': 0.6,
      'Graphic Designer': 0.8,
      'Data Scientist': 0.3,
      'Full Stack Developer': 0.5,
      'Digital Marketing Specialist': 0.6
    },
    'Full Stack Developer': {
      'Frontend Developer': 0.9,
      'Backend Developer': 0.9,
      'DevOps Engineer': 0.7,
      'UX/UI Designer': 0.5,
      'Data Scientist': 0.5,
      'Product Manager': 0.6
    }
  };
  
  // Get base transferability score from matrix or use default
  const baseScore = (transferabilityMatrix[sourceCareer] && transferabilityMatrix[sourceCareer][targetCareer]) || 0.4;
  
  // Adjust score based on user skills (in a real implementation, this would be more sophisticated)
  let skillAdjustment = 0;
  
  // Find the target career in allCareers
  const targetCareerData = allCareers.find(career => career.title === targetCareer);
  
  // If target career is found, check skill overlap
  if (targetCareerData && targetCareerData.skills) {
    const targetSkills = targetCareerData.skills;
    const skillOverlap = userSkills.filter(skill => targetSkills.includes(skill)).length;
    
    // Calculate skill overlap ratio
    const overlapRatio = skillOverlap / targetSkills.length;
    
    // Adjust score based on skill overlap
    skillAdjustment = overlapRatio * 0.2; // Max adjustment of 0.2
  }
  
  return Math.min(1, Math.max(0, baseScore + skillAdjustment));
};

/**
 * Calculate transition difficulty level
 * @param {Number} transferabilityScore - Transferability score (0-1)
 * @returns {String} - Difficulty level
 */
const calculateTransitionDifficulty = (transferabilityScore) => {
  if (transferabilityScore >= 0.8) return 'Easy';
  if (transferabilityScore >= 0.6) return 'Moderate';
  if (transferabilityScore >= 0.4) return 'Challenging';
  if (transferabilityScore >= 0.2) return 'Difficult';
  return 'Very Difficult';
};

/**
 * Estimate time required for career transition
 * @param {Number} transferabilityScore - Transferability score (0-1)
 * @param {String} targetCareer - Target career
 * @returns {String} - Estimated time
 */
const estimateTransitionTime = (transferabilityScore, targetCareer) => {
  // Base time estimates by difficulty
  const baseTimeEstimates = {
    'Easy': '3-6 months',
    'Moderate': '6-12 months',
    'Challenging': '12-18 months',
    'Difficult': '18-24 months',
    'Very Difficult': '24+ months'
  };
  
  // Get difficulty level
  const difficulty = calculateTransitionDifficulty(transferabilityScore);
  
  // Special cases for certain careers that require specific education/certification
  const specialCases = {
    'Data Scientist': transferabilityScore < 0.7 ? '12-24 months (including specialized education)' : null,
    'Cybersecurity Analyst': transferabilityScore < 0.6 ? '12-18 months (including certifications)' : null
  };
  
  return specialCases[targetCareer] || baseTimeEstimates[difficulty];
};

/**
 * Identify required training for career transition
 * @param {String} sourceCareer - Source career
 * @param {String} targetCareer - Target career
 * @param {Array} userSkills - User's current skills
 * @returns {Array} - Required training
 */
const identifyRequiredTraining = (sourceCareer, targetCareer, userSkills) => {
  // Sample training recommendations by career
  const trainingRecommendations = {
    'Data Scientist': [
      { type: 'Course', name: 'Python for Data Science', provider: 'Coursera', duration: '3 months' },
      { type: 'Course', name: 'Machine Learning', provider: 'Stanford Online', duration: '3 months' },
      { type: 'Certification', name: 'IBM Data Science Professional Certificate', provider: 'IBM', duration: '6 months' },
      { type: 'Project', name: 'Build a predictive model portfolio', duration: '2 months' }
    ],
    'UX/UI Designer': [
      { type: 'Course', name: 'UI/UX Design Fundamentals', provider: 'Udemy', duration: '2 months' },
      { type: 'Course', name: 'User Research Methods', provider: 'Interaction Design Foundation', duration: '1 month' },
      { type: 'Certification', name: 'Google UX Design Professional Certificate', provider: 'Google', duration: '6 months' },
      { type: 'Project', name: 'Build a design portfolio with 3 case studies', duration: '3 months' }
    ],
    'Full Stack Developer': [
      { type: 'Course', name: 'Web Development Bootcamp', provider: 'Udemy', duration: '3 months' },
      { type: 'Course', name: 'JavaScript Algorithms and Data Structures', provider: 'freeCodeCamp', duration: '2 months' },
      { type: 'Project', name: 'Build a full-stack web application', duration: '2 months' },
      { type: 'Certification', name: 'AWS Certified Developer', provider: 'Amazon', duration: '3 months' }
    ]
  };
  
  // Get recommendations for target career or return generic recommendations
  return trainingRecommendations[targetCareer] || [
    { type: 'Course', name: `${targetCareer} Fundamentals`, provider: 'Various', duration: '3 months' },
    { type: 'Project', name: `Build a ${targetCareer} portfolio`, duration: '2 months' },
    { type: 'Networking', name: 'Connect with professionals in the field', duration: 'Ongoing' }
  ];
};

/**
 * Identify skill gaps for career transition
 * @param {Array} userSkills - User's current skills
 * @param {Array} targetSkills - Target career required skills
 * @returns {Array} - Skill gaps
 */
const identifySkillGaps = (userSkills, targetSkills) => {
  if (!targetSkills) return [];
  return targetSkills.filter(skill => !userSkills.includes(skill));
};

/**
 * Identify transferable skills for career transition
 * @param {Array} userSkills - User's current skills
 * @param {Array} targetSkills - Target career required skills
 * @returns {Array} - Transferable skills
 */
const identifyTransferableSkills = (userSkills, targetSkills) => {
  if (!targetSkills) return [];
  return userSkills.filter(skill => targetSkills.includes(skill));
};

/**
 * Generate a transition plan for career switch
 * @param {String} sourceCareer - Source career
 * @param {String} targetCareer - Target career
 * @param {Array} userSkills - User's current skills
 * @returns {Object} - Transition plan
 */
const generateTransitionPlan = (sourceCareer, targetCareer, userSkills) => {
  // Get required training
  const training = identifyRequiredTraining(sourceCareer, targetCareer, userSkills);
  
  // Find target career data
  const targetCareerData = allCareers.find(career => career.title === targetCareer);
  
  // Generate phases of transition
  const phases = [
    {
      name: 'Research & Preparation',
      duration: '1-2 months',
      activities: [
        'Research the target career in depth',
        'Connect with professionals in the field',
        'Identify specific skill gaps',
        'Create a learning plan'
      ]
    },
    {
      name: 'Skill Development',
      duration: '3-6 months',
      activities: [
        'Complete recommended courses and certifications',
        'Build projects to demonstrate new skills',
        'Join relevant communities and forums',
        'Attend industry events and webinars'
      ]
    },
    {
      name: 'Portfolio Building',
      duration: '2-3 months',
      activities: [
        'Create projects that showcase relevant skills',
        'Document your learning journey',
        'Develop a personal brand aligned with the new career',
        'Optimize your resume and LinkedIn profile'
      ]
    },
    {
      name: 'Transition Strategy',
      duration: '1-2 months',
      activities: [
        'Apply for entry-level or transitional roles',
        'Consider freelance or contract work to build experience',
        'Leverage existing network for opportunities',
        'Prepare for interviews in the new field'
      ]
    }
  ];
  
  return {
    sourceCareer,
    targetCareer,
    overview: `Transitioning from ${sourceCareer} to ${targetCareer} will leverage your existing skills while requiring development in new areas. This plan outlines a structured approach to make this transition successful.`,
    estimatedTimeframe: estimateTransitionTime(calculateTransferabilityScore(sourceCareer, targetCareer, userSkills), targetCareer),
    phases,
    recommendedTraining: training,
    potentialChallenges: [
      'Competing with specialists in the field',
      'Demonstrating relevant experience',
      'Potential initial salary adjustment',
      'Learning curve for new technical skills'
    ],
    successStrategies: [
      'Focus on transferable skills in your applications',
      'Build a strong portfolio of relevant projects',
      'Network with professionals in the target field',
      'Consider a stepping-stone role that bridges both careers'
    ]
  };
};

// ========== CONFIDENTIAL CAREER COACH (AI THERAPIST MODE) ==========

/**
 * Get AI-powered career therapy and guidance
 * @param {String} topic - The career concern or topic
 * @param {String} message - User's message or question
 * @param {Boolean} isPremium - Whether user has premium access
 * @returns {Object} - AI coach response
 */
export const getConfidentialCareerCoaching = (topic = '', message = '', isPremium = false) => {
  // Topics that the AI coach can address
  const supportedTopics = [
    'career confusion',
    'impostor syndrome',
    'peer pressure',
    'work-life balance',
    'career burnout',
    'job satisfaction',
    'workplace anxiety',
    'career transition fears',
    'professional identity',
    'workplace conflicts'
  ];
  
  // Determine the most relevant topic if not specified
  const detectedTopic = topic || detectTopic(message, supportedTopics);
  
  // Generate response based on topic and message
  const response = generateCoachingResponse(detectedTopic, message, isPremium);
  
  // For non-premium users, limit features
  if (!isPremium) {
    return {
      topic: detectedTopic,
      response: response.mainResponse,
      isAnonymous: true,
      premiumUnlock: 'Unlock full AI career coaching with premium'
    };
  }
  
  // Premium features
  return {
    topic: detectedTopic,
    response: response.mainResponse,
    followUpQuestions: response.followUpQuestions,
    resources: response.resources,
    exercises: response.exercises,
    isAnonymous: true,
    sessionHistory: true,
    canScheduleFollowUp: true
  };
};

/**
 * Detect the most relevant topic from a message
 * @param {String} message - User's message
 * @param {Array} topics - Supported topics
 * @returns {String} - Detected topic
 */
const detectTopic = (message, topics) => {
  // In a real implementation, this would use NLP to analyze the message
  // For now, we'll use a simple keyword matching approach
  const messageLower = message.toLowerCase();
  
  for (const topic of topics) {
    if (messageLower.includes(topic)) {
      return topic;
    }
  }
  
  // Check for topic-specific keywords
  if (messageLower.includes('not good enough') || messageLower.includes('fake') || messageLower.includes('unqualified')) {
    return 'impostor syndrome';
  }
  
  if (messageLower.includes('confused') || messageLower.includes('unsure') || messageLower.includes('don\'t know what to do')) {
    return 'career confusion';
  }
  
  if (messageLower.includes('stress') || messageLower.includes('exhausted') || messageLower.includes('overwhelmed')) {
    return 'career burnout';
  }
  
  if (messageLower.includes('others think') || messageLower.includes('expected to') || messageLower.includes('should I')) {
    return 'peer pressure';
  }
  
  // Default to career confusion if no specific topic is detected
  return 'career confusion';
};

/**
 * Generate a coaching response based on topic and message
 * @param {String} topic - The career concern or topic
 * @param {String} message - User's message
 * @param {Boolean} isPremium - Whether user has premium access
 * @returns {Object} - Coaching response
 */
const generateCoachingResponse = (topic, message, isPremium) => {
  // Response templates by topic
  const responseTemplates = {
    'impostor syndrome': {
      mainResponse: "It's common to feel like you don't belong or aren't qualified enough, especially in competitive fields. Remember that most people experience impostor syndrome at some point. Your achievements are real, and you've earned your position through your skills and hard work. Try to focus on your growth journey rather than comparing yourself to others.",
      followUpQuestions: [
        "When do you most strongly feel these doubts about your abilities?",
        "What would you say to a friend who expressed these same feelings?",
        "Can you identify specific achievements that remind you of your capabilities?"
      ],
      resources: [
        { title: "The Secret Thoughts of Successful Women: Why Capable People Suffer from the Impostor Syndrome and How to Thrive in Spite of It", author: "Valerie Young" },
        { title: "Overcoming Impostor Syndrome", url: "https://www.mindtools.com/pages/article/overcoming-impostor-syndrome.htm" }
      ],
      exercises: [
        "Keep an 'achievement journal' to document your successes, no matter how small",
        "Practice accepting compliments without deflecting them",
        "Identify and challenge your negative self-talk patterns"
      ]
    },
    'career confusion': {
      mainResponse: "Feeling uncertain about your career path is perfectly normal and actually shows that you're thoughtfully considering your future. Instead of trying to find the 'perfect' career immediately, focus on identifying your core values, skills you enjoy using, and work environments where you thrive. Consider this a process of exploration rather than a single decision point.",
      followUpQuestions: [
        "What aspects of your previous work or studies have you found most energizing?",
        "If money and others' expectations weren't factors, what would you be drawn to do?",
        "What are your non-negotiables in a career (values, work style, impact)?"
      ],
      resources: [
        { title: "Designing Your Life", author: "Bill Burnett and Dave Evans" },
        { title: "What Color Is Your Parachute?", author: "Richard N. Bolles" }
      ],
      exercises: [
        "Create a 'career possibilities' mind map without judging any options",
        "Conduct 3-5 informational interviews with people in fields you're curious about",
        "Try the 'work journal' exercise: track when you feel engaged vs. drained"
      ]
    },
    'peer pressure': {
      mainResponse: "It can be challenging when you feel pressured to follow a certain career path based on others' expectations. Remember that your career is ultimately about your fulfillment and growth. While it's natural to consider others' input, the most sustainable career choices align with your own values and strengths.",
      followUpQuestions: [
        "Whose opinions are influencing you the most, and why do they matter to you?",
        "What would success look like if you defined it only for yourself?",
        "What fears come up when you think about disappointing others with your choices?"
      ],
      resources: [
        { title: "The Courage to Be Disliked", author: "Ichiro Kishimi and Fumitake Koga" },
        { title: "Setting Boundaries with Family About Your Career", url: "https://www.themuse.com/advice/how-to-deal-with-family-pressure-about-your-career" }
      ],
      exercises: [
        "Write a personal mission statement focused on your values",
        "Practice articulating your career choices confidently",
        "Identify whose opinions truly matter to you and why"
      ]
    },
    'career burnout': {
      mainResponse: "Burnout is a serious condition that goes beyond normal work stress. It's important to recognize that burnout often stems from systemic issues, not personal failure. Taking care of your wellbeing isn't selfish—it's necessary for sustainable performance. Consider what boundaries you might need to establish and what support systems you can activate.",
      followUpQuestions: [
        "What aspects of your work drain your energy the most?",
        "What would a healthier relationship with work look like for you?",
        "What small changes could you implement immediately to reduce stress?"
      ],
      resources: [
        { title: "Burnout: The Secret to Unlocking the Stress Cycle", author: "Emily and Amelia Nagoski" },
        { title: "HBR Guide to Beating Burnout", publisher: "Harvard Business Review" }
      ],
      exercises: [
        "Conduct an 'energy audit' of your weekly activities",
        "Establish clear work-life boundaries (e.g., no email after 7pm)",
        "Incorporate daily stress-reduction practices (even just 5 minutes)"
      ]
    }
  };
  
  // Get response for the specified topic or use a generic response
  const topicResponse = responseTemplates[topic] || {
    mainResponse: "Thank you for sharing your concerns. Career challenges can be complex and personal. I'd encourage you to reflect on what success means to you personally, separate from external expectations. Consider what energizes you and what environments allow you to thrive. Remember that career development is a journey, not a destination.",
    followUpQuestions: [
      "What aspects of your current situation are most challenging for you?",
      "What would an ideal outcome look like from your perspective?",
      "What strengths can you draw on to navigate this situation?"
    ],
    resources: [
      { title: "Designing Your Life", author: "Bill Burnett and Dave Evans" },
      { title: "Mindset: The New Psychology of Success", author: "Carol Dweck" }
    ],
    exercises: [
      "Reflect on your core values and how they align with your career",
      "Identify three small actions you could take this week",
      "Practice self-compassion when facing challenges"
    ]
  };
  
  // Personalize response if message contains specific content
  let personalizedResponse = topicResponse.mainResponse;
  
  if (message) {
    const messageLower = message.toLowerCase();
    
    // Add personalized elements based on message content
    if (messageLower.includes('thank')) {
      personalizedResponse = "You're welcome. " + personalizedResponse;
    }
    
    if (messageLower.includes('help')) {
      personalizedResponse += " I'm here to support you through this process whenever you need to talk."; 
    }
  }
  
  return {
    ...topicResponse,
    mainResponse: personalizedResponse
  };
};
 career in allCareers