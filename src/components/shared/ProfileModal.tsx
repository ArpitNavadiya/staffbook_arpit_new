'use client';
import { useEffect } from 'react';
import { FiX, FiStar, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { user } from '@/data/profile';
import { PROFILE_MODAL } from '@/constants/siteconfig';
import ProfileViewsIcon from '@/components/svgs/ProfileViewsIcon';
import ConnectionsIcon from '@/components/svgs/ConnectionsIcon';
import { useRouter } from 'next/navigation';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, buttonRef }) => {
  const router = useRouter();
  // Close modal when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed justify-center inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 "
        onClick={onClose}
      />
      
      {/* Modal positioned below button */}
      <div className="absolute md:top-[75px] md:right-6 bg-white rounded-lg shadow-xl w-full max-w-full md:max-w-sm md:mx-4 md:max-h-[80vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-700">{PROFILE_MODAL.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* Profile Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-700">{user.name}</h3>
                <p className="text-xs text-gray-600">{user.role}</p>
              </div>
            </div>
            <button onClick={()=>{
                router.push('/profile');
            }} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              {PROFILE_MODAL.viewUpdateProfile}
            </button>
          </div>

          {/* Profile Performance Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">{PROFILE_MODAL.profilePerformance}</h3>
              <span className="text-xs text-gray-500">{PROFILE_MODAL.lastDays}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F3EFFF] rounded-lg p-3 cursor-pointer hover:bg-[#E8E4FF] transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{PROFILE_MODAL.whoSearchedYou}</p>
                    <p className="text-lg font-bold text-purple-600">20</p>
                  </div>
                  <ProfileViewsIcon className="text-purple-600 w-8 h-8" />
                </div>
              </div>
              <div className="bg-[#F3EFFF] rounded-lg p-3 cursor-pointer hover:bg-[#E8E4FF] transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{PROFILE_MODAL.connections}</p>
                    <p className="text-lg font-bold text-purple-600">220</p>
                  </div>
                  <ConnectionsIcon className="text-purple-600 w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <FiStar className="text-orange-500" size={16} />
              </div>
              <span className="text-sm text-gray-700">{PROFILE_MODAL.exploreSubscriptions}</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <FiSettings className="text-gray-600" size={16} />
              </div>
              <span className="text-sm text-gray-700">{PROFILE_MODAL.settings}</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <FiHelpCircle className="text-gray-600" size={16} />
              </div>
              <span className="text-sm text-gray-700">{PROFILE_MODAL.faqs}</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <FiLogOut className="text-gray-600" size={16} />
              </div>
              <span className="text-sm text-gray-700">{PROFILE_MODAL.logOut}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 