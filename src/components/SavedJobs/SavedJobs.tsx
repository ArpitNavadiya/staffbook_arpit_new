'use client'
import React, { useState, useEffect, useRef } from 'react';
import { savedJobs } from '../../data/savedJobs';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { FiFilter, FiUser, FiCalendar, FiBriefcase, FiClock, FiX, FiEye, FiHome, FiMapPin, FiDollarSign, FiPlus, FiVideo } from 'react-icons/fi';
import Image from 'next/image';

interface SavedJobCardProps {
  job: {
    company: string;
    logo: string;
    role: string;
    location: string;
    workMode: string;
    experience: string;
    postedTime: string;
    postedBy?: string;
    salary?: string;
    hybridOption?: string;
  };
}

const SavedJobCard: React.FC<SavedJobCardProps> = ({ job }) => {
  const getCompanyLogo = (company: string) => {
    const logos: { [key: string]: { bg: string; logo: string } } = {
      'Google': { bg: 'bg-white', logo: '/homePage/google-logo.png' },
      'Notion': { bg: 'bg-gray-100', logo: '/homePage/notion-logo.png' },
      'Upwork': { bg: 'bg-green-50', logo: '/homePage/upwork-logo.png' },
      'Webflow': { bg: 'bg-blue-50', logo: '/homePage/webflow-logo.png' },
      'Accenture': { bg: 'bg-purple-50', logo: '/homePage/accenture.png' },
    };
    
    return logos[company] || { bg: 'bg-gray-100', logo: '/homePage/accenture.png' };
  };

  const { bg, logo } = getCompanyLogo(job.company);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Company Logo */}
        <div className={`w-full sm:w-24 h-20 sm:h-24 ${bg} flex items-center justify-center p-4`}>
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 font-bold text-lg">
              {job.company.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Job Details */}
        <div className="flex-1 p-4">
          {/* Header with job title and action icons */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 truncate">{job.role}</h3>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <span className="truncate">{job.company}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Posted by {job.postedBy || 'Rajeev Tripathi'}</span>
                <span className="hidden sm:inline">•</span>
                <span className="truncate">{job.postedTime}</span>
              </div>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2 ml-2">
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors">
                <FiPlus className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors">
                <FiVideo className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              </button>
            </div>
          </div>
          
          {/* Job Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FiHome className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{job.workMode}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FiBriefcase className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{job.hybridOption || 'Both'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate">{job.salary || '20L-25L p.a'}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button className="px-3 py-2 text-gray-600 bg-gray-100 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
              Remove
            </button>
            <button className="px-3 py-2 bg-purple-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition-colors">
              View job description
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SavedJobs: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Job role');
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filterOptions = [
    { label: 'Job role', icon: FiUser },
    { label: 'Posted date', icon: FiCalendar },
    { label: 'Work mode', icon: FiBriefcase },
    { label: 'Job type', icon: FiClock },
  ];

  // Enhanced saved jobs data with additional fields
  const enhancedSavedJobs = savedJobs.map(job => ({
    ...job,
    postedBy: 'Rajeev Tripathi',
    salary: '20L-25L p.a',
    hybridOption: 'Both',
  }));

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="text-3xl font-bold text-gray-900">
              Saved Jobs
            </div>
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{selectedFilter}</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                {filterOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.label}
                      onClick={() => {
                        setSelectedFilter(option.label);
                        setIsFilterOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <IconComponent className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {enhancedSavedJobs.map((job, index) => (
          <SavedJobCard 
            key={index} 
            job={job}
          />
        ))}
      </div>

      {/* Empty State */}
      {enhancedSavedJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiEye className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No saved jobs yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start saving jobs you&apos;re interested in to keep track of them here.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
            Browse Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs; 