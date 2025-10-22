import React from 'react';
import { Edit2, Upload, Trash2 } from 'lucide-react';
import { resumeFile } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';

export default function ResumeUpload() {
  return (
    <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col gap-4 relative items-center">
      <div className="flex items-center justify-between w-full mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {SITE_CONFIG.resume.section}<span className="text-[#e11d48] ml-1">{SITE_CONFIG.resume.required}</span>
        </h2>
        <div className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer absolute top-8 right-8">
          <Edit2 size={22} className="text-[#a259e6]" />
        </div>
      </div>
      <div className="w-full">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white font-bold py-3 px-6 rounded-full shadow-md text-base">
          {SITE_CONFIG.resume.upload}
          <Upload size={18} className="inline-block" />
          <span className="text-gray-200 font-normal ml-2">({resumeFile})</span>
          <Trash2 size={18} className="inline-block text-[#e11d48] ml-2" />
        </button>
      </div>
      <span className="text-sm text-green-600 text-center w-full mt-1">{SITE_CONFIG.resume.helper}</span>
    </div>
  );
} 