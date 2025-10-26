'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProfileLayout from '../../../../components/shared/ProfileLayout';
import {
  FiUpload,
  FiEdit3,
  FiArrowLeft,
  FiCheck,
  FiStar,
  FiClock,
  FiUsers,
  FiAlertCircle,
  FiFileText,
  FiDownload,
  FiEye
} from 'react-icons/fi';

export default function CreateNewResume() {
  const [selectedOption, setSelectedOption] = useState<'upload' | 'custom' | null>(null);

  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-[#F3EFFF] p-4 md:p-6 -mt-[10px]">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">
                Create New Resume
              </h1>
              <p className="text-lg text-[#666] max-w-2xl mx-auto">
                Choose how you'd like to create your resume. Upload an existing one to get started quickly, 
                or build a custom resume from scratch.
              </p>
            </div>
          </div>

          {/* Main Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            {/* Upload Resume Option */}
            <Link href="/profile/resume/create/upload">
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedOption === 'upload'
                    ? 'transform scale-105'
                    : 'hover:transform hover:scale-105'
                }`}
                onClick={() => setSelectedOption('upload')}
              >
                <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 ${
                  selectedOption === 'upload'
                    ? 'border-[#5B5BE7] shadow-xl'
                    : 'border-gray-200 hover:border-[#5B5BE7] hover:shadow-xl'
                }`}>
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-300 ${
                      selectedOption === 'upload'
                        ? 'bg-gradient-to-br from-[#5B5BE7] to-[#8B2AE2]'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#5B5BE7] group-hover:to-[#8B2AE2]'
                    }`}>
                      <FiUpload size={32} className={`transition-colors duration-300 ${
                        selectedOption === 'upload'
                          ? 'text-white'
                          : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#222] mb-4">
                      Upload Resume
                    </h3>
                    
                    <p className="text-[#666] mb-6 leading-relaxed">
                      Have an existing resume? Upload it and we'll automatically extract 
                      all the information to create an editable version.
                    </p>
                    
                    <div className="space-y-3 text-sm text-[#666]">
                      <div className="flex items-center gap-2">
                        <FiCheck size={16} className="text-green-500" />
                        <span>Supports PDF, DOC, DOCX formats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheck size={16} className="text-green-500" />
                        <span>AI-powered data extraction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheck size={16} className="text-green-500" />
                        <span>Editable after processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Custom Resume Option */}
            <Link href="/profile/resume/create/builder">
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedOption === 'custom'
                    ? 'transform scale-105'
                    : 'hover:transform hover:scale-105'
                }`}
                onClick={() => setSelectedOption('custom')}
              >
                <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 ${
                  selectedOption === 'custom'
                    ? 'border-[#5B5BE7] shadow-xl'
                    : 'border-gray-200 hover:border-[#5B5BE7] hover:shadow-xl'
                }`}>
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-300 ${
                      selectedOption === 'custom'
                        ? 'bg-gradient-to-br from-[#5B5BE7] to-[#8B2AE2]'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#5B5BE7] group-hover:to-[#8B2AE2]'
                    }`}>
                      <FiEdit3 size={32} className={`transition-colors duration-300 ${
                        selectedOption === 'custom'
                          ? 'text-white'
                          : 'text-gray-600 group-hover:text-white'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#222] mb-4">
                      Build Custom Resume
                    </h3>
                    
                    <p className="text-[#666] mb-6 leading-relaxed">
                      Start from scratch with our comprehensive resume builder. 
                      Create a professional resume with guided sections and tips.
                    </p>
                    
                    <div className="space-y-3 text-sm text-[#666]">
                      <div className="flex items-center gap-2">
                        <FiCheck size={16} className="text-green-500" />
                        <span>Step-by-step guidance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheck size={16} className="text-green-500" />
                        <span>Professional templates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheck size={16} className="text-green-500" />
                        <span>Real-time preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiAlertCircle size={20} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-[#222] mb-2">Need Help Choosing?</h4>
                <p className="text-[#666] text-sm leading-relaxed">
                  If you already have a resume, uploading it will save you time by automatically filling in your information. 
                  If you're starting fresh or want complete control over the design, choose the custom builder.
                </p>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#222] text-center mb-8">
              What You'll Get
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#5B5BE7] to-[#8B2AE2] rounded-xl mb-4">
                  <FiFileText size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#222] mb-2">Professional Format</h3>
                <p className="text-sm text-[#666]">
                  Clean, ATS-friendly resume formats that get noticed by recruiters
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#8B2AE2] to-[#B14BE4] rounded-xl mb-4">
                  <FiDownload size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#222] mb-2">Multiple Formats</h3>
                <p className="text-sm text-[#666]">
                  Download your resume in PDF, DOCX, or share it online
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#B14BE4] to-[#921294] rounded-xl mb-4">
                  <FiEye size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#222] mb-2">Real-time Preview</h3>
                <p className="text-sm text-[#666]">
                  See exactly how your resume looks as you build it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}