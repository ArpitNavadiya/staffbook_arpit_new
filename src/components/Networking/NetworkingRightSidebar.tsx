"use client";
import React, { useState } from "react";
import { suggestedConnections } from "../../data/networking";
import { SITE_CONFIG } from "../../constants/siteconfig";
import Image from "next/image";

const tabs = ["All", "Near You", "Your City", "Your State"];
const jobList = [
  {
    title: "UI/UX Designer",
    company: "Google Enterprises",
    logo: "/homePage/google-logo.png",
  },
  {
    title: "React Developer",
    company: "Google Enterprises",
    logo: "/homePage/google-logo.png",
  },
  {
    title: "Backend Engineer",
    company: "Google Enterprises",
    logo: "/homePage/google-logo.png",
  },
  {
    title: "UI/UX Designer",
    company: "Google Enterprises",
    logo: "/homePage/google-logo.png",
  },
  {
    title: "John Cena",
    company: "Google Enterprises",
    logo: "/homePage/google-logo.png",
  },
];

const NetworkingRightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Near You");
  return (
    <>
      <div className="w-full lg:w-80 xl:w-96 bg-white rounded-lg border border-gray-200 p-4 lg:p-6 mb-[15px]">
        <div className="p-2 lg:p-2">
          {/* Map Section */}
          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src="/homePage/location.png"
              alt="Map showing job locations"
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Near You
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Your City
            </button>
          </div>

          {/* Recruiter Cards */}
          <div className="space-y-3">
            {suggestedConnections.map((recruiter, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 bg-[#F5E8FF] rounded-2xl"
              >
                {/* Profile Picture with Purple Border */}
                <div className="relative">
                  <div className="w-15 h-15 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 p-1">
                    <Image
                      src={recruiter.avatar}
                      alt={recruiter.name}
                      width={56}
                      height={56}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {recruiter.name}
                  </h3>
                  <p className="text-sm text-gray-600">{recruiter.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-80 xl:w-96 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          {SITE_CONFIG.networking.suggestedForYou}
        </h3>

        <div className="space-y-4">
          {suggestedConnections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Image
                src={connection.avatar}
                alt={connection.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {connection.name}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{connection.title}</p>
                {/* <p className="text-xs text-gray-500 line-clamp-2 mb-2">{connection.description}</p> */}
                <button className="bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-700 transition-colors">
                  {SITE_CONFIG.networking.connect}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-4 lg:w-80 xl:w-96 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
        <RecruitersOnline />
      </div>
    </>
  );
};
const RecruiterCard: React.FC<{ recruiter: Recruiter }> = ({ recruiter }) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Profile Picture with Online Status */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-0.5">
          <Image
            src={recruiter.avatar}
            alt={recruiter.name}
            width={48}
            height={48}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* Online Status Dot */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {recruiter.name}
            </h3>
            <p className="text-xs text-gray-600">{recruiter.title}</p>
          </div>
          <button className="px-3 py-1 border border-purple-500 text-purple-600 rounded-full text-xs font-medium hover:bg-purple-50 transition-colors">
            {SITE_CONFIG.networking.recruitersOnline.chat}
          </button>
        </div>
        {/* <p className="text-xs text-gray-600 leading-relaxed">
          {recruiter.description}
        </p> */}
      </div>
    </div>
  );
};

export interface Recruiter {
  id: number;
  name: string;
  title: string;
  avatar: string;
  description: string;
}
const RecruitersOnline: React.FC = () => {
  const recruiters: Recruiter[] = [
    {
      id: 1,
      name: "John Doee",
      title: "HR at Microsoft",
      avatar: "/homePage/profile.png",
      description:
        "As part of Google's People Operations team, I help shape the future of work by attracting, developing, and supporting world-class talent. My role bridges data-driven decision-making with genuine human connection—ensuring every Googler thrives in a culture of innovation, inclusion, and impact.",
    },
    {
      id: 2,
      name: "John Doee",
      title: "HR at Microsoft",
      avatar: "/homePage/profile.png",
      description:
        "As part of Google's People Operations team, I help shape the future of work by attracting, developing, and supporting world-class talent. My role bridges data-driven decision-making with genuine human connection—ensuring every Googler thrives in a culture of innovation, inclusion, and impact.",
    },
  ];

  return (
    <div className="p-2 lg:p-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {SITE_CONFIG.networking.recruitersOnline.title}
        </h3>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
          {SITE_CONFIG.networking.recruitersOnline.viewAll}
        </button>
      </div>
      <div className="space-y-3">
        {recruiters.map((recruiter) => (
          <RecruiterCard key={recruiter.id} recruiter={recruiter} />
        ))}
      </div>
    </div>
  );
};

export default NetworkingRightSidebar;
