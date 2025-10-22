'use client'
import React from 'react';
import Networking from './Networking';
import NetworkingSidebar from './NetworkingSidebar';
import NetworkingRightSidebar from './NetworkingRightSidebar';
import StorySection from '../shared/StorySection';

const NetworkingLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-9">
          {/* Left Sidebar */}
          {/* <div className="lg:col-span-3">
            <NetworkingSidebar />
          </div> */}

          <div className="lg:col-span-6">
            
            <div className='bg-white md:rounded-lg border border-gray-200 mb-4 ml-[17px] mr-[17px]'>
              <StorySection />
            </div>

            <Networking />
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-2 hidden md:block">
            <NetworkingRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingLayout; 