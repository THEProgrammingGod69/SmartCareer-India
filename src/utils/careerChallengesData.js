// Career Challenges Data and Utility Functions
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, arrayUnion, increment, serverTimestamp } from 'firebase/firestore';

// Career paths for categorizing challenges
export const careerPaths = [
  'Software Development',
  'Data Science',
  'UX/UI Design',
  'Product Management',
  'Cybersecurity',
  'Digital Marketing',
  'Business Analysis',
  'General'
];

// Sample challenges data - now organized by career paths
export const careerChallenges = [
  // Software Development Challenges
  {
    id: 1,
    title: 'Build a Portfolio Website',
    description: 'Create a responsive portfolio website showcasing your projects and skills using HTML, CSS, and JavaScript.',
    points: 80,
    badge: 'Web Developer',
    difficulty: 'Medium',
    estimatedTime: '5-6 hours',
    category: 'Technical Skills',
    isPremium: false,
    careerPath: 'Software Development',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    submissionType: 'link',
    resources: [
      { title: 'HTML/CSS Tutorial', url: 'https://www.w3schools.com/html/' },
      { title: 'Portfolio Examples', url: 'https://www.freecodecamp.org/news/15-web-developer-portfolios-to-inspire-you-137fb1743cae/' }
    ]
  },
  {
    id: 2,
    title: 'Create a RESTful API',
    description: 'Build a simple RESTful API with CRUD operations using Node.js and Express.',
    points: 100,
    badge: 'Backend Developer',
    difficulty: 'Hard',
    estimatedTime: '6-8 hours',
    category: 'Technical Skills',
    isPremium: false,
    careerPath: 'Software Development',
    skills: ['Node.js', 'Express', 'REST API', 'Database'],
    submissionType: 'github',
    resources: [
      { title: 'RESTful API Tutorial', url: 'https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm' },
      { title: 'Express Documentation', url: 'https://expressjs.com/' }
    ]
  },
  
  // Data Science Challenges
  {
    id: 3,
    title: 'Exploratory Data Analysis Project',
    description: 'Perform exploratory data analysis on a dataset of your choice and create visualizations to communicate insights.',
    points: 90,
    badge: 'Data Explorer',
    difficulty: 'Medium',
    estimatedTime: '5-7 hours',
    category: 'Technical Skills',
    isPremium: false,
    careerPath: 'Data Science',
    skills: ['Python', 'Pandas', 'Data Visualization', 'Statistics'],
    submissionType: 'notebook',
    resources: [
      { title: 'Pandas Tutorial', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
      { title: 'Public Datasets', url: 'https://www.kaggle.com/datasets' }
    ]
  },
  {
    id: 4,
    title: 'Machine Learning Model Development',
    description: 'Build and evaluate a machine learning model to solve a classification or regression problem.',
    points: 120,
    badge: 'ML Engineer',
    difficulty: 'Hard',
    estimatedTime: '8-10 hours',
    category: 'Technical Skills',
    isPremium: true,
    careerPath: 'Data Science',
    skills: ['Python', 'Scikit-learn', 'Machine Learning', 'Model Evaluation'],
    submissionType: 'notebook',
    resources: [
      { title: 'Scikit-learn Tutorial', url: 'https://scikit-learn.org/stable/tutorial/index.html' },
      { title: 'ML Best Practices', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' }
    ]
  },
  
  // UX/UI Design Challenges
  {
    id: 5,
    title: 'Mobile App Redesign',
    description: 'Redesign the user interface of an existing mobile app to improve usability and visual appeal.',
    points: 85,
    badge: 'UI Designer',
    difficulty: 'Medium',
    estimatedTime: '6-8 hours',
    category: 'Design Skills',
    isPremium: false,
    careerPath: 'UX/UI Design',
    skills: ['UI Design', 'Mobile Design', 'Figma/Sketch', 'Visual Design'],
    submissionType: 'design',
    resources: [
      { title: 'Mobile UI Design Principles', url: 'https://www.nngroup.com/articles/mobile-ux-patterns/' },
      { title: 'Figma Tutorial', url: 'https://www.figma.com/resources/learn-design/' }
    ]
  },
  {
    id: 6,
    title: 'Industry Challenge: UX Research',
    description: 'Conduct a UX research study for a real product and provide actionable insights.',
    points: 120,
    badge: 'UX Researcher',
    difficulty: 'Hard',
    estimatedTime: '10-12 hours',
    category: 'Design Skills',
    isPremium: true,
    careerPath: 'UX/UI Design',
    partner: 'DesignHub',
    skills: ['User Research', 'Usability Testing', 'Data Analysis', 'Presentation'],
    submissionType: 'document',
    resources: [
      { title: 'UX Research Methods', url: 'https://www.nngroup.com/articles/which-ux-research-methods/' },
      { title: 'Usability Testing Guide', url: 'https://www.usability.gov/how-to-and-tools/methods/usability-testing.html' }
    ]
  },
  
  // Product Management Challenges
  {
    id: 7,
    title: 'Create a Product Roadmap',
    description: 'Develop a comprehensive product roadmap for a new feature or product idea.',
    points: 75,
    badge: 'Product Strategist',
    difficulty: 'Medium',
    estimatedTime: '4-6 hours',
    category: 'Business Skills',
    isPremium: false,
    careerPath: 'Product Management',
    skills: ['Product Strategy', 'Prioritization', 'Roadmapping', 'Stakeholder Management'],
    submissionType: 'document',
    resources: [
      { title: 'Product Roadmap Guide', url: 'https://www.productplan.com/learn/product-roadmap/' },
      { title: 'Prioritization Frameworks', url: 'https://www.productplan.com/learn/product-prioritization-frameworks/' }
    ]
  },
  {
    id: 8,
    title: 'Competitive Analysis',
    description: 'Conduct a thorough competitive analysis for a product in a specific market segment.',
    points: 90,
    badge: 'Market Analyst',
    difficulty: 'Medium',
    estimatedTime: '6-8 hours',
    category: 'Business Skills',
    isPremium: false,
    careerPath: 'Product Management',
    skills: ['Market Research', 'Competitive Analysis', 'SWOT Analysis', 'Strategic Thinking'],
    submissionType: 'document',
    resources: [
      { title: 'Competitive Analysis Framework', url: 'https://www.productplan.com/glossary/competitive-analysis/' },
      { title: 'SWOT Analysis Guide', url: 'https://www.mindtools.com/pages/article/newTMC_05.htm' }
    ]
  },
  
  // Cybersecurity Challenges
  {
    id: 9,
    title: 'Security Vulnerability Assessment',
    description: 'Perform a security assessment of a web application and identify potential vulnerabilities.',
    points: 110,
    badge: 'Security Analyst',
    difficulty: 'Hard',
    estimatedTime: '7-9 hours',
    category: 'Technical Skills',
    isPremium: true,
    careerPath: 'Cybersecurity',
    skills: ['Vulnerability Assessment', 'Web Security', 'OWASP', 'Security Tools'],
    submissionType: 'document',
    resources: [
      { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      { title: 'Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' }
    ]
  },
  
  // Digital Marketing Challenges
  {
    id: 10,
    title: 'Social Media Campaign Strategy',
    description: 'Develop a comprehensive social media campaign strategy for a product launch.',
    points: 70,
    badge: 'Social Media Strategist',
    difficulty: 'Medium',
    estimatedTime: '4-6 hours',
    category: 'Marketing Skills',
    isPremium: false,
    careerPath: 'Digital Marketing',
    skills: ['Social Media Marketing', 'Content Strategy', 'Campaign Planning', 'Analytics'],
    submissionType: 'document',
    resources: [
      { title: 'Social Media Strategy Guide', url: 'https://buffer.com/library/social-media-marketing-strategy/' },
      { title: 'Campaign Metrics', url: 'https://sproutsocial.com/insights/social-media-metrics/' }
    ]
  },
  
  // Business Analysis Challenges
  {
    id: 11,
    title: 'Business Requirements Document',
    description: 'Create a detailed business requirements document for a new system or feature.',
    points: 80,
    badge: 'Requirements Specialist',
    difficulty: 'Medium',
    estimatedTime: '5-7 hours',
    category: 'Business Skills',
    isPremium: false,
    careerPath: 'Business Analysis',
    skills: ['Requirements Gathering', 'Documentation', 'Stakeholder Management', 'Process Modeling'],
    submissionType: 'document',
    resources: [
      { title: 'BRD Template', url: 'https://www.projectmanager.com/blog/business-requirements-document-brd' },
      { title: 'Requirements Gathering Techniques', url: 'https://www.modernanalyst.com/Resources/Articles/tabid/115/ID/1427/5-Steps-to-Better-Requirements-Gathering.aspx' }
    ]
  },
  
  // General Career Challenges
  {
    id: 12,
    title: 'Write a Tech Blog',
    description: 'Write a 500-word blog post about a recent technology trend in your field of interest.',
    points: 50,
    badge: 'Rising Blogger',
    difficulty: 'Easy',
    estimatedTime: '2-3 hours',
    category: 'Content Creation',
    isPremium: false,
    careerPath: 'General',
    skills: ['Writing', 'Research', 'Communication', 'Industry Knowledge'],
    submissionType: 'text',
    resources: [
      { title: 'Technical Writing Guide', url: 'https://developers.google.com/tech-writing' },
      { title: 'Blog Post Structure', url: 'https://buffer.com/library/the-ideal-length-of-everything-online-according-to-science/' }
    ]
  },
  {
    id: 13,
    title: 'Create a Business Pitch',
    description: 'Develop a 5-minute pitch for a product or service that solves a real-world problem.',
    points: 70,
    badge: 'Pitch Master',
    difficulty: 'Medium',
    estimatedTime: '4-5 hours',
    category: 'Business Skills',
    isPremium: false,
    careerPath: 'General',
    skills: ['Presentation', 'Business Strategy', 'Communication', 'Problem Solving'],
    submissionType: 'video',
    resources: [
      { title: 'Pitch Deck Template', url: 'https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck' },
      { title: 'Presentation Tips', url: 'https://hbr.org/2013/06/how-to-give-a-killer-presentation' }
    ]
  },
  {
    id: 14,
    title: 'Industry Challenge: API Integration',
    description: 'Complete a real-world API integration challenge provided by our industry partners.',
    points: 100,
    badge: 'API Specialist',
    difficulty: 'Hard',
    estimatedTime: '8-10 hours',
    category: 'Technical Skills',
    isPremium: true,
    careerPath: 'Software Development',
    partner: 'TechCorp India',
    skills: ['API Integration', 'Backend Development', 'Authentication', 'Testing'],
    submissionType: 'github',
    resources: [
      { title: 'API Integration Best Practices', url: 'https://swagger.io/resources/articles/best-practices-in-api-design/' },
      { title: 'Authentication Methods', url: 'https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth' }
    ]
  },
  {
    id: 15,
    title: 'Design a Product Manager Resume',
    description: 'Create a tailored resume for a product manager role in a tech company.',
    points: 60,
    badge: 'Resume Expert',
    difficulty: 'Medium',
    estimatedTime: '3-4 hours',
    category: 'Career Development',
    isPremium: false,
    careerPath: 'Product Management',
    skills: ['Resume Writing', 'Personal Branding', 'Job Search', 'Career Planning'],
    submissionType: 'document',
    resources: [
      { title: 'Product Manager Resume Guide', url: 'https://www.productschool.com/blog/product-management-2/resume-tips-product-managers/' },
      { title: 'Resume Templates', url: 'https://www.resumegenius.com/resume-templates' }
    ]
  }
];

// Challenge collection reference
const challengesCollectionRef = collection(db, 'challenges');

// Initialize challenges in Firestore (should be called once during app setup)
export const initializeChallengesInFirestore = async () => {
  try {
    // Check if challenges already exist
    const q = query(challengesCollectionRef, where('id', '==', 1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Challenges don't exist, add them
      for (const challenge of careerChallenges) {
        await setDoc(doc(challengesCollectionRef, challenge.id.toString()), {
          ...challenge,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      console.log('Challenges initialized in Firestore');
      return true;
    } else {
      console.log('Challenges already exist in Firestore');
      return false;
    }
  } catch (error) {
    console.error('Error initializing challenges:', error);
    return false;
  }
};

// Get challenges for a specific career interest
export const getChallengesByCareerInterest = async (careerInterest) => {
  try {
    if (!careerInterest) {
      // If no career interest specified, return all challenges
      const querySnapshot = await getDocs(challengesCollectionRef);
      return querySnapshot.docs.map(doc => doc.data());
    }
    
    // Query challenges by career path
    const q = query(challengesCollectionRef, where('careerPath', '==', careerInterest));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // If no challenges found for this career path, return general challenges
      const generalQ = query(challengesCollectionRef, where('careerPath', '==', 'General'));
      const generalSnapshot = await getDocs(generalQ);
      return generalSnapshot.docs.map(doc => doc.data());
    }
    
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting challenges by career interest:', error);
    // Fallback to local data if Firebase query fails
    return careerInterest 
      ? careerChallenges.filter(challenge => challenge.careerPath === careerInterest || challenge.careerPath === 'General')
      : careerChallenges;
  }
};

// Get recommended challenges for a user
export const getRecommendedChallenges = async (userId, userPreferences) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // Get user's completed challenges
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // If user document doesn't exist, return general challenges
      const generalQ = query(challengesCollectionRef, where('careerPath', '==', 'General'), where('isPremium', '==', false));
      const generalSnapshot = await getDocs(generalQ);
      return generalSnapshot.docs.map(doc => doc.data());
    }
    
    const userData = userDoc.data();
    const completedChallengeIds = userData.completedChallenges || [];
    const careerInterests = userPreferences?.careerInterests || userData.careerInterests || ['General'];
    
    // Query challenges based on career interests and not completed yet
    let recommendedChallenges = [];
    
    // First, try to get challenges matching user's career interests
    for (const interest of careerInterests) {
      const q = query(
        challengesCollectionRef, 
        where('careerPath', '==', interest),
        where('isPremium', '==', userData.isPremium || false) // Only show premium challenges if user has premium access
      );
      const querySnapshot = await getDocs(q);
      const challenges = querySnapshot.docs
        .map(doc => doc.data())
        .filter(challenge => !completedChallengeIds.includes(challenge.id.toString()));
      
      recommendedChallenges = [...recommendedChallenges, ...challenges];
      
      // If we have enough recommendations, stop querying
      if (recommendedChallenges.length >= 5) break;
    }
    
    // If we don't have enough recommendations, add some general challenges
    if (recommendedChallenges.length < 3) {
      const generalQ = query(
        challengesCollectionRef, 
        where('careerPath', '==', 'General'),
        where('isPremium', '==', userData.isPremium || false)
      );
      const generalSnapshot = await getDocs(generalQ);
      const generalChallenges = generalSnapshot.docs
        .map(doc => doc.data())
        .filter(challenge => !completedChallengeIds.includes(challenge.id.toString()));
      
      recommendedChallenges = [...recommendedChallenges, ...generalChallenges];
    }
    
    // Sort by difficulty (easy first)
    recommendedChallenges.sort((a, b) => {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
    
    return recommendedChallenges.slice(0, 5); // Return top 5 recommendations
  } catch (error) {
    console.error('Error getting recommended challenges:', error);
    // Fallback to local data if Firebase query fails
    return careerChallenges.slice(0, 5);
  }
};

// Get user progress
export const getUserProgress = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // Get user document from Firestore
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // If user document doesn't exist, create it with initial progress
      const initialProgress = {
        completedChallenges: [],
        totalPoints: 0,
        badges: [],
        level: 1,
        challengeHistory: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(userDocRef, {
        ...initialProgress,
        id: userId
      });
      
      return initialProgress;
    }
    
    // User document exists, get progress data
    const userData = userDoc.data();
    
    // Calculate level based on points
    const level = calculateLevel(userData.totalPoints || 0);
    
    return {
      completedChallenges: userData.completedChallenges?.length || 0,
      totalPoints: userData.totalPoints || 0,
      badges: userData.badges || [],
      level: level,
      recentActivity: userData.challengeHistory?.slice(0, 5) || []
    };
  } catch (error) {
    console.error('Error getting user progress:', error);
    // Return default progress if there's an error
    return {
      completedChallenges: 0,
      totalPoints: 0,
      badges: [],
      level: 1,
      recentActivity: []
    };
  }
};

// Calculate user level based on points
const calculateLevel = (points) => {
  if (points < 100) return 1;
  if (points < 250) return 2;
  if (points < 500) return 3;
  if (points < 1000) return 4;
  if (points < 2000) return 5;
  return Math.floor(points / 500) + 1; // Higher levels
};

// Submit a challenge
export const submitChallenge = async (userId, challengeId, submission) => {
  try {
    if (!userId || !challengeId) {
      throw new Error('User ID and Challenge ID are required');
    }
    
    // Get challenge details
    const challengeDocRef = doc(db, 'challenges', challengeId.toString());
    const challengeDoc = await getDoc(challengeDocRef);
    
    if (!challengeDoc.exists()) {
      throw new Error('Challenge not found');
    }
    
    const challengeData = challengeDoc.data();
    
    // Get user document
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    // Create user document if it doesn't exist
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        id: userId,
        completedChallenges: [],
        totalPoints: 0,
        badges: [],
        challengeHistory: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    // Create submission document
    const submissionData = {
      userId,
      challengeId: challengeId.toString(),
      challengeTitle: challengeData.title,
      submissionContent: submission,
      submissionType: challengeData.submissionType,
      points: challengeData.points,
      badge: challengeData.badge,
      status: 'pending', // pending, approved, rejected
      feedback: '',
      submittedAt: serverTimestamp()
    };
    
    // Add submission to submissions collection
    const submissionRef = doc(collection(db, 'submissions'));
    await setDoc(submissionRef, submissionData);
    
    // Update user document with submission
    await updateDoc(userDocRef, {
      completedChallenges: arrayUnion(challengeId.toString()),
      totalPoints: increment(challengeData.points),
      badges: arrayUnion(challengeData.badge),
      challengeHistory: arrayUnion({
        challengeId: challengeId.toString(),
        challengeTitle: challengeData.title,
        points: challengeData.points,
        badge: challengeData.badge,
        submittedAt: new Date().toISOString()
      }),
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Challenge submitted successfully!',
      points: challengeData.points,
      badge: challengeData.badge,
      submissionId: submissionRef.id
    };
  } catch (error) {
    console.error('Error submitting challenge:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit challenge. Please try again.'
    };
  }
};

// Get a motivational message
export const getMotivationalMessage = () => {
  const messages = [
    'Keep pushing your boundaries!',
    'Every challenge completed is a step toward your dream career!',
    'Growth happens outside your comfort zone!',
    'You\'re making great progress on your career journey!',
    'Consistency is the key to mastery!',
    'Small steps every day lead to big career wins!',
    'Challenge yourself today to build your tomorrow!',
    'Your career path is unique - embrace the journey!',
    'Skills are built through consistent practice and challenges!',
    'Today\'s challenge is tomorrow\'s career advantage!'
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Get challenges by skill
export const getChallengesBySkill = async (skill) => {
  try {
    // This is a more complex query that would ideally use a custom index
    // For now, we'll get all challenges and filter in memory
    const querySnapshot = await getDocs(challengesCollectionRef);
    const challenges = querySnapshot.docs.map(doc => doc.data());
    
    // Filter challenges that include the specified skill
    return challenges.filter(challenge => 
      challenge.skills && challenge.skills.includes(skill)
    );
  } catch (error) {
    console.error('Error getting challenges by skill:', error);
    // Fallback to local data
    return careerChallenges.filter(challenge => 
      challenge.skills && challenge.skills.includes(skill)
    );
  }
};

// Get user's completed challenges
export const getUserCompletedChallenges = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // Get user document
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return [];
    }
    
    const userData = userDoc.data();
    const completedChallengeIds = userData.completedChallenges || [];
    
    if (completedChallengeIds.length === 0) {
      return [];
    }
    
    // Get details of completed challenges
    const completedChallenges = [];
    
    for (const challengeId of completedChallengeIds) {
      const challengeDocRef = doc(db, 'challenges', challengeId);
      const challengeDoc = await getDoc(challengeDocRef);
      
      if (challengeDoc.exists()) {
        completedChallenges.push(challengeDoc.data());
      }
    }
    
    return completedChallenges;
  } catch (error) {
    console.error('Error getting completed challenges:', error);
    return [];
  }
};

// Get leaderboard
export const getLeaderboard = async (limit = 10) => {
  try {
    // Get top users by points
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('totalPoints', '>', 0));
    const querySnapshot = await getDocs(q);
    
    const leaderboardData = querySnapshot.docs
      .map(doc => ({
        userId: doc.id,
        displayName: doc.data().displayName || 'Anonymous User',
        totalPoints: doc.data().totalPoints || 0,
        completedChallenges: doc.data().completedChallenges?.length || 0,
        level: calculateLevel(doc.data().totalPoints || 0)
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit);
    
    return leaderboardData;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};