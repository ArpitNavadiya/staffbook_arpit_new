'use client'
import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import StorySection from './StorySection';
import { FiMenu, FiX } from 'react-icons/fi';
import JobSearchBar from './SubMenuWrapper';
import ProfileAvatar from './ProfileAvatar';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface ProfileLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showStories?: boolean;
  showJobSearchBar?: boolean;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  showSidebar = true,
  showStories = true,
  showJobSearchBar = true
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useAuth();



  return (
    <div className="min-h-screen mt-8 bg-white">
      {/* Mobile Sidebar Toggle Button */}
      {showSidebar && (
        <div className="lg:hidden fixed top-18 left-2 z-50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className=" bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Toggle sidebar"
          >
            <div className='rounded-full border border-gray-200 overflow-hidden h-10 w-10 bg-red-500 flex items-center justify-center'>
              <Image
                src={"/homePage/profile.png"}
                alt={"profile"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
          </button>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {showSidebar && isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Collapsible on mobile, fixed on desktop */}
        {showSidebar && (
          <div className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 lg:relative lg:w-77  flex-shrink-0
            fixed lg:static top-10 left-0 h-full lg:z-0 z-50
            w-80 bg-white shadow-lg lg:shadow-none
            transition-transform duration-300 ease-in-out -mt-[20px]
          `}>
            <ProfileSidebar />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Stories Section */}
          {/* {showStories && (
            <div className="w-full ">
              <StorySection />
            </div>
          )} */}
          <br />
          {showJobSearchBar && <div className='w-full lg:max-w-[100%]'>
            <JobSearchBar />
          </div>}

          {/* Page Content */}
          <main className="flex-1 w-full lg:max-w-[100%] bg-gray-100 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout; 