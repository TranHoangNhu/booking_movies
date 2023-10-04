export default {
  get(STORAGE_KEY) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },
  set(STORAGE_KEY, value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  },
  destroy(STORAGE_KEY) {
    localStorage.removeItem(STORAGE_KEY);
  },
};
