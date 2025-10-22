'use client'
import React, { useState } from 'react';
import { Plus, Edit2, Calendar, MapPin, Building2 } from 'lucide-react';
import { experiences as initialExperiences } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Experience } from '../../types/profile';
import ExperienceModal from './ExperienceModal';

const defaultExperience: Experience = {
  companyLogo: '',
  role: '',
  company: '',
  location: '',
  employmentType: '',
  isCurrent: false,
  joiningYear: '',
  joiningMonth: '',
  leavingYear: '',
  leavingMonth: '',
  description: '',
  achievements: [''],
  skills: [],
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>(
    initialExperiences.map(exp => ({
      ...exp,
      employmentType: '',
      isCurrent: false,
      joiningYear: '',
      joiningMonth: '',
      leavingYear: '',
      leavingMonth: '',
    }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingIndex(null);
    setModalOpen(true);
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setModalOpen(true);
  };

  const handleSave = (exp: Experience) => {
    if (editingIndex === null) {
      setExperiences([...experiences, exp]);
    } else {
      setExperiences(experiences.map((e, i) => (i === editingIndex ? exp : e)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setExperiences(experiences.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-5 flex flex-col gap-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{SITE_CONFIG.experienceSection.section}</h2>
        <div className="flex gap-2 absolute top-8 right-8">
          <button
            className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={handleAdd}
            aria-label="Add Experience"
          >
            <Plus size={22} className="text-[#a259e6]" />
          </button>
        </div>
      </div>
      {experiences.map((exp: Experience, idx: number) => (
        <div key={exp.role + exp.company + idx} className="bg-[#f7f7fa] rounded-xl p-6 flex flex-col gap-2 relative">
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={() => handleEdit(idx)}
            aria-label="Edit Experience"
          >
            <Edit2 size={18} className="text-[#a259e6]" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            {exp.companyLogo && (
              <img src={exp.companyLogo} alt={exp.company} className="w-8 h-8 rounded object-contain bg-white border border-gray-200" />
            )}
            <span className="font-bold text-xl text-gray-900">{exp.role}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-1">
            <Building2 size={16} className="inline-block" />
            <span className="font-medium">{exp.company}</span>
            <span className="mx-1">•</span>
            <MapPin size={16} className="inline-block" />
            <span>{exp.location}</span>
            <span className="mx-1">•</span>
            <span>{exp.employmentType}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-1">
            <Calendar size={16} className="inline-block" />
            <span>
              {exp.joiningMonth && exp.joiningYear ? `${exp.joiningMonth} ${exp.joiningYear}` : ''}
              {exp.isCurrent
                ? ' – Present'
                : exp.leavingMonth && exp.leavingYear
                ? ` – ${exp.leavingMonth} ${exp.leavingYear}`
                : ''}
            </span>
          </div>
          <div className="text-base text-gray-700 mt-2 mb-2">{exp.description}</div>
          <div className="font-bold text-base text-gray-900 mb-1">Key Achievements</div>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-2">
            {exp.achievements.map((ach, i) => (
              <li key={ach + i}>{ach}</li>
            ))}
          </ul>
          <div className="font-medium text-base text-gray-900 mb-1">Skills Used</div>
          <div className="flex flex-wrap gap-3 mb-2">
            {exp.skills.map((skill) => (
              <span key={skill} className="bg-[#ede6fa] text-[#18181b] px-4 py-2 rounded-full text-base font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <ExperienceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultExperience : experiences[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </div>
  );
} 