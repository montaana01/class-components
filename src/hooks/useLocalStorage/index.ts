import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    const stored = window.localStorage.getItem(key);
    return stored !== null ? stored : initialValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
