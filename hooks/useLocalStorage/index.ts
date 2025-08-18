import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      setValue(stored);
    }
  }, [key]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(key, value);
    }
  }, [key, value, isMounted]);

  return [value, setValue];
}
