export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const isMatch = (value1: string, value2: string): boolean => {
  return value1 === value2;
};