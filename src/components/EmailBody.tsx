import React from "react";
import { format } from "date-fns";
import { Star } from "lucide-react";
import clsx from "clsx";
import { Email, EmailBody } from "../types/email";

interface EmailBodyViewProps {
  email: Email | null;
  emailBody: EmailBody | null;
  onToggleFavorite: () => void;
  loading: boolean;
}

export const EmailBodyView: React.FC<EmailBodyViewProps> = ({
  email,
  emailBody,
  onToggleFavorite,
  loading,
}) => {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full bg-[#F4F5F9]">
        <p className="text-gray-500">Select an email to view its contents</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center bg-[#F4F5F9]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E54065]" />
      </div>
    );
  }

  const date = new Date(email.date);

  return (
    <div className="h-full bg-[#F4F5F9] overflow-auto">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#E54065] flex items-center justify-center text-white font-semibold text-lg">
            {email.from.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {email.subject}
            </h2>
            <p className="text-sm text-gray-500">
              {format(date, "dd/MM/yyyy hh:mm a")}
            </p>
          </div>
          <button
            onClick={onToggleFavorite}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium",
              email.favorite
                ? "bg-[#E54065] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            <span className="flex items-center gap-2">
              <Star
                className={clsx("w-4 h-4", email.favorite && "fill-current")}
              />
              {email.favorite ? "Favorite" : "Mark as Favorite"}
            </span>
          </button>
        </div>

        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: emailBody?.body || "" }}
        />
      </div>
    </div>
  );
};
