type StorageKey = 'timerSeconds' | 'timerPlaying';

export const storage = {
  get: <T>(key: StorageKey): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  },

  set: <T>(key: StorageKey, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} to localStorage`, error);
    }
  },

  remove: (key: StorageKey): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  },

  clearTimer: (): void => {
    try {
      localStorage.removeItem('timerSeconds');
      localStorage.removeItem('timerPlaying');
    } catch (error) {
      console.error('Error clearing timer storage', error);
    }
  }
};