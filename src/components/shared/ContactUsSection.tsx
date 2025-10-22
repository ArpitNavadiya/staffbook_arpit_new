'use client';

import Image from 'next/image';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { ContactUsService } from '../../types/service';

export default function ContactUsSection() {
  const { contactUs } = SITE_CONFIG.services;
  
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src={contactUs.image}
              alt="Contact Us"
              width={400}
              height={300}
              className="rounded-[20px] shadow-lg"
            />
          </div>
          
          {/* Right Form */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {contactUs.title}
            </h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                  {contactUs.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B5DE6] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                  {contactUs.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B5DE6] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                  {contactUs.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B5DE6] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-900 mb-1">
                  {contactUs.form.query}
                </label>
                <textarea
                  id="query"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B5DE6] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your query"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#5B5DE6] to-[#921294] text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {contactUs.form.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 