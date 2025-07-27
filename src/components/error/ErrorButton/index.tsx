import { useState } from 'react';

const constants = {
  errorButtonText: 'Set Error',
  errorMessage: 'Test error from ErrorButton',
};

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  function handleClick() {
    return setHasError(true);
  }

  if (hasError) {
    throw new Error(constants.errorMessage);
  }
  return <button onClick={handleClick}>{constants.errorButtonText}</button>;
}
