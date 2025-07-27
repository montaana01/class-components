import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storage = window.localStorage.getItem(key);
      return storage ? JSON.parse(storage) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Cannot set localStorage key "${key}":`, e);
    }
  }, [key, value]);

  return [value, setValue];
}
