import React from 'react';
import { profilePerformanceStats } from '../../data/profilePerformanceStats';
import { PROFILE_PERFORMANCE_TITLE } from '../../constants/siteconfig';
import type { ProfilePerformanceStat } from '../../types/profile';
import ConnectionsIcon from '../svgs/ConnectionsIcon';
import PostsIcon from '../svgs/PostsIcon';
import JobPostsIcon from '../svgs/JobPostsIcon';
import ProfileViewsIcon from '../svgs/ProfileViewsIcon';
import ResumeDownloadsIcon from '../svgs/ResumeDownloadsIcon';
import ContactViewedIcon from '../svgs/ContactViewedIcon';

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Connections: ConnectionsIcon,
  Posts: PostsIcon,
  'Job Posts': JobPostsIcon,
  'Profile Views': ProfileViewsIcon,
  'Resume Downloads': ResumeDownloadsIcon,
  'Contact Viewed': ContactViewedIcon,
};

const ProfilePerformanceStats: React.FC = () => {
  return (
    <div className="w-full  rounded-2xl py-6">
      <div className="text-xl font-bold text-gray-900 mb-4">{PROFILE_PERFORMANCE_TITLE}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profilePerformanceStats.map((stat) => {
          const Icon = icons[stat.label];
          return (
            <div key={stat.label} className="flex flex-col items-center bg-white rounded-xl shadow p-4 gap-2">
              {Icon && <Icon className="text-[#A259FF]" />}
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePerformanceStats; 