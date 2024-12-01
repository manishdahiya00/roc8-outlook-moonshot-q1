import React from "react";
import { format } from "date-fns";
import { Star } from "lucide-react";
import clsx from "clsx";
import { Email } from "../types/email";

interface EmailListItemProps {
  email: Email;
  selected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}

export const EmailListItem: React.FC<EmailListItemProps> = ({
  email,
  selected,
  onClick,
  onDoubleClick,
}) => {
  const date = new Date(email.date);

  return (
    <div
      className={clsx(
        "p-4 m-4  border-gray-300 rounded-md cursor-pointer transition-colors border-2",
        selected
          ? "border-l-4 border-t-2 border-b-2 border-r-2 border-l-[#E54065] border-b-[#E54065] border-r-[#E54065] border-t-[#E54065]"
          : "",
        email.read ? "bg-white" : "bg-[#F2F2F2]"
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-[#E54065] flex items-center justify-center text-white font-semibold text-lg">
          {email.from.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <span className="text-sm text-gray-600">From: </span>
            <span className="text-sm font-medium">{`${email.from.name} <${email.from.email}>`}</span>
          </div>
          <div className="mb-1">
            <span className="text-sm text-gray-600">Subject: </span>
            <span className="text-sm font-medium">{email.subject}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {email.short_description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              {format(date, "dd/MM/yyyy hh:mm a")}
            </span>
            {email.favorite && (
              <span className="text-xs text-[#E54065] flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Favorite
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
