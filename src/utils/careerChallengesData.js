// Career Challenges Data and Utility Functions
import { loadLocal, saveLocal, getLocalProfile } from './localUser';

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

// ---------------------------------------------------------------------------
// Progress is stored locally in the browser (no accounts / no backend).
// ---------------------------------------------------------------------------
const PROGRESS_KEY = 'smartcareer_challenge_progress';
const SUBMISSIONS_KEY = 'smartcareer_challenge_submissions';

const emptyProgress = () => ({
  completedChallenges: [],
  totalPoints: 0,
  badges: [],
  challengeHistory: [],
});

const readProgress = () => ({ ...emptyProgress(), ...loadLocal(PROGRESS_KEY, {}) });

const findChallenge = (challengeId) =>
  careerChallenges.find((c) => c.id.toString() === challengeId.toString());

// Get challenges for a specific career interest
export const getChallengesByCareerInterest = async (careerInterest) => {
  if (!careerInterest) return careerChallenges;
  const matches = careerChallenges.filter((c) => c.careerPath === careerInterest);
  return matches.length > 0
    ? matches
    : careerChallenges.filter((c) => c.careerPath === 'General');
};

// Get recommended challenges (not yet completed, matching interests, easy first)
export const getRecommendedChallenges = async (_userId, userPreferences) => {
  const { completedChallenges } = readProgress();
  const interests = userPreferences?.careerInterests || ['General'];
  const notDone = (c) => !completedChallenges.includes(c.id.toString());

  let recommended = careerChallenges.filter((c) => interests.includes(c.careerPath) && notDone(c));
  if (recommended.length < 3) {
    recommended = [
      ...recommended,
      ...careerChallenges.filter((c) => c.careerPath === 'General' && notDone(c) && !recommended.includes(c)),
    ];
  }
  if (recommended.length < 3) {
    recommended = [...recommended, ...careerChallenges.filter((c) => notDone(c) && !recommended.includes(c))];
  }

  const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
  recommended.sort((a, b) => (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2));
  return recommended.slice(0, 5);
};

// Calculate level based on points
const calculateLevel = (points) => {
  if (points < 100) return 1;
  if (points < 250) return 2;
  if (points < 500) return 3;
  if (points < 1000) return 4;
  if (points < 2000) return 5;
  return Math.floor(points / 500) + 1;
};

// Get the visitor's progress
export const getUserProgress = async () => {
  const progress = readProgress();
  return {
    completedChallenges: progress.completedChallenges.length,
    totalPoints: progress.totalPoints,
    badges: progress.badges,
    level: calculateLevel(progress.totalPoints),
    recentActivity: progress.challengeHistory.slice(-5).reverse(),
  };
};

// Submit a challenge
export const submitChallenge = async (_userId, challengeId, submission) => {
  const challenge = challengeId != null ? findChallenge(challengeId) : null;
  if (!challenge) {
    return { success: false, message: 'Challenge not found' };
  }

  const progress = readProgress();
  const id = challenge.id.toString();
  if (progress.completedChallenges.includes(id)) {
    return { success: false, message: 'You have already completed this challenge.' };
  }

  const submittedAt = new Date().toISOString();
  saveLocal(PROGRESS_KEY, {
    completedChallenges: [...progress.completedChallenges, id],
    totalPoints: progress.totalPoints + challenge.points,
    badges: progress.badges.includes(challenge.badge) ? progress.badges : [...progress.badges, challenge.badge],
    challengeHistory: [
      ...progress.challengeHistory,
      { challengeId: id, challengeTitle: challenge.title, points: challenge.points, badge: challenge.badge, submittedAt },
    ],
  });

  const submissions = loadLocal(SUBMISSIONS_KEY, []);
  const submissionId = `${id}-${Date.now()}`;
  saveLocal(SUBMISSIONS_KEY, [
    ...submissions,
    { submissionId, challengeId: id, challengeTitle: challenge.title, submissionContent: submission, submittedAt },
  ]);

  return {
    success: true,
    message: 'Challenge submitted successfully!',
    points: challenge.points,
    badge: challenge.badge,
    submissionId,
  };
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
export const getChallengesBySkill = async (skill) =>
  careerChallenges.filter((c) => c.skills && c.skills.includes(skill));

// Get the visitor's completed challenges
export const getUserCompletedChallenges = async () => {
  const { completedChallenges } = readProgress();
  return completedChallenges.map(findChallenge).filter(Boolean);
};

// Leaderboard: without accounts there is only this browser's visitor
export const getLeaderboard = async () => {
  const progress = readProgress();
  if (progress.totalPoints <= 0) return [];
  return [{
    userId: 'guest',
    displayName: getLocalProfile()?.displayName || 'You',
    totalPoints: progress.totalPoints,
    completedChallenges: progress.completedChallenges.length,
    level: calculateLevel(progress.totalPoints),
  }];
};
