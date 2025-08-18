'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ErrorButton() {
  const i = useTranslations('Error');
  const [hasError, setHasError] = useState(false);

  function handleClick() {
    return setHasError(true);
  }

  if (hasError) {
    throw new Error(i('errorMessage'));
  }
  return <button onClick={handleClick}>{i('errorButtonText')}</button>;
}
