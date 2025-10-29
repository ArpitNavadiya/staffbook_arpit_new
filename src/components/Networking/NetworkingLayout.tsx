'use client'
import React from 'react';
import Networking from './Networking';
import NetworkingRightSidebar from './NetworkingRightSidebar';
import StorySection from '../shared/StorySection';

const NetworkingLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="max-w-full pl-3 p-3">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            <div className='bg-white rounded-lg border border-gray-200'>
              <StorySection />
            </div>
            
            <Networking />
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-2">
            <NetworkingRightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingLayout;