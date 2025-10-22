import Image from 'next/image';
import { user } from '@/data/profile';
import { Edit2 } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteconfig';

export default function ProfileHeader() {
  return (
    <div className="w-full bg-white rounded-2xl shadow p-6 flex flex-col gap-6 relative">
      {/* Edit Icon */}
      <div className="absolute top-6 right-6">
        <div className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer">
          <Edit2 size={24} className="text-[#a259e6]" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Avatar with Progress */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-tr from-[#5B5DE6] to-[#921294] flex items-center justify-center p-1">
              <div className="w-[128px] h-[128px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                <Image src={user.avatar} alt={user.name} width={120} height={120} className="rounded-full object-cover" />
              </div>
            </div>
            {/* Progress badge */}
            <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 bg-white rounded-full px-6 py-1 border-2 border-[#a259e6] text-[#a259e6] font-bold text-lg shadow text-center">
              {user.progress}%
            </div>
          </div>
        </div>
        {/* Profile Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 items-center">
          <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{user.name}</h2>
          </div>
          <div>
            <p className="text-gray-400 ">{SITE_CONFIG.profileHeader.preferredRole}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.preferredRole}</p>
          </div>
          <div>
            <p className="text-gray-400">{SITE_CONFIG.profileHeader.preferredLocation}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.preferredLocation}</p>
          </div>
          <div>
            <p className="text-gray-400">{SITE_CONFIG.profileHeader.preferredSalary}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.preferredSalary}</p>
          </div>
          <div>
            <p className="text-gray-400">{SITE_CONFIG.profileHeader.preferredShift}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.preferredShift}</p>
          </div>
          <div>
            <p className="text-gray-400">{SITE_CONFIG.profileHeader.jobType}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.jobType}</p>
          </div>
          <div>
            <p className="text-gray-400">{SITE_CONFIG.profileHeader.jobType}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.jobType}</p>
          </div>
          <div>
            <p className="text-gray-400">{SITE_CONFIG.profileHeader.workStatus}</p>
            <p className="text-base md:text-xl font-semibold text-gray-900">{user.workStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 