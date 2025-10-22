import React from 'react';
import ChevronRightGradient from '../svgs/ChevronRightGradient';

interface SeeAllButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const SeeAllButton: React.FC<SeeAllButtonProps> = ({ children, className = '', ...props }) => (
  <div
    className={`flex items-center gap-1 md:gap-6 text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5B5DE6] to-[#921294] hover:underline transition ${className}`}
    {...props}
  >
    <span>{children}</span>
    <ChevronRightGradient width={24} height={24} />
  </div>
);

export default SeeAllButton; 