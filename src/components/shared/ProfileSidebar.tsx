import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiTrendingUp,
  FiBriefcase,
  FiUsers,
  FiMessageCircle,
  FiAward,
  FiFileText,
  FiSearch,
  FiBell,
  FiEdit2,
} from "react-icons/fi";
import { EnhancedCardItem } from "@/types/profileEnhanced";

// Enhanced card menu items with LinkedIn + Naukri.com mixed features
const enhancedCards: EnhancedCardItem[] = [
  {
    id: 'analytics',
    icon: <FiTrendingUp size={20} />,
    title: 'Profile Analytics',
    subtitle: 'Views & Insights',
    route: '/profile/analytics',
    color: 'from-[#5B5BE7] to-[#B14BE4]'
  },
  {
    id: 'development',
    icon: <FiAward size={20} />,
    title: 'Career Growth',
    subtitle: 'Skills & Learning',
    route: '/profile/development',
    color: 'from-[#B14BE4] to-[#921294]'
  },
  {
    id: 'resume',
    icon: <FiFileText size={20} />,
    title: 'Resume & Portfolio',
    subtitle: 'Downloads & Views',
    route: '/profile/resume',
    color: 'from-[#921294] to-[#5B5BE7]'
  },
  {
    id: 'insights',
    icon: <FiSearch size={20} />,
    title: 'Recruiter Interest',
    subtitle: 'Who Found You',
    route: '/profile/insights',
    color: 'from-[#5B5BE7] to-[#B14BE4]'
  }
];

export default function ProfileSidebar() {
  return (
    <aside className="w-full md:w-[20rem] lg:w-[19rem] md:h-screen flex flex-col items-center pt-[1.5rem] z-10 shadow-lg md:shadow-none mt-[3rem]">
      {/* <div className="flex flex-col items-center mb-[1.5rem] flex-shrink-0 px-4 md:px-0">
        <div className="relative flex flex-col items-center">
          <div className="w-[6rem] h-[6rem] rounded-full bg-gradient-to-tr from-[#5B5BE7] via-[#B14BE4] to-[#921294] p-[0.1875rem] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-[5.5rem] h-[5.5rem] rounded-full bg-white flex items-center justify-center overflow-hidden">
              <Image
                src="/homePage/profile.png"
                alt="Profile"
                width={5.25 * 16}
                height={5.25 * 16}
                className="object-cover w-[5.25rem] h-[5.25rem] rounded-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[2rem] h-[2rem] rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg -translate-y-[0.5rem] translate-x-[0.5rem] cursor-pointer hover:scale-110 transition-all duration-300">
            <FiEdit2 className="text-[#B14BE4] hover:text-[#921294] transition-colors duration-300" size={16} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-1.125rem] bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] px-3 py-1 rounded-full shadow-md text-sm font-bold text-white flex items-center">
            80%
          </div>
        </div>

        <div className="mt-[2rem] text-[1rem] font-bold font-Montserrat text-[#5B5BE7] text-center">
          Riya Goyal
        </div>
        <div className="text-[0.875rem] font-medium font-Montserrat text-[#222] text-center">
          HR at Appsuccessor
        </div>
        <Link href="/profile" className="mt-[0.75rem] w-[7.4375rem] h-[1.8125rem] bg-gradient-to-r from-[#5B5DE6] to-[#921294] hover:from-[#4A4AD6] hover:to-[#811284] text-white text-[0.875rem] font-bold rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105">
          View Profile
        </Link>
      </div> */}

      {/* Enhanced Cards Section - Scrollable */}
      <div className="flex-1 w-full px-4 pb-16 md:pb-4">
        <div className="flex flex-col font-Montserrat gap-[0.75rem] w-full items-center">
          {enhancedCards.map((card) => (
            <Link
              key={card.id}
              href={card.route}
              className="group w-full max-w-[16rem] md:max-w-[18rem] h-[5rem] bg-gradient-to-br from-white to-[#F8F6FF] hover:from-[#F3EFFF] hover:to-white rounded-[1rem] flex flex-col justify-center px-[1rem] py-[0.75rem] shadow-sm hover:shadow-lg border border-[#E8E4FF] hover:border-[#B14BE4]/30 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer relative overflow-hidden"
            >
              {/* Gradient Accent Line */}
              <div className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#5B5BE7] to-[#B14BE4] opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="flex items-center gap-[0.75rem]">
                <div className={`p-2 rounded-lg bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[0.875rem] font-bold text-[#222] group-hover:text-[#5B5BE7] transition-colors duration-300">
                    {card.title}
                  </div>
                  <div className="text-[0.75rem] font-medium text-[#666] group-hover:text-[#8B2AE2] transition-colors duration-300">
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
