import React from 'react';
import { Edit2 } from 'lucide-react';
import { personalInfo } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { PersonalInfo as PersonalInfoType } from '../../types/profile';

export default function PersonalInfo() {
  const info: PersonalInfoType = personalInfo;
  return (
    <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col gap-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{SITE_CONFIG.personalInfo.section}</h2>
        <div className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer absolute top-8 right-8">
          <Edit2 size={24} className="text-[#a259e6]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.personalInfo.personal}</div>
            <div className="text-xl font-bold text-gray-900">{info.personal}</div>
          </div>
          <div>
            <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.personalInfo.dob}</div>
            <div className="text-xl font-bold text-gray-900">{info.dob}</div>
          </div>
          <div>
            <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.personalInfo.category}</div>
            <div className="text-xl font-bold text-gray-900">{info.category}</div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.personalInfo.workPermit}</div>
            <div className="text-xl font-bold text-gray-900">{info.workPermit}</div>
          </div>
          <div>
            <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.personalInfo.address}</div>
            <div className="text-xl font-bold text-gray-900 break-words">{info.address}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="px-6 py-2 rounded-full border border-gray-200 text-lg font-semibold text-gray-900 bg-white hover:bg-gray-50 transition">
          {SITE_CONFIG.personalInfo.addMore}
        </button>
      </div>
    </div>
  );
} 