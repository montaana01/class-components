import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) {
      setValue(stored);
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
