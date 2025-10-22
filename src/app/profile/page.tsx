import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfilePerformance from "../../components/profile/ProfilePerformance";
import ResumeUpload from "../../components/profile/ResumeUpload";
import ProfileSummary from "../../components/profile/ProfileSummary";
import BasicDetails from "../../components/profile/BasicDetails";
import ExperienceSection from "../../components/profile/ExperienceSection";
import EducationSection from "../../components/profile/EducationSection";
import ProjectsSection from "../../components/profile/ProjectsSection";
import CertificationsSection from "../../components/profile/CertificationsSection";
import PersonalInfo from "../../components/profile/PersonalInfo";
import SkillsSidebar from "@/components/profile/SkillsSidebar";
import { user } from "@/data/profile";
import ProfilePerformanceStats from "@/components/profile/ProfilePerformanceStats";

export default function Page() {
  return (
    <div className="profile-page flex flex-col lg:flex-row mt-16 gap-6 min-h-screen bg-[#f7f7fa] py-6 px-2 md:px-6">
      <div className="flex flex-col ">
        <ProfileHeader />
        {/* <ProfilePerformance /> */}
        <ProfilePerformanceStats />
        <div className="flex flex-col mt-6 md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <ResumeUpload />
            <ProfileSummary />
            <BasicDetails />
            <ExperienceSection />
            <EducationSection />
            <ProjectsSection />
            <CertificationsSection />
            <PersonalInfo />
          </div>
          {/* Optionally, you can add a right sidebar here if needed */}
        </div>
      </div>
      <div>
        <SkillsSidebar />
      </div>
    </div>
  );
}
