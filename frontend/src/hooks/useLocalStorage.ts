import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // Ignore write errors
    }
  };

  return [storedValue, setValue] as const;
} 