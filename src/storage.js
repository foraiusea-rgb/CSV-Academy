// Storage abstraction — uses localStorage for production deployments
// Compatible API with Claude's window.storage

const STORAGE_PREFIX = 'csv-academy::';

export const storage = {
  async get(key) {
    try {
      const val = localStorage.getItem(STORAGE_PREFIX + key);
      if (val === null) return null;
      return { key, value: val };
    } catch (e) {
      console.warn('Storage get error:', e);
      return null;
    }
  },

  async set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, value);
      return { key, value };
    } catch (e) {
      console.warn('Storage set error:', e);
      return null;
    }
  },

  async delete(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return { key, deleted: true };
    } catch (e) {
      console.warn('Storage delete error:', e);
      return null;
    }
  }
};
