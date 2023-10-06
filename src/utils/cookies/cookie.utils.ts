// Path: src/utils/cookie.utils.ts
// DESC: Cookie utility functions
'use strict';

export function setCookieValue(
  name: string,
  value: string,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
) {
  const date = new Date();
  date.setTime(
    date.getTime() + (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds) * 1000,
  );
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookieValue(name: string): string | null {
  // Retrieve the cookie value from the document
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export function deleteCookie(name: string) {
  // Delete the cookie from the document
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const getAuthToken = (): string | null => {
  // Retrieve the JWT token from wherever it's stored (e.g., cookie, local storage)
  return localStorage.getItem('jwt');
};

export const setAuthToken = (token: string) => {
  // Store the JWT token wherever you want (e.g., cookie, local storage)
  localStorage.setItem('jwt', token);
};

export const deleteAuthToken = () => {
  // Remove the JWT token from wherever it's stored (e.g., cookie, local storage)
  localStorage.removeItem('jwt');
};
