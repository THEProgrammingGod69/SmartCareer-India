// Challenge progress for the Career Challenges page, stored in this browser.
import { careerChallenges } from '../utils/careerChallengesData';
import { loadLocal, saveLocal } from '../utils/localUser';

const STORAGE_KEY = 'smartcareer_premium_challenges';

const emptyData = () => ({ points: 0, badges: [], completedChallenges: [], submissions: [] });

// Get the visitor's challenge data
export const getUserChallengesData = async () => ({ ...emptyData(), ...loadLocal(STORAGE_KEY, {}) });

// Submit a challenge. `challengeDetails` lets a page pass the challenge it is
// showing; otherwise the shared challenge list is used.
export const submitChallenge = async (_userId, challengeId, submission, challengeDetails) => {
  const challenge = challengeDetails || careerChallenges.find((c) => c.id === challengeId);
  if (!challenge) {
    throw new Error('Challenge not found');
  }

  const userData = await getUserChallengesData();
  if (userData.completedChallenges.includes(challengeId)) {
    return { success: false, message: 'You have already completed this challenge.' };
  }

  const isNewBadge = !userData.badges.includes(challenge.badge);
  const totalPoints = userData.points + challenge.points;
  saveLocal(STORAGE_KEY, {
    points: totalPoints,
    completedChallenges: [...userData.completedChallenges, challengeId],
    badges: isNewBadge ? [...userData.badges, challenge.badge] : userData.badges,
    submissions: [
      ...userData.submissions,
      { challengeId, submission, submittedAt: new Date().toISOString(), points: challenge.points, badge: challenge.badge },
    ],
  });

  return {
    success: true,
    points: challenge.points,
    totalPoints,
    badge: isNewBadge ? challenge.badge : null,
    message: `Great job! You've earned ${challenge.points} points for completing this challenge!`,
  };
};

// Get a "what next" message
export const getNextChallengeMessage = async (_userId, userName, careerInterest) => {
  const { completedChallenges } = await getUserChallengesData();
  const next = careerChallenges.find(
    (c) => !completedChallenges.includes(c.id) && (!careerInterest || c.careerPath === careerInterest)
  ) || careerChallenges.find((c) => !completedChallenges.includes(c.id));

  const name = userName && userName !== 'User' ? `, ${userName}` : '';
  return next
    ? `You're doing great${name}! Let's now tackle the '${next.title}' challenge!`
    : `Great work${name}! You've completed all available challenges.`;
};
