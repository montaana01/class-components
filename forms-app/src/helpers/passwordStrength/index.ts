export function passwordStrengthScore(password: string) {
  let score = 0;
  if (/\d/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[^\dA-Za-z]/.test(password)) score++;
  return score;
}

export function passwordStrengthLabel(score: number) {
  if (score <= 1) return 'Bad password';
  if (score === 2) return 'Good password';
  if (score === 3) return 'Great password';
  return 'Strong password';
}
