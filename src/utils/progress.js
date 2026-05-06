const KEY = 'session_history';

export function logSession({ name, duration, focusAreas, partial = false }) {
  try {
    const history = JSON.parse(localStorage.getItem(KEY) || '[]');
    history.unshift({
      name,
      duration,
      focusAreas,
      partial,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(KEY, JSON.stringify(history.slice(0, 100)));
  } catch (_) {}
}

export function getSessionHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch (_) {
    return [];
  }
}
