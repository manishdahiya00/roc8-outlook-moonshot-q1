import { useEffect } from 'react';
import { Email } from '../types/email';

const FAVORITES_KEY = 'email_favorites';

// Helper function to get favorite IDs from localStorage
const getFavoriteIds = (): Set<string> => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set();
};

// Helper function to update emails with favorite status
const updateEmailsWithFavorites = (emails: Email[], favoriteIds: Set<string>): Email[] => {
  return emails.map((email) => ({
    ...email,
    favorite: favoriteIds.has(email.id),
  }));
};

export const useFavorites = (emails: Email[], setEmails: (emails: Email[]) => void) => {
  // Update emails with favorites whenever emails change
  useEffect(() => {
    if (emails.length > 0) {
      const favoriteIds = getFavoriteIds();
      const updatedEmails = updateEmailsWithFavorites(emails, favoriteIds);
      setEmails(updatedEmails);
    }
  }, [emails]); // Run whenever emails change

  const toggleFavorite = (emailId: string) => {
    const favoriteIds = getFavoriteIds();

    if (favoriteIds.has(emailId)) {
      favoriteIds.delete(emailId);
    } else {
      favoriteIds.add(emailId);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoriteIds]));
    
    // Update emails state
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, favorite: !email.favorite } : email
    );
    setEmails(updatedEmails);
  };

  return { toggleFavorite };
};
