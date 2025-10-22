'use client'
import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { profileSummary as initialSummary } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import ProfileSummaryModal from './ProfileSummaryModal';

export default function ProfileSummary() {
  const [summary, setSummary] = useState(initialSummary);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = () => setModalOpen(true);
  const handleSave = (newSummary: string) => setSummary(newSummary);

  return (
    <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col gap-4 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-900">{SITE_CONFIG.profileSummary.section}</h2>
        <button
          className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer absolute top-8 right-8"
          onClick={handleEdit}
          aria-label="Edit Profile Summary"
        >
          <Edit2 size={22} className="text-[#a259e6]" />
        </button>
      </div>
      <p className="text-base text-gray-700 leading-relaxed">
        {summary}
      </p>
      <ProfileSummaryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={summary}
        onSave={handleSave}
      />
    </div>
  );
} 