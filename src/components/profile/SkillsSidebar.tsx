import React from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { skillGroups } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { SkillGroup } from '../../types/profile';
import ProfilePerformance from './ProfilePerformance';

const SkillsSidebar: React.FC = () => (
  <>
    <div className="w-full lg:w-[320px] flex-shrink-0 bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-gray-900">{SITE_CONFIG.skills.section}</h3>
        <div className="flex gap-2">
          <div className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer">
            <Plus size={20} className="text-[#a259e6]" />
          </div>
          <div className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer">
            <Edit2 size={20} className="text-[#a259e6]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {skillGroups.map((group: SkillGroup, idx: number) => (
          <div key={group.category + idx}>
            <div className="font-bold text-lg text-gray-900 mb-2">{group.category}</div>
            <div className="flex flex-wrap gap-3 mb-2">
              {group.skills.map((skill: string) => (
                <span key={skill} className="bg-[#ede6fa] text-[#18181b] px-4 py-2 rounded-full text-base font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-4 w-full lg:w-[320px]">
      <ProfilePerformance />
    </div>
  </>
);

export default SkillsSidebar; 