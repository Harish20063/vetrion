import React from 'react';

interface DoorwayArchAvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DoorwayArchAvatar: React.FC<DoorwayArchAvatarProps> = ({
  initials,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-12 text-sm rounded-t-[18px] rounded-b-[6px]',
    md: 'w-12 h-14 text-base rounded-t-[22px] rounded-b-[8px]',
    lg: 'w-14 h-16 text-lg rounded-t-[26px] rounded-b-[10px]'
  };

  return (
    <div
      className={`bg-gradient-to-br from-indigo-900 to-indigo-800 text-marigold-400 font-bold flex items-center justify-center border-2 border-marigold-500 shadow-md shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
};

export const DoorwayArchLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-10 h-12 bg-gradient-to-br from-indigo-950 to-indigo-800 text-marigold-400 rounded-t-[20px] rounded-b-[6px] border-2 border-marigold-500 flex items-center justify-center shadow-md shadow-marigold-500/20 shrink-0 ${className}`}
    >
      <svg
        className="w-5 h-5 text-marigold-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 20V10a6 6 0 0 1 12 0v10" />
        <path d="M4 20h16" />
      </svg>
    </div>
  );
};
