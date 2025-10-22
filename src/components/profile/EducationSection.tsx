'use client'
import React, { useState } from 'react';
import { Plus, Edit2, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { education as initialEducation } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Education as EducationType } from '../../types/profile';
import EducationModal from './EducationModal';

const defaultEducation: EducationType = {
  year: '',
  institution: '',
  course: '',
  specialization: '',
  courseType: '',
  startYear: '',
  endYear: '',
  gradingSystem: '',
  degree: '',
  cgpa: '',
  location: '',
  duration: '',
  description: '',
  achievements: [''],
  skills: [],
};

export default function EducationSection() {
  const [education, setEducation] = useState<EducationType[]>(
    initialEducation.map(edu => ({
      ...edu,
      year: '',
      course: '',
      courseType: '',
      startYear: '',
      endYear: '',
      gradingSystem: '',
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

  const handleSave = (edu: EducationType) => {
    if (editingIndex === null) {
      setEducation([...education, edu]);
    } else {
      setEducation(education.map((e, i) => (i === editingIndex ? edu : e)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setEducation(education.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col gap-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{SITE_CONFIG.educationSection.section}</h2>
        <div className="flex gap-2 absolute top-8 right-8">
          <button
            className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={handleAdd}
            aria-label="Add Education"
          >
            <Plus size={22} className="text-[#a259e6]" />
          </button>
        </div>
      </div>
      {education.map((edu: EducationType, idx: number) => (
        <div key={edu.degree + idx} className="bg-white border-b last:border-b-0 rounded-none p-0 pb-8 mb-8 flex flex-col gap-2 relative">
          {/* <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={() => handleEdit(idx)}
            aria-label="Edit Education"
          > 
            <Edit2 size={18} className="text-[#a259e6]" />
          </button> */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 leading-tight">{edu.degree}</div>
              <div className="text-base text-gray-400 font-medium mb-1">{edu.specialization}</div>
            </div>
            <div className="text-2xl font-bold text-green-600 whitespace-nowrap">{edu.cgpa}</div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-1 mt-1">
            <GraduationCap size={18} className="inline-block" />
            <span className="font-medium">{edu.institution}</span>
            <span className="mx-1">•</span>
            <MapPin size={16} className="inline-block" />
            <span>{edu.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-2">
            <Calendar size={16} className="inline-block" />
            <span>
              {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : edu.duration}
            </span>
            <span className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">{edu.courseType}</span>
          </div>
          <div className="text-base text-gray-700 mt-2 mb-2">{edu.description}</div>
          <div className="font-bold text-base text-gray-900 mb-1">Key Achievements</div>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-2">
            {edu.achievements.map((ach, i) => (
              <li key={ach + i}>{ach}</li>
            ))}
          </ul>
          <div className="font-medium text-base text-gray-900 mb-1">Skills Used</div>
          <div className="flex flex-wrap gap-3 mb-2">
            {edu.skills.map((skill) => (
              <span key={skill} className="bg-[#ede6fa] text-[#18181b] px-4 py-2 rounded-full text-base font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <EducationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultEducation : education[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </div>
  );
} 