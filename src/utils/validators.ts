// src/utils/validators.ts

/**
 * Check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

/**
 * Check if a string is not empty or just whitespace
 */
export function isNonEmptyString(str: string): boolean {
  return typeof str === "string" && str.trim().length > 0;
}

/**
 * Validate password strength
 * Requirements: 8+ chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
 */
export function isValidPassword(password: string): boolean {
  if (!password) return false;
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;
  return re.test(password);
}

/**
 * Check if a string is a valid date in YYYY-MM-DD format
 */
export function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const timestamp = Date.parse(dateStr);
  return !isNaN(timestamp);
}

/**
 * Optional: Validate that date is in the past
 */
export function isPastDate(dateStr: string): boolean {
  const timestamp = Date.parse(dateStr);
  return !isNaN(timestamp) && timestamp < Date.now();
}

/**
 * Validate that two strings match (useful for password confirmation)
 */
export function doStringsMatch(str1: string, str2: string): boolean {
  return str1 === str2;
}
