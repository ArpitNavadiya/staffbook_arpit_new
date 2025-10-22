import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`rounded-full bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white font-semibold shadow-md hover:opacity-90 transition px-6 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton; 