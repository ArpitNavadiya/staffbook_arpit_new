'use client'
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { basicDetails as initialBasicDetails } from '../../data/profile';
import type { BasicDetails as BasicDetailsType } from '../../types/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import BasicDetailsModal from './BasicDetailsModal';

export default function BasicDetails() {
  const [basicDetails, setBasicDetails] = useState<BasicDetailsType>(initialBasicDetails);
  const [isBasicDetailsModalOpen, setBasicDetailsModalOpen] = useState(false);

  const handleEditBasicDetails = () => setBasicDetailsModalOpen(true);
  const handleCloseModal = () => setBasicDetailsModalOpen(false);
  const handleSaveBasicDetails = (data: BasicDetailsType) => setBasicDetails(data);

  return (
    <div className="relative bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{SITE_CONFIG.basicDetails.section}</h2>
      <button
          className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer absolute top-8 right-8"
          onClick={handleEditBasicDetails}
          aria-label="Edit Profile Summary"
        >
          <Edit2 size={22} className="text-[#a259e6]" />
        </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.totalExperience}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.totalExperience}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.workEmail}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.workEmail}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.location}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.location}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.personalEmail}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.personalEmail}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.currentSalary}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.currentSalary}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.workNoticePeriod}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.workNoticePeriod}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.noticePeriod}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.noticePeriod}</div>
        </div>
        <div>
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.personalContact}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.personalContact}</div>
        </div>
        <div className="md:col-span-2">
          <div className="text-gray-400 text-base font-medium mb-1">{SITE_CONFIG.basicDetails.socialMedia}</div>
          <div className="text-gray-900 font-semibold mb-2">{basicDetails.socialMedia}</div>
        </div>
      </div>
      <BasicDetailsModal
        open={isBasicDetailsModalOpen}
        onClose={handleCloseModal}
        initialData={basicDetails}
        onSave={handleSaveBasicDetails}
      />
    </div>
  );
} 