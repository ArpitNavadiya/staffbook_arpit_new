'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMessageSquare, FiX, FiMinus, FiMessageCircle } from 'react-icons/fi';
import { mockChats } from '@/data/chats';

export default function MessageWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const recentChats = useMemo(() => mockChats.slice(0, 5), []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Always visible buttons */}
      <div className="flex gap-2 mb-2"> {/* Added mb-2 for spacing between buttons and widget */}
        {/* Messages Toggle Button - Only when widget is closed */}
        {!open && (
          <button
            aria-label="Open messages"
            className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white hover:from-[#4A4AD6] hover:to-[#A13BD3] transition-all"
            onClick={() => setOpen(true)}
          >
            <FiMessageSquare />
            Messages
          </button>
        )}
      </div>

      {/* Widget Panel */}
      {open && (
        <div className="w-[340px] md:w-[380px] bg-white rounded-2xl shadow-xl border border-[#E8E4FF] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3EFFF]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5B5BE7] to-[#B14BE4] text-white flex items-center justify-center text-sm font-bold">SB</div>
              <span className="font-semibold text-[#222]">Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-[#F8F6FF]" onClick={() => setMinimized(m => !m)}><FiMinus className="text-[#666]" /></button>
              <button className="p-1 rounded hover:bg-[#F8F6FF]" onClick={() => setOpen(false)}><FiX className="text-[#666]" /></button>
            </div>
          </div>

          {/* Body */}
          {!minimized ? (
            <div className="max-h-[380px] overflow-y-auto">
              {recentChats.map(chat => (
                <Link href="/profile/messages" key={chat.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#F8F6FF] transition-colors border-b border-[#F3EFFF]">
                  <div className="flex items-center gap-3">
                    <Image src={chat.avatar} alt={chat.name} width={36} height={36} className="rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-[#222]">{chat.name}</p>
                      <p className="text-xs text-[#666] truncate max-w-[200px]">{chat.lastMessage}</p>
                    </div>
                  </div>
                  {chat.unreadCount ? (
                    <div className="min-w-6 h-6 px-2 bg-[#5B5BE7] text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  ) : (
                    <span className="text-xs text-[#666] whitespace-nowrap">{chat.lastMessageTime}</span>
                  )}
                </Link>
              ))}
              <div className="px-4 py-3 text-center">
                <Link href="/profile/messages" className="text-[#5B5BE7] font-medium hover:text-[#4A4AD6]">Open full messages →</Link>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-[#666]">Minimized</div>
          )}
        </div>
      )}
    </div>
  );
}