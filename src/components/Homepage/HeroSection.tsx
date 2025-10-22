'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { jobCards } from '../../data/jobCards';
import { SITE_CONFIG } from '../../constants/siteconfig';
import JobCard from '../shared/JobCard';

const Hero = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current.querySelectorAll('.job-card-animate'),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return (
    <section className="w-full bg-white py-15 md:pt-20 relative overflow-x-auto">
      <div className="w-full max-w-full px-2 md:px-4 mx-auto flex flex-col items-center text-center relative">
        {/* Title */}
        <h1 className="text-[28px] md:text-[48px] font-normal  text-gray-900 leading-tight">
          {SITE_CONFIG.homepage.heroTitle.split('with')[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5DE6] to-[#921294] font-bold">
            {SITE_CONFIG.homepage.heroHighlight}
          </span>{' '}
          with <br className="hidden md:block" />
          {SITE_CONFIG.homepage.heroSubtitle}
        </h1>
        {/* Map and Cards */}
        <div className="relative w-full max-w-full mx-auto" ref={mapRef}>
          <Image
            src="/homePage/map.png"
            alt="World Map"
            objectFit="cover"
            width={1400}
            height={650}
            className="w-full h-[75vh] select-none pointer-events-none"
            priority
          />
          {/* Floating Job Cards */}
          {jobCards.map((job, index) => (
            <div
              key={index}
              className="job-card-animate absolute"
              style={{ ...job.position, minWidth: 260, maxWidth: 340 }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
