"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiBell,
  FiMail,
  FiUsers,
  FiBriefcase,
  FiStar,
  FiHeart,
  FiMessageCircle,
  FiUserPlus,
  FiTrendingUp,
  FiSettings,
  FiCheck,
  FiX,
  FiMoreHorizontal,
  FiClock,
  FiFilter,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";

interface Notification {
  id: string;
  type: "job" | "network" | "message" | "achievement" | "system";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  isImportant: boolean;
  actionRequired?: boolean;
  avatar?: string;
  company?: string;
}

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread" | "important" | "job" | "network"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "job",
      title: "New Job Match Found",
      description:
        "Senior React Developer at Microsoft matches your profile 95%",
      time: "2 minutes ago",
      isRead: false,
      isImportant: true,
      actionRequired: true,
      company: "Microsoft",
    },
    {
      id: "2",
      type: "network",
      title: "Connection Request",
      description: "Sarah Johnson wants to connect with you",
      time: "15 minutes ago",
      isRead: false,
      isImportant: false,
      actionRequired: true,
      avatar: "SJ",
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      description:
        "Recruiter from Google sent you a message about Frontend Developer position",
      time: "1 hour ago",
      isRead: false,
      isImportant: true,
      company: "Google",
    },
    {
      id: "4",
      type: "achievement",
      title: "Profile Milestone",
      description: "Your profile has been viewed 100+ times this week!",
      time: "2 hours ago",
      isRead: true,
      isImportant: false,
    },
    {
      id: "5",
      type: "job",
      title: "Application Update",
      description:
        "Your application for Full Stack Developer at Amazon is under review",
      time: "4 hours ago",
      isRead: true,
      isImportant: false,
      company: "Amazon",
    },
    {
      id: "6",
      type: "network",
      title: "Profile View",
      description: "Tech Lead at Flipkart viewed your profile",
      time: "6 hours ago",
      isRead: true,
      isImportant: false,
      company: "Flipkart",
    },
    {
      id: "7",
      type: "system",
      title: "Weekly Summary",
      description: "Your weekly activity report is ready to view",
      time: "1 day ago",
      isRead: true,
      isImportant: false,
    },
    {
      id: "8",
      type: "job",
      title: "Salary Insights",
      description:
        "New salary data available for React Developers in Bangalore",
      time: "2 days ago",
      isRead: true,
      isImportant: false,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job":
        return <FiBriefcase size={20} className="text-blue-600" />;
      case "network":
        return <FiUsers size={20} className="text-green-600" />;
      case "message":
        return <FiMail size={20} className="text-purple-600" />;
      case "achievement":
        return <FiStar size={20} className="text-yellow-600" />;
      case "system":
        return <FiBell size={20} className="text-gray-600" />;
      default:
        return <FiBell size={20} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-600";
      case "network":
        return "bg-green-100 text-green-600";
      case "message":
        return "bg-purple-100 text-purple-600";
      case "achievement":
        return "bg-yellow-100 text-yellow-600";
      case "system":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "unread" && !notif.isRead) ||
      (activeFilter === "important" && notif.isImportant) ||
      (activeFilter === "job" && notif.type === "job") ||
      (activeFilter === "network" && notif.type === "network");

    const matchesSearch =
      searchQuery === "" ||
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const importantCount = notifications.filter(
    (n) => n.isImportant && !n.isRead,
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-white p-4 md:p-6 lg:p-8 mt-[50px]">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Breadcrumb */}
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
                  Resume
                </span>
              </li>
            </ol>
          </nav>
        </div> */}
        {/* Header */}
        <div className="mb-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-Montserrat text-[#5B5BE7] mb-2">
                Notifications
              </h1>
              <p className="text-lg text-[#666] font-Montserrat">
                Stay updated with your professional activities
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300"
              >
                Mark All Read
              </button>
              <button className="p-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                <FiSettings size={20} className="text-[#666]" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E4FF]">
            <div className="flex items-center gap-2 mb-2">
              <FiBell size={16} className="text-[#5B5BE7]" />
              <span className="text-sm text-[#666]">Total</span>
            </div>
            <div className="text-2xl font-bold text-[#222]">
              {notifications.length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E4FF]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-[#666]">Unread</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E4FF]">
            <div className="flex items-center gap-2 mb-2">
              <FiStar size={16} className="text-yellow-500" />
              <span className="text-sm text-[#666]">Important</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {importantCount}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E4FF]">
            <div className="flex items-center gap-2 mb-2">
              <FiClock size={16} className="text-green-500" />
              <span className="text-sm text-[#666]">Today</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {
                notifications.filter(
                  (n) => n.time.includes("hour") || n.time.includes("minute"),
                ).length
              }
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]"
              />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#E8E4FF] rounded-xl focus:outline-none focus:border-[#B14BE4] transition-colors duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
              {[
                { key: "all", label: "All", icon: <FiBell size={16} /> },
                {
                  key: "unread",
                  label: "Unread",
                  icon: <div className="w-2 h-2 rounded-full bg-red-500"></div>,
                },
                {
                  key: "important",
                  label: "Important",
                  icon: <FiStar size={16} />,
                },
                { key: "job", label: "Jobs", icon: <FiBriefcase size={16} /> },
                {
                  key: "network",
                  label: "Network",
                  icon: <FiUsers size={16} />,
                },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white"
                      : "bg-[#F8F6FF] text-[#666] hover:text-[#5B5BE7]"
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E8E4FF] text-center">
              <FiBell size={48} className="mx-auto text-[#CCC] mb-4" />
              <h3 className="text-xl font-bold text-[#666] mb-2">
                No notifications found
              </h3>
              <p className="text-[#999]">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 hover:shadow-lg ${
                  notification.isRead
                    ? "border-[#E8E4FF]"
                    : "border-[#B14BE4] bg-gradient-to-r from-[#FEFEFF] to-[#F8F6FF]"
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon/Avatar */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white font-bold flex items-center justify-center">
                        {notification.avatar}
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#F8F6FF] flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className={`font-bold ${notification.isRead ? "text-[#666]" : "text-[#222]"}`}
                        >
                          {notification.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(notification.type)}`}
                        >
                          {notification.type.toUpperCase()}
                        </span>
                        {notification.isImportant && (
                          <FiStar
                            size={14}
                            className="text-yellow-500 fill-current"
                          />
                        )}
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-[#B14BE4]"></div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#999] whitespace-nowrap">
                          {notification.time}
                        </span>
                        <div className="flex gap-1">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-[#F8F6FF] rounded transition-colors duration-300"
                              title="Mark as read"
                            >
                              <FiCheck size={16} className="text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-[#FFF0F0] rounded transition-colors duration-300"
                            title="Delete"
                          >
                            <FiX size={16} className="text-red-600" />
                          </button>
                          <button className="p-1 hover:bg-[#F8F6FF] rounded transition-colors duration-300">
                            <FiMoreHorizontal
                              size={16}
                              className="text-[#666]"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`mb-3 ${notification.isRead ? "text-[#999]" : "text-[#666]"}`}
                    >
                      {notification.description}
                    </p>

                    {notification.company && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white text-xs font-bold flex items-center justify-center">
                          {notification.company.substring(0, 1)}
                        </div>
                        <span className="text-sm text-[#8B2AE2] font-medium">
                          {notification.company}
                        </span>
                      </div>
                    )}

                    {notification.actionRequired && (
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300">
                          {notification.type === "network"
                            ? "Accept"
                            : "View Details"}
                        </button>
                        {notification.type === "network" && (
                          <button className="px-4 py-2 border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                            Decline
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 border border-[#E8E4FF] rounded-xl hover:border-[#B14BE4] hover:bg-[#F8F6FF] transition-all duration-300">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
