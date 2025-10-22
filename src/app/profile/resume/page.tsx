"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiFileText,
  FiDownload,
  FiEdit3,
  FiEye,
  FiShare2,
  FiPlus,
  FiTrash2,
  FiCopy,
  FiStar,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiBook,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";

interface ResumeVersion {
  id: string;
  name: string;
  lastModified: string;
  views: number;
  downloads: number;
  isDefault: boolean;
  template: string;
  size: string;
}

interface ResumeSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  completeness: number;
  description: string;
}

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<
    "versions" | "builder" | "analytics"
  >("versions");

  const resumeVersions: ResumeVersion[] = [
    {
      id: "1",
      name: "Software Engineer Resume",
      lastModified: "2024-01-15",
      views: 127,
      downloads: 23,
      isDefault: true,
      template: "Professional",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Frontend Developer Resume",
      lastModified: "2024-01-10",
      views: 89,
      downloads: 15,
      isDefault: false,
      template: "Modern",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Full Stack Resume",
      lastModified: "2024-01-05",
      views: 156,
      downloads: 31,
      isDefault: false,
      template: "Creative",
      size: "2.1 MB",
    },
  ];

  const resumeSections: ResumeSection[] = [
    {
      id: "1",
      title: "Personal Information",
      icon: <FiUser size={20} />,
      completeness: 100,
      description: "Contact details and basic information",
    },
    {
      id: "2",
      title: "Professional Summary",
      icon: <FiFileText size={20} />,
      completeness: 85,
      description: "Brief overview of your career and goals",
    },
    {
      id: "3",
      title: "Work Experience",
      icon: <FiBriefcase size={20} />,
      completeness: 90,
      description: "Your professional work history",
    },
    {
      id: "4",
      title: "Education",
      icon: <FiBook size={20} />,
      completeness: 100,
      description: "Academic qualifications and certifications",
    },
    {
      id: "5",
      title: "Skills & Expertise",
      icon: <FiAward size={20} />,
      completeness: 75,
      description: "Technical and soft skills",
    },
  ];

  const getCompletenessColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-white p-4 md:p-6 lg:p-8 mt-[50px]">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Breadcrumb */}
        <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <nav
            className="flex items-center text-sm font-medium"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-1">
              <li>
                <Link
                  href="/"
                  className="group flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:text-[#5B5BE7] hover:bg-gradient-to-r hover:from-[#F8F6FF] hover:to-[#F0EFFF] transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5B5BE7] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <FiChevronRight
                  className="mx-2 text-gray-400 group-hover:text-[#5B5BE7] transition-colors duration-200"
                  size={16}
                />
              </li>
              <li>
                <Link
                  href="/profile"
                  className="group flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:text-[#5B5BE7] hover:bg-gradient-to-r hover:from-[#F8F6FF] hover:to-[#F0EFFF] transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative">
                    Profile
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5B5BE7] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <FiChevronRight className="mx-2 text-gray-400" size={16} />
              </li>
              <li>
                <span className="flex items-center px-4 py-2.5 rounded-lg text-[#5B5BE7] bg-gradient-to-r from-[#F8F6FF] to-[#F0EFFF] font-semibold shadow-sm border border-[#E5E3FF]">
                  <FiBriefcase className="mr-2" size={16} />
                  Resume
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-Montserrat text-[#5B5BE7] mb-2">
            Resume Builder
          </h1>
          <p className="text-lg text-[#666] font-Montserrat">
            Create, manage, and optimize your professional resume
          </p>
        </div>

        {/* Resume Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white">
                <FiFileText size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#222]">3</h3>
                <p className="text-sm text-[#666]">Resume Versions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#B14BE4] to-[#921294] text-white">
                <FiEye size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#222]">372</h3>
                <p className="text-sm text-[#666]">Total Views</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#8B2AE2] to-[#5B5BE7] text-white">
                <FiDownload size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#222]">69</h3>
                <p className="text-sm text-[#666]">Downloads</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#921294] to-[#B14BE4] text-white">
                <FiStar size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#222]">90%</h3>
                <p className="text-sm text-[#666]">Completeness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-[#E8E4FF] mb-8">
          <div className="flex gap-2">
            {[
              {
                key: "versions",
                label: "My Resumes",
                icon: <FiFileText size={18} />,
              },
              {
                key: "builder",
                label: "Resume Builder",
                icon: <FiEdit3 size={18} />,
              },
              {
                key: "analytics",
                label: "Analytics",
                icon: <FiEye size={18} />,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white shadow-lg"
                    : "text-[#666] hover:text-[#5B5BE7] hover:bg-[#F8F6FF]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "versions" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
                My Resume Versions
              </h2>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-xl transition-all duration-300">
                <FiPlus size={18} />
                Create New Resume
              </button>
            </div>

            <div className="grid gap-6">
              {resumeVersions.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white font-bold flex items-center justify-center">
                        <FiFileText size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#222]">
                            {resume.name}
                          </h3>
                          {resume.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-[#666] mb-3">
                          <div className="flex items-center gap-1">
                            <FiCalendar size={14} />
                            Modified: {resume.lastModified}
                          </div>
                          <div className="flex items-center gap-1">
                            <FiEye size={14} />
                            {resume.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <FiDownload size={14} />
                            {resume.downloads} downloads
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="px-2 py-1 bg-[#F3EFFF] text-[#8B2AE2] font-medium rounded-lg">
                            {resume.template} Template
                          </span>
                          <span className="text-[#666]">{resume.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <button className="p-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                          <FiEye size={16} />
                        </button>
                        <button className="p-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                          <FiEdit3 size={16} />
                        </button>
                        <button className="p-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                          <FiCopy size={16} />
                        </button>
                        <button className="p-2 border border-[#E8E4FF] rounded-lg hover:border-red-400 transition-colors duration-300">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300">
                          <FiDownload size={16} />
                          Download
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                          <FiShare2 size={16} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "builder" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
                Resume Builder
              </h2>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                  Preview
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Resume Sections */}
            <div className="grid gap-6">
              {resumeSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                    <div className="flex gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white">
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#222] mb-2">
                          {section.title}
                        </h3>
                        <p className="text-[#666] mb-4">
                          {section.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-[#F3EFFF] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] rounded-full transition-all duration-500"
                              style={{ width: `${section.completeness}%` }}
                            ></div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${getCompletenessColor(section.completeness)}`}
                          >
                            {section.completeness}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300">
                      <FiEdit3 size={16} />
                      Edit Section
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
              <h3 className="text-xl font-bold text-[#222] mb-4">
                Choose Template
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Professional", "Modern", "Creative"].map((template) => (
                  <div
                    key={template}
                    className="border-2 border-[#E8E4FF] rounded-xl p-4 hover:border-[#B14BE4] transition-colors duration-300 cursor-pointer"
                  >
                    <div className="w-full h-32 bg-gradient-to-br from-[#F8F6FF] to-[#E8E4FF] rounded-lg mb-3 flex items-center justify-center">
                      <FiFileText size={32} className="text-[#8B2AE2]" />
                    </div>
                    <h4 className="font-bold text-[#222] text-center">
                      {template}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
              Resume Analytics
            </h2>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
                <h3 className="text-lg font-bold text-[#222] mb-4">
                  View Trends
                </h3>
                <div className="space-y-4">
                  {resumeVersions.map((resume) => (
                    <div
                      key={resume.id}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium text-[#222]">
                        {resume.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-[#F3EFFF] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] rounded-full"
                            style={{ width: `${(resume.views / 200) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-[#8B2AE2]">
                          {resume.views}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
                <h3 className="text-lg font-bold text-[#222] mb-4">
                  Download Performance
                </h3>
                <div className="space-y-4">
                  {resumeVersions.map((resume) => (
                    <div
                      key={resume.id}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium text-[#222]">
                        {resume.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-[#F3EFFF] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#B14BE4] to-[#921294] rounded-full"
                            style={{
                              width: `${(resume.downloads / 50) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-[#8B2AE2]">
                          {resume.downloads}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Optimization Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
              <h3 className="text-lg font-bold text-[#222] mb-4">
                Optimization Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8F6FF] rounded-xl">
                  <h4 className="font-bold text-[#222] mb-2">Add Keywords</h4>
                  <p className="text-sm text-[#666]">
                    Include industry-specific keywords to improve visibility
                  </p>
                </div>
                <div className="p-4 bg-[#F8F6FF] rounded-xl">
                  <h4 className="font-bold text-[#222] mb-2">
                    Quantify Achievements
                  </h4>
                  <p className="text-sm text-[#666]">
                    Use numbers and metrics to showcase your impact
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
