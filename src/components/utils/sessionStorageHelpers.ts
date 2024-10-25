export const isSessionStorageAvailable = () => {
  try {
    const testKey = '__some_random_key__';
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const getSessionStorageValue = <T>(key: string, initialValue: T) => {
  if (isSessionStorageAvailable()) {
    const storedValue = sessionStorage.getItem(key);
    return storedValue && storedValue !== 'undefined' ? JSON.parse(storedValue) : initialValue;
  }
  return initialValue;
};

export const setSessionStorageValue = <T>(key: string, value: T) => {
  if (isSessionStorageAvailable()) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeSessionStorageValue = (key: string) => {
  if (isSessionStorageAvailable()) {
    sessionStorage.removeItem(key);
  }
};
