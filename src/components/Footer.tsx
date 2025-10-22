'use client';

import Image from 'next/image';
import { SITE_CONFIG } from '../constants/siteconfig';
import { FacebookIcon, InstagramIcon, LinkedInIcon, GoogleIcon } from './svgs/SocialIcons';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t py-8 md:py-12">
      <div className="mx-auto w-full max-w-screen flex flex-col md:flex-row justify-between items-start px-4 gap-10 md:gap-20">
        {/* Left Column: Logo + QR */}
        <div className="flex flex-col items-start gap-4 w-full md:w-[320px] lg:w-[420px]">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Staff Book Logo"
            width={180}
            height={60}
            className="object-contain"
          />
          <span className="text-xs text-gray-500 mt-1">{SITE_CONFIG.footer.tagline}</span>
          {/* QR Codes + Store Buttons */}
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/homePage/scanner-google.png"
                alt="QR Code Android"
                width={72}
                height={72}
                className="object-contain"
              />
              {/* <Image
                src="/homePage/google-play-badge.png"
                alt="Google Play"
                width={110}
                height={32}
                className="object-contain"
              /> */}
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/homePage/scanner-google.png"
                alt="QR Code iOS"
                width={72}
                height={72}
                className="object-contain"
              />
              {/* <Image
                src="/homePage/app-store-badge.png"
                alt="App Store"
                width={110}
                height={32}
                className="object-contain"
              /> */}
            </div>
          </div>
        </div>
        {/* Right Columns: Policies, Menu, Contact */}
        <div className="flex flex-col md:flex-row   w-full justify-between">
          {/* Policies & Menu Row for mobile */}
          <div className="flex-2  flex-row gap-2 w-full ">
          <div className="flex  flex-row gap-2 w-full sm:w-auto">
            {/* Policies */}
            <div className="flex-1/2 flex-row ">
              <h4 className="text-lg text-black font-semibold mb-4">Policies</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {SITE_CONFIG.footer.policies.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:underline focus:underline transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Menu */}
            <div className="flex-1/2 ">
              <h4 className="text-lg text-black font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {SITE_CONFIG.footer.menu.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:underline focus:underline transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
          {/* Contact */}
          <div className='flex-1  '>
            <h4 className="text-lg text-black font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Email: <a href={`mailto:${SITE_CONFIG.footer.email}`} className="hover:underline">{SITE_CONFIG.footer.email}</a></li>
              <li>Phone: <a href={`tel:${SITE_CONFIG.footer.phone}`} className="hover:underline">{SITE_CONFIG.footer.phone}</a></li>
            </ul>
            <div className="flex gap-3 mt-4">
              {/* <a href={SITE_CONFIG.footer.social.facebook} aria-label="Facebook"><FacebookIcon className="w-6 h-6" /></a>
              <a href={SITE_CONFIG.footer.social.instagram} aria-label="Instagram"><InstagramIcon className="w-6 h-6" /></a>
              <a href={SITE_CONFIG.footer.social.linkedin} aria-label="LinkedIn"><LinkedInIcon className="w-6 h-6" /></a>
              <a href={SITE_CONFIG.footer.social.google} aria-label="Google"><GoogleIcon className="w-6 h-6" /></a> */}

              <a href={SITE_CONFIG.footer.social.facebook} aria-label="Facebook"><Image src="/socials/facebook.svg" alt="Facebook" width={24} height={24} /></a>
              <a href={SITE_CONFIG.footer.social.instagram} aria-label="Instagram"><Image src="/socials/instagram.svg" alt="Instagram" width={24} height={24} /></a>
              <a href={SITE_CONFIG.footer.social.linkedin} aria-label="LinkedIn"><Image src="/socials/linkedin.svg" alt="LinkedIn" width={24} height={24} /></a>
              <a href={SITE_CONFIG.footer.social.google} aria-label="Google"><Image src="/socials/google.svg" alt="Google" width={24} height={24} /></a>
              
                            
                            
                            
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
