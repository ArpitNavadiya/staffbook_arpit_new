"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiTrendingUp,
  FiBookmark,
  FiEye,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiUsers,
  FiTarget,
  FiStar,
  FiExternalLink,
  FiChevronRight,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import ProfileSidebar from "@/components/shared/ProfileSidebar";


const menuItems = [
  { icon: <FiBriefcase size={18} />, label: 'My Applications', key: 'applications' },
  { icon: <FiTarget size={18} />, label: 'Recommended Jobs', key: 'recommendations' },
  { icon: <FiBookmark size={18} />, label: 'Saved Jobs', key: 'saved' },
  { icon: <FiCalendar size={18} />, label: 'Meetings', key: 'meetings' },
  { icon: <FiSearch size={18} />, label: 'Browse Jobs', key: 'browse' },
];

const inputLabels = [
  'Job Title/ Role',
  'Skills',
  'Experience',
  'Company',
  'Location',
  'Date Posted',
]; 

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  appliedDate: string;
  salary: string;
  location: string;
  logo: string;
}

interface JobRecommendation {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  logo: string;
  distance?: number; // Distance in kilometers for location-based features
}

// Add Employer/Applicant types
interface EmployerPosting {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  type: string;
  description: string;
}

interface ApplicantProfile {
  id: string;
  name: string;
  position: string;
  email: string;
  resumeId: string;
}

interface MeetingItem {
  id: string;
  candidateId: string;
  candidateName: string;
  datetime: string; // ISO datetime
  notes?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "bg-blue-100 text-blue-600";
    case "interviewing":
      return "bg-yellow-100 text-yellow-600";
    case "offered":
      return "bg-green-100 text-green-600";
    case "rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-100";
  if (score >= 80) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

export default function JobManagement() {
  const { user } = useAuth();

  // Dual-view mode: seeker vs employer
  const [mode, setMode] = useState<"seeker" | "employer">("seeker");

  // Seeker tabs (extended)
  const [activeTab, setActiveTab] = useState<
    "applications" | "recommendations" | "saved" | "meetings" | "browse"
  >("applications");

  // Location-based job discovery state
  const [locationFilter, setLocationFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("10");
  const [showMap, setShowMap] = useState(false);
  const [mapView, setMapView] = useState<"map" | "list">("map");
  const [selectedJob, setSelectedJob] = useState<JobRecommendation | null>(
    null
  );
  const [nearbyJobs, setNearbyJobs] = useState<JobRecommendation[]>([]);

  // Applications state
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "1",
      company: "TechCorp",
      position: "Senior Frontend Developer",
      status: "interviewing",
      appliedDate: "2024-01-15",
      salary: "₹12-18 LPA",
      location: "Bangalore",
      logo: "TC",
    },
    {
      id: "2",
      company: "InnovateLabs",
      position: "React Developer",
      status: "applied",
      appliedDate: "2024-01-12",
      salary: "₹8-12 LPA",
      location: "Mumbai",
      logo: "IL",
    },
    {
      id: "3",
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      status: "offered",
      appliedDate: "2024-01-08",
      salary: "₹15-20 LPA",
      location: "Hyderabad",
      logo: "SX",
    },
  ]);

  // Saved jobs
  const [savedJobs, setSavedJobs] = useState<JobRecommendation[]>([]);

  // Recommendations
  const recommendations: JobRecommendation[] = [
    {
      id: "1",
      company: "Microsoft",
      position: "Software Engineer II",
      location: "Bangalore",
      salary: "₹25-35 LPA",
      type: "Full-time",
      postedDate: "2 days ago",
      matchScore: 95,
      skills: ["React", "TypeScript", "Node.js"],
      logo: "MS",
      distance: 5.2,
    },
    {
      id: "2",
      company: "Google",
      position: "Frontend Developer",
      location: "Gurgaon",
      salary: "₹30-40 LPA",
      type: "Full-time",
      postedDate: "1 day ago",
      matchScore: 92,
      skills: ["JavaScript", "React", "CSS"],
      logo: "GO",
      distance: 12.8,
    },
    {
      id: "3",
      company: "Amazon",
      position: "UI/UX Engineer",
      location: "Bangalore",
      salary: "₹20-28 LPA",
      type: "Full-time",
      postedDate: "3 days ago",
      matchScore: 88,
      skills: ["React", "Design Systems", "Figma"],
      logo: "AM",
      distance: 8.1,
    },
  ];

  // Location-based job search functionality
  const handleLocationSearch = () => {
    // Simulate location-based job search
    const mockNearbyJobs: JobRecommendation[] = [
      {
        id: "nearby1",
        company: "TechStart",
        position: "React Developer",
        location: "Koramangala, Bangalore",
        salary: "₹15-22 LPA",
        type: "Full-time",
        postedDate: "1 day ago",
        matchScore: 89,
        skills: ["React", "JavaScript", "CSS"],
        logo: "TS",
        distance: 2.3,
      },
      {
        id: "nearby2",
        company: "InnovateCorp",
        position: "Frontend Engineer",
        location: "Whitefield, Bangalore",
        salary: "₹18-25 LPA",
        type: "Full-time",
        postedDate: "3 days ago",
        matchScore: 85,
        skills: ["Vue.js", "TypeScript", "SCSS"],
        logo: "IC",
        distance: 7.5,
      },
      {
        id: "nearby3",
        company: "StartupHub",
        position: "Full Stack Developer",
        location: "Electronic City, Bangalore",
        salary: "₹12-18 LPA",
        type: "Full-time",
        postedDate: "2 days ago",
        matchScore: 82,
        skills: ["React", "Node.js", "MongoDB"],
        logo: "SH",
        distance: 4.8,
      },
      {
        id: "nearby4",
        company: "DevCorp",
        position: "UI Developer",
        location: "HSR Layout, Bangalore",
        salary: "₹14-20 LPA",
        type: "Full-time",
        postedDate: "4 days ago",
        matchScore: 87,
        skills: ["React", "Tailwind", "Figma"],
        logo: "DC",
        distance: 3.2,
      },
      {
        id: "nearby5",
        company: "TechSolutions",
        position: "Frontend Specialist",
        location: "Indiranagar, Bangalore",
        salary: "₹16-24 LPA",
        type: "Full-time",
        postedDate: "1 day ago",
        matchScore: 91,
        skills: ["React", "Redux", "GraphQL"],
        logo: "TS",
        distance: 6.1,
      },
    ];

    // Filter by distance
    const filteredJobs = mockNearbyJobs.filter(
      (job) => job.distance! <= parseInt(distanceFilter)
    );

    // Sort by distance
    const sortedJobs = filteredJobs.sort((a, b) => a.distance! - b.distance!);

    setNearbyJobs(sortedJobs);
    setShowMap(true);
  };

  const applyFromRecommendation = (job: JobRecommendation) => {
    // Simulate applying to a job from recommendations
    const newApplication: JobApplication = {
      id: `app_${Date.now()}`,
      company: job.company,
      position: job.position,
      status: "applied",
      appliedDate: new Date().toISOString().split("T")[0],
      salary: job.salary,
      location: job.location,
      logo: job.logo,
    };

    setApplications((prev) => [newApplication, ...prev]);
    setSelectedJob(null);

    // Show success message (you can implement a toast notification here)
    alert(`Successfully applied to ${job.position} at ${job.company}!`);
  };

  // Employer: job postings
  const [postings, setPostings] = useState<EmployerPosting[]>([
    {
      id: "p1",
      company: "TechCorp",
      position: "Frontend Developer",
      location: "Remote",
      salary: "₹10-15 LPA",
      type: "Full-time",
      description: "React/TypeScript developer to build UI components.",
    },
    {
      id: "p2",
      company: "InnovateLabs",
      position: "UI/UX Engineer",
      location: "Bangalore",
      salary: "₹12-18 LPA",
      type: "Contract",
      description: "Design systems and component libraries.",
    },
  ]);

  const [newPosting, setNewPosting] = useState<EmployerPosting>({
    id: "",
    company: "",
    position: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
  });
  const [editingPostingIndex, setEditingPostingIndex] = useState<number | null>(
    null
  );

  const handleSavePosting = () => {
    if (!newPosting.company || !newPosting.position) return;
    if (editingPostingIndex !== null) {
      const next = postings.slice();
      next[editingPostingIndex] = {
        ...newPosting,
        id: next[editingPostingIndex].id,
      };
      setPostings(next);
      setEditingPostingIndex(null);
    } else {
      const id = "p" + (postings.length + 1);
      setPostings([...postings, { ...newPosting, id }]);
    }
    setNewPosting({
      id: "",
      company: "",
      position: "",
      location: "",
      salary: "",
      type: "Full-time",
      description: "",
    });
  };

  const handleEditPosting = (idx: number) => {
    setEditingPostingIndex(idx);
    setNewPosting(postings[idx]);
  };

  const handleDeletePosting = (idx: number) => {
    const next = postings.slice();
    next.splice(idx, 1);
    setPostings(next);
    if (editingPostingIndex === idx) {
      setEditingPostingIndex(null);
      setNewPosting({
        id: "",
        company: "",
        position: "",
        location: "",
        salary: "",
        type: "Full-time",
        description: "",
      });
    }
  };

  // Employer: applicants & meetings
  const [applicants] = useState<ApplicantProfile[]>([
    {
      id: "c1",
      name: "Riya Gopi",
      position: "Frontend Developer",
      email: "riya@example.com",
      resumeId: "c1-resume",
    },
    {
      id: "c2",
      name: "Arun Verma",
      position: "Full Stack Engineer",
      email: "arun@example.com",
      resumeId: "c2-resume",
    },
    {
      id: "c3",
      name: "Neha Shah",
      position: "UI/UX Engineer",
      email: "neha@example.com",
      resumeId: "c3-resume",
    },
  ]);

  const [meetings, setMeetings] = useState<MeetingItem[]>([
    {
      id: "m1",
      candidateId: "c1",
      candidateName: "Riya Gopi",
      datetime: new Date().toISOString(),
      notes: "Initial screening",
    },
  ]);

  const [scheduleForm, setScheduleForm] = useState<{
    candidateId: string;
    datetime: string;
    notes: string;
  }>({ candidateId: "", datetime: "", notes: "" });
  const handleSchedule = () => {
    if (!scheduleForm.candidateId || !scheduleForm.datetime) return;
    const candidate = applicants.find((a) => a.id === scheduleForm.candidateId);
    if (!candidate) return;
    const m: MeetingItem = {
      id: "m" + (meetings.length + 1),
      candidateId: candidate.id,
      candidateName: candidate.name,
      datetime: scheduleForm.datetime,
      notes: scheduleForm.notes,
    };
    setMeetings([...meetings, m]);
    setScheduleForm({ candidateId: "", datetime: "", notes: "" });
  };

  // Secure resume download
  const handleDownloadResume = async (
    resumeId: string,
    candidateName: string
  ) => {
    try {
      const res = await fetch(`/api/resume/${encodeURIComponent(resumeId)}`, {
        headers: { "x-user-email": user?.email ?? "" },
      });
      if (!res.ok) {
        alert("Unauthorized or file not found");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${candidateName}-resume.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to download resume");
    }
  };

  // Seeker actions
  const applyToPosting = (posting: EmployerPosting) => {
    const newApp: JobApplication = {
      id: "a" + (applications.length + 1),
      company: posting.company,
      position: posting.position,
      status: "applied",
      appliedDate: new Date().toISOString().slice(0, 10),
      salary: posting.salary,
      location: posting.location,
      logo: posting.company.slice(0, 2).toUpperCase(),
    };
    setApplications([newApp, ...applications]);
    setActiveTab("applications");
  };
  const saveJob = (job: JobRecommendation) => {
    setSavedJobs((prev) =>
      prev.find((j) => j.id === job.id) ? prev : [job, ...prev]
    );
  };

  const removeSavedJob = (id: string) =>
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));

  // Seeker meetings management
  const [seekerMeetings, setSeekerMeetings] = useState<
    { id: string; datetime: string; with: string; notes?: string }[]
  >([
    {
      id: "sm1",
      datetime: new Date().toISOString(),
      with: "TechCorp HR",
      notes: "Portfolio discussion",
    },
  ]);
  const [seekerMeetingForm, setSeekerMeetingForm] = useState<{
    datetime: string;
    with: string;
    notes: string;
  }>({ datetime: "", with: "", notes: "" });
  const addSeekerMeeting = () => {
    if (!seekerMeetingForm.datetime || !seekerMeetingForm.with) return;
    const m = { id: "sm" + (seekerMeetings.length + 1), ...seekerMeetingForm };
    setSeekerMeetings([...seekerMeetings, m]);
    setSeekerMeetingForm({ datetime: "", with: "", notes: "" });
  };

  return (
    <div className="profile-page min-h-screen bg-gradient-to-br from-[#F8F6FF] to-white pt-4 md:pt-6 lg:pt-8 mt-[50px]">
      <div className="flex gap-6 w-full">
        <div className="w-[20%] flex-shrink-0 -mt-[50px]">
          <ProfileSidebar />
        </div>
        <div className="w-[80%] flex-1 m-4">
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
                  Jobs
                </span>
              </li>
            </ol>
          </nav>
        </div> */}

        {/* Dual view toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2 bg-white border border-[#E8E4FF] rounded-2xl p-2 shadow-sm">
            {["seeker", "employer"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as "seeker" | "employer")}
                className={`px-5 py-2 rounded-xl font-medium transition-all ${
                  mode === m
                    ? "bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white shadow-lg"
                    : "text-[#666] hover:text-[#5B5BE7] hover:bg-[#F8F6FF]"
                }`}
              >
                {m === "seeker" ? "Job Seeking Mode" : "Employer Mode"}
              </button>
            ))}
          </div>
        </div>

        {mode === "employer" ? (
          <div className="space-y-8">
            {/* Employer: Post Job */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
              <h2 className="text-2xl font-bold text-[#222] mb-4">
                Post a Job
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border rounded-lg p-3 text-[#222]"
                  placeholder="Company"
                  value={newPosting.company}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, company: e.target.value }))
                  }
                />
                <input
                  className="border rounded-lg p-3 text-[#222]"
                  placeholder="Position"
                  value={newPosting.position}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, position: e.target.value }))
                  }
                />
                <input
                  className="border rounded-lg p-3 text-[#222]"
                  placeholder="Location"
                  value={newPosting.location}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, location: e.target.value }))
                  }
                />
                <input
                  className="border rounded-lg p-3 text-[#222]"
                  placeholder="Salary"
                  value={newPosting.salary}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, salary: e.target.value }))
                  }
                />
                <select
                  className="border rounded-lg p-3 text-[#222]"
                  value={newPosting.type}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, type: e.target.value }))
                  }
                >
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
                <textarea
                  className="md:col-span-2 border rounded-lg p-3 text-[#222]"
                  placeholder="Description"
                  value={newPosting.description}
                  onChange={(e) =>
                    setNewPosting((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleSavePosting}
                  className="px-6 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white rounded-lg font-bold"
                >
                  {editingPostingIndex !== null ? "Update Job" : "Create Job"}
                </button>
                {editingPostingIndex !== null && (
                  <button
                    onClick={() => {
                      setEditingPostingIndex(null);
                      setNewPosting({
                        id: "",
                        company: "",
                        position: "",
                        location: "",
                        salary: "",
                        type: "Full-time",
                        description: "",
                      });
                    }}
                    className="px-6 py-2 border border-[#E8E4FF] rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Employer: Manage Listings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
              <h2 className="text-2xl font-bold text-[#222] mb-4">
                Manage Listings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {postings.map((p, idx) => (
                  <div
                    key={p.id}
                    className="border border-[#E8E4FF] rounded-2xl p-4 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-[#222]">
                          {p.position}
                        </h3>
                        <p className="text-sm text-[#666]">
                          {p.company} • {p.location} • {p.type}
                        </p>
                        <p className="text-sm text-[#666]">
                          Salary: {p.salary}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white border rounded-lg"
                          onClick={() => handleEditPosting(idx)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-[#FF4D4D] text-white border rounded-lg"
                          onClick={() => handleDeletePosting(idx)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[#444]">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Employer: Applicants */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
              <h2 className="text-2xl font-bold text-[#222] mb-4">
                Applicants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {applicants.map((a) => (
                  <div
                    key={a.id}
                    className="border border-[#E8E4FF] rounded-2xl p-4"
                  >
                    <h3 className="text-lg font-bold text-[#222]">{a.name}</h3>
                    <p className="text-sm text-[#666]">
                      Applied for: {a.position}
                    </p>
                    <p className="text-sm text-[#666]">Email: {a.email}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white rounded-lg"
                        onClick={() => handleDownloadResume(a.resumeId, a.name)}
                      >
                        Download Resume
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employer: Schedule meetings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
              <h2 className="text-2xl font-bold text-[#222] mb-4">
                Schedule Meeting
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className="border rounded-lg p-3 text-[#222]"
                  value={scheduleForm.candidateId}
                  onChange={(e) =>
                    setScheduleForm((s) => ({
                      ...s,
                      candidateId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Candidate</option>
                  {applicants.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <input
                  type="datetime-local"
                  className="border rounded-lg p-3 text-[#222]"
                  value={scheduleForm.datetime}
                  onChange={(e) =>
                    setScheduleForm((s) => ({ ...s, datetime: e.target.value }))
                  }
                />
                <input
                  className="border rounded-lg p-3 text-[#222]"
                  placeholder="Notes (optional)"
                  value={scheduleForm.notes}
                  onChange={(e) =>
                    setScheduleForm((s) => ({ ...s, notes: e.target.value }))
                  }
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSchedule}
                  className="px-6 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white rounded-lg font-bold"
                >
                  Add Meeting
                </button>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2 text-[#222]">
                  Upcoming Meetings
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4 text-[#222]">Candidate</th>
                        <th className="py-2 pr-4 text-[#222]">Date & Time</th>
                        <th className="py-2 pr-4 text-[#222]">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meetings.map((m) => (
                        <tr key={m.id} className="border-t">
                          <td className="py-2 pr-4 text-[#222]">
                            {m.candidateName}
                          </td>
                          <td className="py-2 pr-4 text-[#222]">
                            {new Date(m.datetime).toLocaleString()}
                          </td>
                          <td className="py-2 pr-4 text-[#222]">{m.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* <JobSearchBar bgColor="#FCFAFF" className="mb-12" /> */}
            <section
              className={`w-full  bg-[#F7F7F8] py-6 md:py-2 relative hidden md:block mb-4`}
            >
              <div className="w-full max-w-[95%] mx-auto relative px-2 md:px-0">
                {/* Floating Menu */}

                <div className="absolute top-[-46px] left-1/2 -translate-x-1/2 w-full max-w-[95%] h-[93px] bg-gradient-to-r from-[#5b5be7] to-[#b14be4] rounded-full shadow-lg flex items-center justify-around px-2 md:px-8 z-10 overflow-x-auto gap-2 md:gap-0">
                  {menuItems.map((item, index) => {
                    return (
                      <div
                        key={item.key}
                        onClick={() => setActiveTab(item.key as any)}
                        className={`flex flex-col items-center text-white text-xs md:text-sm min-w-[50px] cursor-pointer ${
                          activeTab === item.key ? 'bg-[#E8E4FF] text-[#605BE7] p-2 rounded-[10px]' : ''
                        }`}
                      >
                        <span className={`block w-6 h-6 ${
                          activeTab === item.key ? 'text-[#605BE7]' : ''
                        }`}>
                          {item.icon}
                        </span>
                        <span className={`mt-1 whitespace-nowrap ${
                          activeTab === item.key ? 'font-bold text-[#605BE7]' : ''
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Main Input Box */}
                <div className="mt-[70px] h-[190px]  bg-white rounded-[20px] overflow-hidden border border-gray-200 flex flex-col">
                  {/* Top Row (Labels) */}
                  <div className="grid grid-cols-6 bg-[#F0E5FD] h-[50%]">
                    {inputLabels.map((label, index) => (
                      <div
                        key={index}
                        className="flex items-end justify-center px-2 pb-2  text-xs md:text-lg font-semibold text-[#a259e6]"
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Row (Inputs) */}
                  <div className="grid grid-cols-6 h-[50%] bg-white">
                    {inputLabels.map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center px-3 border-r last:border-r-0"
                      >
                        <input
                          type="text"
                          placeholder="Enter preferred Role"
                          className="w-full text-[13px] text-gray-700  px-3 py-2 outline-none focus:ring-2 focus:ring-[#a259e6]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* Job Management Hub Box - Homepage Consistent Design */}
            {/* <div className="mb-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5B5BE7] to-[#921294] opacity-10 rounded-bl-full"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5B5BE7] to-[#921294] text-white shadow-lg">
                    <FiBriefcase size={28} />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-Montserrat text-[#2d1e5f] mb-1">
                      Job Management Hub
                    </h1>
                    <p className="text-lg text-[#5e4a8b] font-Montserrat">
                      Track applications, discover opportunities, and manage
                      your career journey
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7]/10 to-[#921294]/10 rounded-full">
                    <FiTarget className="text-[#5B5BE7]" size={16} />
                    <span className="text-sm font-medium text-[#2d1e5f]">
                      12 Active Applications
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7]/10 to-[#921294]/10 rounded-full">
                    <FiStar className="text-[#921294]" size={16} />
                    <span className="text-sm font-medium text-[#2d1e5f]">
                      3 Interviews Scheduled
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7]/10 to-[#921294]/10 rounded-full">
                    <FiTrendingUp className="text-[#5B5BE7]" size={16} />
                    <span className="text-sm font-medium text-[#2d1e5f]">
                      85% Profile Match
                    </span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Stats Cards */}
            <div>
              <h2 className="text-2xl font-bold text-[#222] font-Montserrat mb-8">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white">
                      <FiBriefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">12</h3>
                      <p className="text-sm text-[#666]">Applications</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#B14BE4] to-[#921294] text-white">
                      <FiEye size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">3</h3>
                      <p className="text-sm text-[#666]">Interviews</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#8B2AE2] to-[#5B5BE7] text-white">
                      <FiBookmark size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">8</h3>
                      <p className="text-sm text-[#666]">Saved Jobs</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#921294] to-[#B14BE4] text-white">
                      <FiTrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">92%</h3>
                      <p className="text-sm text-[#666]">Match Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            {/* <div className="bg-white rounded-2xl p-2 md:p-0 mx-0 px-0 shadow-sm border border-[#E8E4FF] mb-8 w-full overflow-hidden">
              <div className="hidden md:grid md:grid-cols-5 md:gap-2">
                {menuItems.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
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

              <div className="md:hidden overflow-x-auto">
                <div className="flex gap-2 min-w-max px-2 py-2">
                  {[
                    {
                      key: "applications",
                      label: "My Applications",
                      icon: <FiBriefcase size={18} />,
                    },
                    {
                      key: "recommendations",
                      label: "Recommended Jobs",
                      icon: <FiTarget size={18} />,
                    },
                    {
                      key: "saved",
                      label: "Saved Jobs",
                      icon: <FiBookmark size={18} />,
                    },
                    {
                      key: "meetings",
                      label: "Meetings",
                      icon: <FiCalendar size={18} />,
                    },
                    {
                      key: "browse",
                      label: "Browse Jobs",
                      icon: <FiSearch size={18} />,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
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
            </div> */}

            {/* Content based on active tab */}
            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
                    My Applications
                  </h2>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-[#5D5BE7] border-[1px] border-[#5D5BE7] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                      <FiFilter className="text-[#5D5BE7]" size={16} />
                      Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-[#5D5BE7] border-[1px] border-[#5D5BE7] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                      <FiSearch className="text-[#5D5BE7]" size={16} />
                      Search
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white font-bold flex items-center justify-center">
                            {app.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-[#222] mb-1 truncate">
                              {app.position}
                            </h3>
                            <p className="text-[#666] font-medium truncate">
                              {app.company}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-[#666]">
                          <div className="flex items-center gap-1">
                            <FiMapPin size={14} />
                            <span className="truncate">{app.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiDollarSign size={14} />
                            <span>{app.salary}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiCalendar size={14} />
                            <span>Applied {app.appliedDate}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-auto">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold text-center ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status.charAt(0).toUpperCase() +
                              app.status.slice(1)}
                          </span>
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white text-sm font-bold rounded-lg transition-all duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "recommendations" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
                    Recommended for You
                  </h2>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] border border-[#E8E4FF] rounded-lg hover:border-[#B14BE4] transition-colors duration-300">
                      <FiFilter size={16} />
                      Preferences
                    </button>
                  </div>
                </div>

                {/* Location-based Job Discovery Controls */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Location Controls */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-lg font-bold text-[#222] mb-4">
                        Discover Jobs Near You
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#666] mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <FiMapPin
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666]"
                              size={16}
                            />
                            <input
                              type="text"
                              placeholder="Enter city or address"
                              className="w-full pl-10 pr-4 py-2 text-[#2d1e5f] font-medium outline-none border border-[#E8E4FF] rounded-lg focus:outline-none focus:border-[#5B5BE7] transition-colors"
                              value={locationFilter}
                              onChange={(e) =>
                                setLocationFilter(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#666] mb-2">
                            Distance
                          </label>
                          <select
                            className="w-full px-4 py-2 text-[#2d1e5f] font-medium outline-none border border-[#E8E4FF] rounded-lg focus:outline-none focus:border-[#5B5BE7] transition-colors"
                            value={distanceFilter}
                            onChange={(e) => setDistanceFilter(e.target.value)}
                          >
                            <option value="5">Within 5 km</option>
                            <option value="10">Within 10 km</option>
                            <option value="25">Within 25 km</option>
                            <option value="50">Within 50 km</option>
                            <option value="100">Within 100 km</option>
                          </select>
                        </div>
                        <div className="flex items-end gap-2">
                          <button
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300"
                            onClick={handleLocationSearch}
                          >
                            <FiSearch size={16} className="inline mr-2" />
                            Search
                          </button>
                          <button
                            className={`px-4 py-2 border border-[#E8E4FF] rounded-lg transition-colors duration-300 ${
                              showMap
                                ? "bg-[#5B5BE7] text-white border-[#5B5BE7]"
                                : "bg-white text-[#5B5BE7] hover:border-[#B14BE4]"
                            }`}
                            onClick={() => setShowMap(!showMap)}
                          >
                            <FiMapPin size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map View */}
                {showMap && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF]">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-[#222]">
                        Jobs Near You
                      </h3>
                      <div className="flex gap-2">
                        <button
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            mapView === "list"
                              ? "bg-[#5B5BE7] text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setMapView("list")}
                        >
                          List
                        </button>
                        <button
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            mapView === "map"
                              ? "bg-[#5B5BE7] text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setMapView("map")}
                        >
                          Map
                        </button>
                      </div>
                    </div>

                    {mapView === "map" ? (
                      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden">
                        {/* Interactive Map Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <FiMapPin
                              size={48}
                              className="text-[#5B5BE7] mx-auto mb-4"
                            />
                            <h4 className="text-lg font-bold text-[#222] mb-2">
                              Interactive Map View
                            </h4>
                            <p className="text-[#666]">
                              Visualize nearby job opportunities
                            </p>
                          </div>
                        </div>

                        {/* Map Markers for Jobs */}
                        {nearbyJobs.map((job, index) => (
                          <div
                            key={job.id}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{
                              left: `${20 + ((index * 15) % 60)}%`,
                              top: `${30 + ((index * 10) % 40)}%`,
                            }}
                            onClick={() => setSelectedJob(job)}
                          >
                            <div className="w-8 h-8 bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 transition-transform">
                              {index + 1}
                            </div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {job.position} at {job.company}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Selected Job Info Panel */}
                        {selectedJob && (
                          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg border border-[#E8E4FF]">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-bold text-[#222]">
                                  {selectedJob.position}
                                </h4>
                                <p className="text-sm text-[#666]">
                                  {selectedJob.company} • {selectedJob.location}
                                </p>
                                <p className="text-sm text-[#666]">
                                  {selectedJob.salary} • {selectedJob.distance}
                                  km away
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className="px-3 py-1 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white text-sm rounded-lg hover:from-[#4A4AD6] hover:to-[#A13BD3] transition-all"
                                  onClick={() =>
                                    applyFromRecommendation(selectedJob)
                                  }
                                >
                                  Apply
                                </button>
                                <button
                                  className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                  onClick={() => setSelectedJob(null)}
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {nearbyJobs.map((job) => (
                          <div
                            key={job.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setSelectedJob(job)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] rounded-lg flex items-center justify-center text-white font-bold">
                                {job.logo}
                              </div>
                              <div>
                                <h4 className="font-bold text-[#222]">
                                  {job.position}
                                </h4>
                                <p className="text-sm text-[#666]">
                                  {job.company} • {job.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-[#222]">
                                {job.distance}km away
                              </p>
                              <p className="text-xs text-[#666]">
                                {job.salary}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white font-bold flex items-center justify-center">
                            {job.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-[#222] mb-1 truncate">
                              {job.position}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${getMatchScoreColor(
                                job.matchScore
                              )}`}
                            >
                              {job.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[#666] font-medium truncate">
                            {job.company}
                          </p>
                          <div className="space-y-1 text-sm text-[#666]">
                            <div className="flex items-center gap-1">
                              <FiMapPin size={14} />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiDollarSign size={14} />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiClock size={14} />
                              <span>{job.postedDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#F3EFFF] text-[#8B2AE2] text-xs font-medium rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 mt-auto">
                          <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#E8E4FF] text-[#5B5BE7] rounded-lg hover:border-[#B14BE4] transition-colors duration-300"
                            onClick={() => saveJob(job)}
                          >
                            <FiBookmark size={16} />
                            Save
                          </button>
                          <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300"
                            onClick={() => applyFromRecommendation(job)}
                          >
                            <FiExternalLink size={16} />
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white flex items-center justify-center">
                  <FiBookmark size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#222] mb-2">
                  No Saved Jobs Yet
                </h3>
                <p className="text-[#666] mb-6">
                  Start saving jobs you're interested in to view them here
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300">
                  Browse Jobs
                </button>
              </div>
            )}

            {activeTab === "browse" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
                    Browse Jobs
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {postings.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4FF] hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4 h-full">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#222] mb-2 truncate">
                            {p.position}
                          </h3>
                          <p className="text-sm text-[#666] mb-1 truncate">
                            {p.company} • {p.location}
                          </p>
                          <p className="text-sm text-[#666] mb-3">
                            Salary: {p.salary} • {p.type}
                          </p>
                          <p className="text-sm text-[#444] line-clamp-3">
                            {p.description}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <button
                            className="w-full px-4 py-2 bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300"
                            onClick={() => applyToPosting(p)}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}
