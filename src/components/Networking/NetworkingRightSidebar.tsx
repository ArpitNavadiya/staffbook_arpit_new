'use client'
import React from 'react';
import { suggestedConnections } from '../../data/networking';
import { SITE_CONFIG } from '../../constants/siteconfig';
import Image from 'next/image';

const NetworkingRightSidebar: React.FC = () => {
  return (
    <>
    <div className="w-full lg:w-80 xl:w-96 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
      <h3 className="font-semibold text-gray-900 mb-4">{SITE_CONFIG.networking.suggestedForYou}</h3>
      
      <div className="space-y-4">
        {suggestedConnections.map((connection) => (
          <div key={connection.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Image
              src={connection.avatar}
              alt={connection.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{connection.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{connection.title}</p>
              {/* <p className="text-xs text-gray-500 line-clamp-2 mb-2">{connection.description}</p> */}
              <button className="bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-700 transition-colors">
                {SITE_CONFIG.networking.connect}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
            <div className="w-full mt-4 lg:w-80 xl:w-96 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
    <RecruitersOnline />
    </div>
    </>
  );
};
const RecruiterCard: React.FC<{ recruiter: Recruiter }> = ({ recruiter }) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Profile Picture with Online Status */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-0.5">
          <Image
            src={recruiter.avatar}
            alt={recruiter.name}
            width={48}
            height={48}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* Online Status Dot */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{recruiter.name}</h3>
            <p className="text-xs text-gray-600">{recruiter.title}</p>
          </div>
          <button className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full text-xs font-medium hover:bg-purple-50 transition-colors">
            {SITE_CONFIG.networking.recruitersOnline.chat}
          </button>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {recruiter.description}
        </p>
      </div>
    </div>
  );
};

export interface Recruiter {
  id: number;
  name: string;
  title: string;
  avatar: string;
  description: string;
}
const RecruitersOnline: React.FC = () => {

  const recruiters: Recruiter[] = [
    {
      id: 1,
      name: 'John Doee',
      title: 'HR at Microsoft',
      avatar: '/homePage/profile.png',
      description: 'As part of Google\'s People Operations team, I help shape the future of work by attracting, developing, and supporting world-class talent. My role bridges data-driven decision-making with genuine human connection—ensuring every Googler thrives in a culture of innovation, inclusion, and impact.'
    },
    {
      id: 2,
      name: 'John Doee',
      title: 'HR at Microsoft',
      avatar: '/homePage/profile.png',
      description: 'As part of Google\'s People Operations team, I help shape the future of work by attracting, developing, and supporting world-class talent. My role bridges data-driven decision-making with genuine human connection—ensuring every Googler thrives in a culture of innovation, inclusion, and impact.'
    }
  ];

  return (
    <div className=" p-2 lg:p-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{SITE_CONFIG.networking.recruitersOnline.title}</h3>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
          {SITE_CONFIG.networking.recruitersOnline.viewAll}
        </button>
      </div>
      <div className="space-y-3">
        {recruiters.map((recruiter) => (
          <RecruiterCard key={recruiter.id} recruiter={recruiter} />
        ))}
      </div>
    </div>
  );
};

export default NetworkingRightSidebar; 