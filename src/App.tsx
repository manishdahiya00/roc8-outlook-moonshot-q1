import { useState } from "react";
import { Email, EmailBody } from "./types/email";
import { getEmailBody } from "./services/api";
import { EmailListItem } from "./components/EmailListItem";
import { EmailBodyView } from "./components/EmailBody";
import { FilterBar } from "./components/FilterBar";
import { Pagination } from "./components/Pagination";
import { useEmails } from "./hooks/useEmails";
import { toggleFavorite, markAsRead } from "./utils/localStorage";

type FilterType = "all" | "unread" | "read" | "favorites";

function App() {
  const {
    emails,
    loading: emailsLoading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    setEmails,
  } = useEmails();

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emailBody, setEmailBody] = useState<EmailBody | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const handleEmailSelect = async (email: Email) => {
    setSelectedEmail(email);
    setLoading(true);
    try {
      const body = await getEmailBody(email.id);
      setEmailBody(body);
      if (!email.read) {
        markAsRead(email.id);
        const updatedEmails = emails.map((e) =>
          e.id === email.id ? { ...e, read: true } : e
        );
        setEmails(updatedEmails);
      }
    } catch (error) {
      console.error("Failed to fetch email body:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!selectedEmail) return;
    toggleFavorite(selectedEmail.id);
    const updatedEmails = emails.map((email) =>
      email.id === selectedEmail.id
        ? { ...email, favorite: !email.favorite }
        : email
    );
    setEmails(updatedEmails);
    setSelectedEmail({ ...selectedEmail, favorite: !selectedEmail.favorite });
  };

  const filteredEmails = emails.filter((email) => {
    switch (activeFilter) {
      case "unread":
        return !email.read;
      case "read":
        return email.read;
      case "favorites":
        return email.favorite;
      default:
        return true;
    }
  });

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F4F5F9]">
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/5 flex flex-col border-r border-[#CFD2DC] bg-white">
          <div className="flex-1 overflow-y-auto">
            {emailsLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E54065]" />
              </div>
            ) : (
              filteredEmails.map((email) => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  selected={selectedEmail?.id === email.id}
                  onClick={() => handleEmailSelect(email)}
                  onDoubleClick={() => setSelectedEmail(null)}
                />
              ))
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="flex-1">
          <EmailBodyView
            email={selectedEmail}
            emailBody={emailBody}
            onToggleFavorite={handleToggleFavorite}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
