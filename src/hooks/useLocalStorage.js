import { useState, useEffect } from 'react';

/**
 * useLocalStorage — syncs React state with localStorage.
 *
 * Why? useState resets on page refresh. localStorage persists.
 * This hook combines both: you get React's reactivity + browser persistence.
 *
 * Usage:
 *   const [user, setUser] = useLocalStorage('user', null);
 *   const [theme, setTheme] = useLocalStorage('theme', 'dark');
 *
 * @param {string} key — localStorage key name
 * @param {*} initialValue — default value if nothing is in localStorage yet
 */
function useLocalStorage(key, initialValue) {
  // On first render, read from localStorage.
  // If the key doesn't exist yet, use initialValue instead.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // JSON.parse handles objects, arrays, booleans, null, etc.
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If JSON.parse fails (e.g. corrupted data), fall back to initialValue
      console.warn(`useLocalStorage: error reading key "${key}"`, error);
      return initialValue;
    }
  });

  // Whenever storedValue changes, write the new value to localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: error writing key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
