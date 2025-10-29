'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiMinus, FiSend, FiMessageSquare } from 'react-icons/fi';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialBotMessages = [
  "Hello! I'm your StaffBook AI assistant. How can I help you today?",
  "I can help you with job searches, resume tips, networking advice, and more!",
  "Feel free to ask me anything about career development or job hunting."
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when widget opens
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: initialBotMessages[0],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [open]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputMessage.trim()),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return "I can help you find job opportunities! Check our job market section for current openings.";
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "For resume tips, visit our resume builder section. We offer ATS-friendly templates!";
    } else if (lowerMessage.includes('network') || lowerMessage.includes('connect')) {
      return "Networking is key! Use our networking feature to connect with professionals in your industry.";
    } else if (lowerMessage.includes('hire') || lowerMessage.includes('recruit')) {
      return "If you're looking to hire, check our hiring services for premium recruitment solutions.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your career journey today?";
    } else if (lowerMessage.includes('help')) {
      return "I'm here to help! I can assist with job search, resume building, networking, and career advice.";
    } else {
      return initialBotMessages[Math.floor(Math.random() * initialBotMessages.length)];
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-38 z-50">
      {/* Chatbot Toggle Button - Only when widget is closed */}
      {!open && (
        <button
          aria-label="Open chatbot"
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-[#921294] to-[#5B5BE7] text-white hover:from-[#811284] hover:to-[#4A4AD6] transition-all"
          onClick={() => setOpen(true)}
        >
          <FiMessageCircle />
          Chatbot
        </button>
      )}

      {/* Widget Panel */}
      {open && (
        <div className="w-[340px] md:w-[380px] bg-white rounded-2xl shadow-xl border border-[#E8E4FF] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3EFFF]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#921294] to-[#5B5BE7] text-white flex items-center justify-center text-sm font-bold">
                <FiMessageSquare className="w-4 h-4" />
              </div>
              <span className="font-semibold text-[#222]">AI Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-[#F8F6FF]" onClick={() => setMinimized(m => !m)}>
                <FiMinus className="text-[#666]" />
              </button>
              <button className="p-1 rounded hover:bg-[#F8F6FF]" onClick={() => setOpen(false)}>
                <FiX className="text-[#666]" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!minimized ? (
            <div className="flex flex-col h-[380px]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#5B5BE7] to-[#B14BE4] text-white'
                          : 'bg-[#F8F6FF] text-[#222]'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[#F3EFFF]">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-[#E8E4FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-2 bg-gradient-to-r from-[#5B5BE7] to-[#921294] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-[#666]">Chat minimized</div>
          )}
        </div>
      )}
    </div>
  );
}
