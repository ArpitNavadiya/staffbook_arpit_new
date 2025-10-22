"use client";

import React from "react";
import Link from "next/link";
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
      title: "Profile Strength",
      value: "85%",
      change: "+5%",
      trend: "up",
      icon: <FiTarget size={24} />,
      color: "from-[#8B2AE2] to-[#5B5BE7]",
    },
  ];

  const weeklyViews = [120, 145, 167, 189, 201, 178, 156];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const insights: InsightItem[] = [
    {
      title: "Add Professional Summary",
      description: "Profiles with summaries get 5x more views",
      action: "Add Summary",
      priority: "high",
    },
    {
      title: "Upload Recent Projects",
      description: "Showcase your latest work to attract recruiters",
      action: "Add Projects",
      priority: "medium",
    },
    {
      title: "Get Skill Experience",
      description: "Showcase your work experience to stand out",
      action: "Request Experience",
      priority: "medium",
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-white p-4 md:p-6 lg:p-8 mt-[50px]">
      <div className="max-w-7xl mx-auto">
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
                  Analytics
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-Montserrat text-[#5B5BE7] mb-2">
            Profile Analytics
          </h1>
          <p className="text-lg text-[#666] font-Montserrat">
            Track your profile performance and discover optimization
            opportunities
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-[#E8E4FF] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                >
                  {metric.icon}
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${
                    metric.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <FiTrendingUp
                    size={14}
                    className={metric.trend === "down" ? "rotate-180" : ""}
                  />
                  {metric.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#222] mb-1">
                {metric.value}
              </h3>
              <p className="text-[#666] font-medium">{metric.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          {/* Weekly Views Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white">
                <FiBarChart size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#222] font-Montserrat">
                Weekly Profile Views
              </h3>
            </div>
            <div className="flex items-end justify-between h-40 gap-2">
              {weeklyViews.map((views, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-[#5B5BE7] to-[#B14BE4] rounded-t-lg transition-all duration-500 hover:from-[#4A4AD6] hover:to-[#A13BD3]"
                    style={{
                      height: `${(views / Math.max(...weeklyViews)) * 100}%`,
                    }}
                  ></div>
                  <span className="text-sm text-[#666] mt-2 font-medium">
                    {days[index]}
                  </span>
                  <span className="text-xs text-[#8B2AE2] font-bold">
                    {views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Optimization Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#8B2AE2] to-[#5B5BE7] text-white">
              <FiTarget size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#222] font-Montserrat">
              Profile Optimization Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-dashed border-[#E8E4FF] hover:border-[#B14BE4]/50 transition-all duration-300 group"
              >
                <div
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-bold mb-3 ${
                    insight.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : insight.priority === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
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
  );
}
