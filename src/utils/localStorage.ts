import { Email } from '../types/email';

const FAVORITES_KEY = 'email_favorites';
const READ_EMAILS_KEY = 'read_emails';

export const getFavoriteIds = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getReadEmailIds = (): string[] => {
  const stored = localStorage.getItem(READ_EMAILS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleFavorite = (emailId: string): void => {
  const favorites = getFavoriteIds();
  const newFavorites = favorites.includes(emailId)
    ? favorites.filter(id => id !== emailId)
    : [...favorites, emailId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
};

export const markAsRead = (emailId: string): void => {
  const readEmails = getReadEmailIds();
  if (!readEmails.includes(emailId)) {
    localStorage.setItem(READ_EMAILS_KEY, JSON.stringify([...readEmails, emailId]));
  }
};