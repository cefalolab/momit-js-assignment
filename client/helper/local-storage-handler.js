export const setLocalItem = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalItem = name => {
  return JSON.parse(localStorage.getItem(name));
};
