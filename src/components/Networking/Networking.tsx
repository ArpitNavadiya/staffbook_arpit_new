'use client'
import React from 'react';
import { stories, posts, reels, suggestedConnections, userStats, Post, SuggestedConnection, Reel } from '../../data/networking';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { FiPlus, FiHeart, FiMessageCircle, FiShare2, FiSend, FiMoreVertical, FiPlay, FiRefreshCw, FiVideo, FiCamera, FiX, FiEdit3, FiImage, FiVideo as FiVideoIcon, FiEdit, FiShare, FiBell, FiTrendingUp, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import NetworkingRightSidebar from './NetworkingRightSidebar';
import StorySection from '../shared/StorySection';



const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [showActionsModal, setShowActionsModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="bg-white md:rounded-lg border border-gray-200 p-4 mb-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{post.author.name}</h3>
              <p className="text-xs text-gray-600">{post.author.title}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.canConnect && (
              <button className="bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-700 transition-colors">
                {SITE_CONFIG.networking.connect}
              </button>
            )}
            <button 
              ref={buttonRef}
              className="p-1 hover:bg-gray-100 rounded-full"
              onClick={() => setShowActionsModal(true)}
            >
              <FiMoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-900 text-sm mb-3">{post.content}</p>

        {/* Post Media */}
        {post.media && (
          <div className="mb-3">
            {post.media.type === 'video' ? (
              <div className="relative">
                <Image
                  src={post.media.url}
                  alt={post.media.alt}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                    <FiPlay className="w-6 h-6 text-purple-600 ml-1" />
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src={post.media.url}
                alt={post.media.alt}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
              <FiHeart className="w-4 h-4" />
              <span className="text-xs">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
              <FiMessageCircle className="w-4 h-4" />
              <span className="text-xs">View {post.comments} comments</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition-colors">
              <FiShare2 className="w-4 h-4" />
              <span className="text-xs">{post.shares}</span>
            </button>
          </div>
          <button className="text-gray-600 hover:text-purple-600 transition-colors">
            <FiSend className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Post Actions Modal */}
      <PostActionsModal 
        isOpen={showActionsModal}
        onClose={() => setShowActionsModal(false)}
        postId={post.id}
        buttonRef={buttonRef}
      />
    </>
  );
};

const ReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
  return (
    <div className="flex-shrink-0 w-48 sm:w-56">
      <div className="relative">
        <Image
          src={reel.thumbnail}
          alt={reel.caption}
          width={224}
          height={300}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
            <FiPlay className="w-4 h-4 text-purple-600 ml-0.5" />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <Image
            src={reel.author.avatar}
            alt={reel.author.name}
            width={20}
            height={20}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs font-medium text-gray-900">{reel.author.name}</span>
        </div>
        <p className="text-xs text-gray-600 mb-1">{reel.caption}</p>
        <p className="text-xs text-gray-500">{reel.timestamp} • {reel.views} views</p>
      </div>
    </div>
  );
};

const SuggestedConnectionCard: React.FC<{ connection: SuggestedConnection }> = ({ connection }) => {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Image
        src={connection.avatar}
        alt={connection.name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm">{connection.name}</h3>
        <p className="text-xs text-gray-600 mb-1">{connection.title}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{connection.description}</p>
        <button className="mt-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-700 transition-colors">
          {SITE_CONFIG.networking.connect}
        </button>
      </div>
    </div>
  );
};

const CreateReelCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [caption, setCaption] = React.useState('');
  const [hashtags, setHashtags] = React.useState('');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{SITE_CONFIG.networking.reels.createReel}</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-purple-600 transition-colors"
        >
          {isExpanded ? <FiX className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
        </button>
      </div>

      {!isExpanded ? (
        <div className="flex items-center gap-3">
          <Image
            src="/homePage/profile.png"
            alt="Your profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <input
              type="text"
              placeholder={SITE_CONFIG.networking.reels.addCaption}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onClick={() => setIsExpanded(true)}
              readOnly
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Video Upload/Record Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <FiVideo className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Create your reel</h4>
                <p className="text-sm text-gray-600 mb-4">Share your professional insights and tips</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    <FiVideo className="w-4 h-4" />
                    {SITE_CONFIG.networking.reels.uploadVideo}
                  </button>
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiCamera className="w-4 h-4" />
                    {SITE_CONFIG.networking.reels.recordVideo}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={SITE_CONFIG.networking.reels.addCaption}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Hashtags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder={SITE_CONFIG.networking.reels.addHashtags}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setIsExpanded(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {SITE_CONFIG.networking.reels.cancel}
            </button>
            <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              {SITE_CONFIG.networking.reels.publish}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PostActionsModal: React.FC<{ isOpen: boolean; onClose: () => void; postId: string; buttonRef: React.RefObject<HTMLButtonElement | null> }> = ({ isOpen, onClose, postId, buttonRef }) => {
  const [position, setPosition] = React.useState({ top: 0, right: 0 });

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        right: window.innerWidth - rect.right
      });
    }
  }, [isOpen, buttonRef]);

  const handleAction = (action: string) => {
    console.log(`Action ${action} for post ${postId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown Modal */}
      <div 
        className="fixed bg-white rounded-lg border border-gray-200 shadow-lg z-50 min-w-[200px] py-2"
        style={{
          top: position.top,
          right: position.right,
        }}
      >
        <div className="py-2">
          <button 
            onClick={() => handleAction('edit')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiEdit className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.editPost}</span>
          </button>
          
          <button 
            onClick={() => handleAction('share')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiShare className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.sharePost}</span>
          </button>
          
          <button 
            onClick={() => handleAction('mute')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiBell className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.muteNotifications}</span>
          </button>
          
          <button 
            onClick={() => handleAction('insights')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiTrendingUp className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.insights}</span>
          </button>
          
          <button 
            onClick={() => handleAction('delete')}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.deletePost}</span>
          </button>
        </div>
      </div>
    </>
  );
};


const Networking: React.FC = () => {
  return (
    <div className="w-full max-w-full mx-auto  px-0">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex flex-col  w-full">
        

          {/* Create Post Section */}
          <div className="bg-white md:rounded-lg border border-gray-200 mt-5 p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                  <Image
                    src="/homePage/profile.png"
                    alt="Your profile"
                    width={64}
                    height={64}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 rounded-full border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                  placeholder="Write a post"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex items-center justify-center gap-2 p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <FiEdit3 className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-black">Write Blog</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <FiImage className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-black">Upload Image</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <FiVideoIcon className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-black">Upload Video</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <FiVideo className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-black">Upload Reel</span>
              </button>
            </div>
          </div>

      
          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Reels Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{SITE_CONFIG.networking.reels.title}</h3>
              <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors">
                <FiRefreshCw className="w-4 h-4" />
                <span className="text-sm">{SITE_CONFIG.networking.reels.refresh}</span>
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {reels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
          </div>

          {/* More Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={`repeat-${post.id}`} post={post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
      </div>
    </div>
  );
};

export default Networking;