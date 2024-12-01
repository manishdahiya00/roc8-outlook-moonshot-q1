import React from 'react';

interface EmailAvatarProps {
  name: string;
}

export const EmailAvatar: React.FC<EmailAvatarProps> = ({ name }) => {
  const initial = name.charAt(0).toUpperCase();
  
  return (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
      {initial}
    </div>
  );
};