const FILTERS_KEY = 'internhub_filters';
const FAVORITES_KEY = 'internhub_favorites';
const SKILLS_KEY = 'internhub_user_skills';
const APPLICATIONS_KEY = 'internhub_applications';

function safeGet(key) {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

export function saveFilters(filters) {
  safeSet(FILTERS_KEY, filters);
}

export function loadFilters() {
  return safeGet(FILTERS_KEY);
}

export function saveFavorites(ids) {
  safeSet(FAVORITES_KEY, ids);
}

export function loadFavorites() {
  return safeGet(FAVORITES_KEY) || [];
}

export function saveUserSkills(skills) {
  safeSet(SKILLS_KEY, skills);
}

export function loadUserSkills() {
  return safeGet(SKILLS_KEY) || ['React', 'JavaScript', 'HTML', 'CSS']; // Decent default skills
}

export function saveApplications(applications) {
  safeSet(APPLICATIONS_KEY, applications);
}

export function loadApplications() {
  return safeGet(APPLICATIONS_KEY) || [];
}

