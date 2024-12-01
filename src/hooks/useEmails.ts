import { useState, useEffect } from "react";
import { Email } from "../types/email";
import { getEmails } from "../services/api";
import { getFavoriteIds, getReadEmailIds } from "../utils/localStorage";

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmails = async (page: number) => {
    setLoading(true);
    try {
      const data = await getEmails(page);
      const favoriteIds = getFavoriteIds();
      const readIds = getReadEmailIds();

      const enhancedEmails = data.list.map((email) => ({
        ...email,
        favorite: favoriteIds.includes(email.id),
        read: readIds.includes(email.id),
      }));

      setEmails(enhancedEmails);
      setTotalPages(Math.ceil(data.total / 10));
    } catch (err) {
      setError("Failed to fetch emails");
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    emails,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    setEmails,
  };
};
