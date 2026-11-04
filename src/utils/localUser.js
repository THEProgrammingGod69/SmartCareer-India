import { useMemo } from 'react';

// SmartCareer India runs without accounts: every visitor uses the app as a
// local guest and their data (profile, quiz results, challenge progress)
// stays in this browser's localStorage.

export const GUEST_ID = 'guest';
const PROFILE_KEY = 'smartcareer_profile';

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode etc.) - ignore, app still works.
  }
};

export const loadLocal = readJSON;
export const saveLocal = writeJSON;

export const getLocalProfile = () => readJSON(PROFILE_KEY, null);
export const saveLocalProfile = (profile) => writeJSON(PROFILE_KEY, profile);

// Drop-in replacement for the old auth hook: a stable guest "user" with all
// features unlocked. Memoised so it is safe to use in effect dependencies.
export const useLocalUser = () =>
  useMemo(() => {
    const profile = getLocalProfile() || {};
    return {
      currentUser: {
        uid: GUEST_ID,
        displayName: profile.displayName || '',
        email: profile.email || '',
        photoURL: profile.photoURL || null,
      },
      userRoles: { isPremium: true, isAdmin: false },
    };
  }, []);
