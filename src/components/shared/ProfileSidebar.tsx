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
  FiBookmark,
  FiCalendar
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

// New: LinkedIn-style left menu items for Networking
const networkingMenu = [
  { id: 'saved', label: 'Saved items', icon: <FiBookmark size={18} />, route: '/saved' },
  { id: 'groups', label: 'Groups', icon: <FiUsers size={18} />, route: '/groups' },
  { id: 'newsletters', label: 'Newsletters', icon: <FiFileText size={18} />, route: '/newsletters' },
  { id: 'events', label: 'Events', icon: <FiCalendar size={18} />, route: '/events' },
];

export default function ProfileSidebar({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`${compact ? "w-full h-auto md:h-auto md:sticky md:top-[70px] pt-[1rem] z-10 shadow-none mt-0" : "w-full md:w-[20rem] lg:w-[19rem] md:h-screen pt-[1.5rem] z-10 shadow-lg md:shadow-none mt-[3.5rem]"} flex flex-col items-center`}>

      {/* LinkedIn-style mini card + actions for Networking */}
      <div className="w-full px-4">
        {/* Connections card */}
        <div className="bg-white rounded-[1rem] border border-[#E8E4FF] p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/homePage/profile.png"
                alt="Profile"
                width={48}
                height={48}
                className="object-cover w-12 h-12"
              />
            </div>
            <div className="flex-1">
              <div className="text-[0.95rem] font-bold text-[#222]">Your profile</div>
              <div className="text-[0.8rem] text-[#666]">Grow your network</div>
            </div>
          </div>

          <Link
            href="/myconnection"
            className="mt-3 inline-flex items-center justify-center w-full h-9 rounded-lg bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white text-[0.85rem] font-bold hover:opacity-95 transition"
          >
            Connections
          </Link>
        </div>

        {/* Menu list */}
        <div className="bg-white rounded-[1rem] border border-[#E8E4FF]">
          <ul className="divide-y divide-[#F0EDFF]">
            {networkingMenu.map(item => (
              <li key={item.id}>
                <Link
                  href={item.route}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8F6FF] transition"
                >
                  <div className="text-[#5B5BE7]">{item.icon}</div>
                  <span className="text-[0.9rem] font-medium text-[#222]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Enhanced Cards Section - now moved below the new menu */}
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