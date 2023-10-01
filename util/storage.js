export default {
  get(TODOS_STORAGE_KEY) {
    return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || [];
  },
  set(TODOS_STORAGE_KEY, key) {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(key));
  },
};
