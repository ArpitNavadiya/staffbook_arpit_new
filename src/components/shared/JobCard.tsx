import React from 'react';
import Image from 'next/image';
import { JobCard as JobCardType } from '../../types/jobCard';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: JobCardType;
  style?: React.CSSProperties;
}

const tagColors: Record<string, string> = {
  Design: 'bg-orange-400',
  Finance: 'bg-yellow-400',
  Sales: 'bg-pink-400',
  'Full Time': 'bg-blue-200 text-blue-700',
};

const JobCard: React.FC<JobCardProps> = ({ job, style }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="rounded-2xl bg-white shadow-xl border border-gray-100 px-4 py-4 sm:px-6 sm:py-5 w-[90vw] min-w-[180px] max-w-xs sm:w-[320px] sm:max-w-full z-10 flex flex-col gap-2"
    style={style}
  >
    <div className="flex items-center gap-2 mb-1">
      <Image src={job.logo} alt={job.company} width={24} height={24} className="rounded-md sm:w-[28px] sm:h-[28px] w-[24px] h-[24px]" />
      <span className="font-semibold text-gray-800 text-xs sm:text-sm">{job.company}</span>
      {job.distance && <span className="ml-auto text-xs text-gray-400">{job.distance}</span>}
    </div>
    <div className="text-base sm:text-xl font-bold text-black mb-1">{job.role}</div>
    <div className="flex gap-2 mb-2 flex-wrap">
      {job.tags.map((tag) => (
        <span
          key={tag}
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium text-white ${tagColors[tag] || 'bg-blue-200 text-blue-700'}`}
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
      <span className="flex items-center gap-1">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 21s-6-5.686-6-10A6 6 0 1112 21z" stroke="#A0AEC0" strokeWidth="1.5"/></svg>
        {job.location}
      </span>
      <span className="flex items-center gap-1">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11V7a5 5 0 1110 0v4M5 11h14v6H5v-6z" stroke="#A0AEC0" strokeWidth="1.5"/></svg>
        {job.salary}
      </span>
    </div>
  </motion.div>
);

export default JobCard; 