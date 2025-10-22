'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { ResumeWritingService } from '../../types/service';

export default function ResumeWritingSection() {
  const { resumeWriting } = SITE_CONFIG.services;
  
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-[#f7f7fa] to-[#f0f0ff] rounded-[24px] p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {resumeWriting.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {resumeWriting.subtitle}
              </p>
              
              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">What you ll get:</h3>
                <div className="space-y-2">
                  {resumeWriting.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check size={18} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price */}
              <div className="pt-4">
                <p className="text-2xl font-bold text-[#5B5DE6]">
                  {resumeWriting.price}
                </p>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src={resumeWriting.image}
                  alt="Resume Writing Service"
                  width={300}
                  height={200}
                  className="rounded-[16px] shadow-lg"
                />
                {/* Overlay with checkmark and stamp effect */}
                {/* <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={20} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-[16px] transform rotate-12 scale-110 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded font-bold text-sm rotate-12">
                    ACCEPTED
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 