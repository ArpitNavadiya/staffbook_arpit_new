"use client";

import React from "react";
import Link from "next/link";
import ProfileLayout from '../../../components/shared/ProfileLayout';
import {
  FiTrendingUp,
  FiEye,
  FiSearch,
  FiUsers,
  FiTarget,
  FiBarChart,
  FiActivity,
  FiAward,
  FiChevronRight,
  FiBriefcase,
} from "react-icons/fi";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

interface InsightItem {
  title: string;
  description: string;
  action: string;
  priority: "high" | "medium" | "low";
}

export default function ProfileAnalytics() {
  const metrics: MetricCard[] = [
    {
      title: "Profile Views",
      value: "1,247",
      change: "+23%",
      trend: "up",
      icon: <FiEye size={24} />,
      color: "from-[#5B5BE7] to-[#B14BE4]",
    },
    {
      title: "Search Appearances",
      value: "892",
      change: "+18%",
      trend: "up",
      icon: <FiSearch size={24} />,
      color: "from-[#B14BE4] to-[#921294]",
    },
    {
      title: "Connection Requests",
      value: "156",
      change: "+31%",
      trend: "up",
      icon: <FiUsers size={24} />,
      color: "from-[#921294] to-[#5B5BE7]",
    },
    {
      title: "Recruiter Interest",
      value: "89",
      change: "+12%",
      trend: "up",
      icon: <FiTarget size={24} />,
      color: "from-[#5B5BE7] to-[#8B2AE2]",
    },
  ];

  const weeklyViews = [120, 145, 167, 189, 201, 178, 156];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const insights: InsightItem[] = [
    {
      title: "Optimize Your Headline",
      description: "Add industry keywords to increase visibility by 40%",
      action: "Update Headline",
      priority: "high",
    },
    {
      title: "Complete Your Profile",
      description: "Add 3 more skills to rank higher in searches",
      action: "Add Skills",
      priority: "medium",
    },
    {
      title: "Engage More",
      description: "Post content to increase profile views by 25%",
      action: "Create Post",
      priority: "low",
    },
  ];

  const topKeywords = [
    { keyword: "React Developer", count: 45 },
    { keyword: "Frontend Engineer", count: 38 },
    { keyword: "JavaScript Expert", count: 32 },
    { keyword: "UI/UX Designer", count: 28 },
    { keyword: "Full Stack", count: 24 },
  ];

  return (
    <ProfileLayout
      showSidebar={true}
      showStories={false}
      showJobSearchBar={false}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-[#F3EFFF] p-4 md:p-6 -mt-[10px]">
        <div className="max-w-7xl mx-auto">
          {/* <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
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
                  Analytics
                </span>
              </li>
            </ol>
          </nav>
        </div> */}

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-3xl md:text-2xl font-bold font-Montserrat text-[#5B5BE7]">
              Profile Analytics
            </h1>
            <p className="text-lg text-[#666] font-Montserrat">
              Track your profile performance and get insights to improve
              visibility
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#E8E4FF] hover:border-[#B14BE4]/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-sm`}
                  >
                    {metric.icon}
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    } flex items-center gap-1`}
                  >
                    <FiTrendingUp size={16} />
                    {metric.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#222] mb-1">
                  {metric.value}
                </h3>
                <p className="text-sm text-[#666]">{metric.title}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Profile Views Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#E8E4FF] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#222]">
                  Profile Views Trend
                </h3>
                <div className="flex items-center gap-2">
                  <FiBarChart className="text-[#B14BE4]" size={20} />
                  <span className="text-sm text-[#666]">Last 30 days</span>
                </div>
              </div>
              <div className="h-64 bg-gradient-to-t from-[#F8F6FF] to-transparent rounded-xl flex items-end justify-center">
                <div className="text-[#666] text-center">
                  <FiActivity
                    size={48}
                    className="mx-auto mb-2 text-[#B14BE4]"
                  />
                  <p>Chart visualization would go here</p>
                </div>
              </div>
            </div>

            {/* Search Keywords */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#E8E4FF] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#222]">
                  Top Search Keywords
                </h3>
                <FiSearch className="text-[#B14BE4]" size={20} />
              </div>
              <div className="space-y-4">
                {[
                  { keyword: "React Developer", count: 234, percentage: 85 },
                  { keyword: "Frontend Engineer", count: 189, percentage: 68 },
                  { keyword: "JavaScript Expert", count: 156, percentage: 56 },
                  { keyword: "UI/UX Developer", count: 123, percentage: 44 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-[#222]">{item.keyword}</p>
                      <p className="text-sm text-[#666]">
                        {item.count} searches
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-[#F3EFFF] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-[#B14BE4]">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#E8E4FF] mb-8 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#222]">
                Industry Comparison
              </h3>
              <div className="flex items-center gap-2">
                <FiAward className="text-[#B14BE4]" size={20} />
                <span className="text-sm text-[#666]">
                  vs. Similar Profiles
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  metric: "Profile Completeness",
                  your: 85,
                  average: 67,
                  status: "above",
                },
                {
                  metric: "Weekly Views",
                  your: 156,
                  average: 89,
                  status: "above",
                },
                {
                  metric: "Connection Rate",
                  your: 23,
                  average: 31,
                  status: "below",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <h4 className="font-medium text-[#222] mb-3">
                    {item.metric}
                  </h4>
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <div className="absolute inset-0 rounded-full bg-[#F3EFFF]"></div>
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                        item.status === "above"
                          ? "from-green-400 to-green-600"
                          : "from-orange-400 to-orange-600"
                      }`}
                      style={{
                        background: `conic-gradient(${
                          item.status === "above" ? "#10B981" : "#F59E0B"
                        } ${(item.your / 100) * 360}deg, #F3EFFF 0deg)`,
                      }}
                    ></div>
                    <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                      <span className="text-lg font-bold text-[#222]">
                        {item.your}
                        {item.metric.includes("Rate") ? "%" : ""}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#666]">
                    Industry avg: {item.average}
                    {item.metric.includes("Rate") ? "%" : ""}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      item.status === "above"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {item.status === "above"
                      ? "Above Average"
                      : "Below Average"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#E8E4FF] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#222]">
                Actionable Insights
              </h3>
              <FiBriefcase className="text-[#B14BE4]" size={20} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 cursor-pointer ${
                    insight.priority === "high"
                      ? "border-red-200 bg-red-50 hover:border-red-300"
                      : insight.priority === "medium"
                      ? "border-yellow-200 bg-yellow-50 hover:border-yellow-300"
                      : "border-green-200 bg-green-50 hover:border-green-300"
                  }`}
                >
                  <div
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                      insight.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : insight.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {insight.priority.toUpperCase()} PRIORITY
                  </div>
                  <h4 className="font-bold text-[#222] mb-2 group-hover:text-[#5B5BE7] transition-colors duration-300">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-[#666] mb-4">
                    {insight.description}
                  </p>
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white text-sm font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                    {insight.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
