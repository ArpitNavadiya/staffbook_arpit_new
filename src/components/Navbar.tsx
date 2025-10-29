"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { LOGGED_IN_LINKS, SITE_CONFIG } from "../constants/siteconfig";
import GradientButton from "./shared/GradientButton";
import { useAuth } from "../context/AuthContext";
import { FiBell, FiMessageSquare, FiCalendar } from "react-icons/fi";
import ProfileAvatar from "./shared/ProfileAvatar";
import { usePathname, useRouter } from "next/navigation";
import NotificationsModal from "./shared/NotificationsModal";
import { profileCompletion } from "../data/profile";

const Navbar = () => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const navLinks = SITE_CONFIG.navbar.navLinks;
  const signUpText = SITE_CONFIG.navbar.signUp;
  const { user, isSidebarOpen, setIsSidebarOpen } = useAuth();
  const router = useRouter();

  // Get profile completion percentage
  const completionPercentage = profileCompletion.percent;

  return (
    <div className="w-full h-[70px] bg-white shadow-sm fixed top-0 z-50 overflow-x-hidden">
      <div className="w-full max-w-[1360px] mx-auto h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex flex-row gap-2">
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="relative bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Toggle sidebar"
              style={{
                background: `conic-gradient(from 0deg, #5B5DE6 0deg ${
                  (completionPercentage / 100) * 360
                }deg, #e5e7eb ${(completionPercentage / 100) * 360}deg 360deg)`,
                padding: "2px",
                borderRadius: "50%",
              }}
            >
              <div className="rounded-full overflow-hidden h-10 w-10 bg-white flex items-center justify-center">
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
          {/* Logo Section */}
          <div className="w-[180px] h-[70px] flex items-center">
            <Image
              src="/logo.png"
              alt="Staff Book"
              width={140}
              height={50}
              priority
            />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="People, Post & Jobs"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[10px] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#5B5DE6] focus:border-[#5B5DE6] text-sm"
            />
          </div>
        </div>
        {/* Desktop Menu */}
        {user ? (
          <nav className="hidden lg:flex items-center gap-8">
            {LOGGED_IN_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[#18192B] text-[16px] font-medium font-sans px-4 py-2 rounded-full ${
                  link.href === path
                    ? "bg-[#F3EFFF] text-[#18192B]"
                    : "hover:text-primary transition-colors"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <NavbarIconButton
              onNotificationsClick={() => setNotificationsOpen(true)}
              bellButtonRef={bellButtonRef}
            />
            <ProfileAvatar name={user.name} />
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#18192B] text-[16px] font-medium font-sans px-4 py-2 rounded-full hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link key={"signup"} href={"/signup"}>
              <GradientButton className="w-[110px] h-[42px] ml-4 text-[16px] font-poppins">
                {signUpText}
              </GradientButton>
            </Link>
          </nav>
        )}
        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX size={28} color="#101022" />
            ) : (
              <FiMenu size={28} color="#101022" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-15 lg:hidden left-0 w-full min-h-screen bg-white px-6 py-4 shadow-md space-y-4 z-50 flex flex-col">
          {/* Mobile Search Bar */}
          <div className="relative w-full mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="People, Post & Jobs"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#5B5DE6] focus:border-[#5B5DE6] text-sm"
            />
          </div>
          
          {(user ? LOGGED_IN_LINKS : navLinks).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[#101022] text-[16px] font-medium font-poppins hover:text-[#5B5DE6] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <NavbarIconButton
                onNotificationsClick={() => setNotificationsOpen(true)}
                bellButtonRef={bellButtonRef}
              />

              <ProfileAvatar name={user.name} className="mt-4" size={80} />
            </>
          ) : (
            <Link key={"signup"} href={"/signup"}>
              <GradientButton className="w-full h-[42px] text-[16px] font-poppins">
                {signUpText}
              </GradientButton>
            </Link>
          )}
        </div>
      )}

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        buttonRef={bellButtonRef}
      />
    </div>
  );
};

export const NavbarIconButton = ({
  onNotificationsClick,
  bellButtonRef,
}: {
  onNotificationsClick: () => void;
  bellButtonRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <div className="flex flex-row gap-4">
      <button className=" p-2 rounded-full hover:bg-gray-100 transition-colors">
        <FiMessageSquare size={22} className="text-gray-500" />
      </button>
      <button
        ref={bellButtonRef}
        className="ml-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={onNotificationsClick}
      >
        <FiBell size={22} className="text-gray-500" />
      </button>

      {/* Calendar Button - Redirect to Schedule Meeting in Jobs page with EMPLOYER mode */}
      <button
        className="ml-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => window.location.href = '/profile/jobs?tab=meetings&mode=employer'}
      >
        <FiCalendar size={22} className="text-gray-500" />
      </button>

    </div>
  );
};
export default Navbar;
