// SHARED COMPONENT: CategoryCard
// This is the reusable card for category/job role cards. Always use this for popular roles/categories. (Per code-structure rules)

import React from 'react';

interface CategoryCardProps {
  icon: React.ElementType;
  title: string;
  jobs: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon: Icon, title, jobs, className = '' }) => (
  <div
    className={`flex flex-row items-center gap-4 bg-white border border-gray-200 rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition min-h-[72px] ${className}`}
  >
    <div className="w-12 h-12 rounded-full bg-[#f3e8ff] flex items-center justify-center">
      <Icon size={28} className="text-[#a259e6]" />
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-base text-gray-900 leading-tight">{title}</div>
      <div className="text-sm text-gray-400 font-medium">{jobs}</div>
    </div>
  </div>
);

export default CategoryCard; 