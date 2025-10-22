'use client'
import React, { useState } from 'react';
import { Plus, Edit2, Calendar } from 'lucide-react';
import { projects as initialProjects } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Project } from '../../types/profile';
import ProjectModal from './ProjectModal';

const defaultProject: Project = {
  name: '',
  role: '',
  issueYear: '',
  issueMonth: '',
  expiryYear: '',
  expiryMonth: '',
  description: '',
  achievements: [''],
  skills: [],
  softwares: [],
  url: '',
  duration: '',
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(
    initialProjects.map(proj => ({
      ...proj,
      issueYear: '',
      issueMonth: '',
      expiryYear: '',
      expiryMonth: '',
      skills: proj.skills || [],
      softwares: proj.softwares || [],
      url: proj.url || '',
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

  const handleSave = (proj: Project) => {
    if (editingIndex === null) {
      setProjects([...projects, proj]);
    } else {
      setProjects(projects.map((p, i) => (i === editingIndex ? proj : p)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setProjects(projects.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col gap-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{SITE_CONFIG.projectsSection.section}</h2>
        <div className="flex gap-2 absolute top-8 right-8">
          <button
            className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={handleAdd}
            aria-label="Add Project"
          >
            <Plus size={22} className="text-[#a259e6]" />
          </button>
        </div>
      </div>
      {projects.map((proj: Project, idx: number) => (
        <div key={proj.name + idx} className="border-b last:border-b-0 pb-8 mb-8 flex flex-col gap-2 relative">
          <button
            className="absolute top-4 right-0 w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={() => handleEdit(idx)}
            aria-label="Edit Project"
          >
            <Edit2 size={18} className="text-[#a259e6]" />
          </button>
          <div className="text-2xl font-bold text-gray-900 leading-tight mb-1">{proj.name}</div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-1">
            <Calendar size={16} className="inline-block" />
            <span>
              {proj.issueMonth && proj.issueYear ? `${proj.issueMonth} ${proj.issueYear}` : ''}
              {proj.expiryMonth && proj.expiryYear ? ` – ${proj.expiryMonth} ${proj.expiryYear}` : ''}
            </span>
            <span className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">{proj.role}</span>
          </div>
          <div className="text-base text-gray-700 mt-2 mb-2">{proj.description}</div>
          <div className="font-bold text-base text-gray-900 mb-1">Key Achievements</div>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-2">
            {proj.achievements.map((ach, i) => (
              <li key={ach + i}>{ach}</li>
            ))}
          </ul>
          <div className="font-medium text-base text-gray-900 mb-1">Skills Used</div>
          <div className="flex flex-wrap gap-3 mb-2">
            {proj.skills.map((skill) => (
              <span key={skill} className="bg-[#ede6fa] text-[#18181b] px-4 py-2 rounded-full text-base font-medium">
                {skill}
              </span>
            ))}
          </div>
          <div className="font-medium text-base text-gray-900 mb-1">Softwares Used</div>
          <div className="flex flex-wrap gap-3 mb-2">
            {proj.softwares.map((software) => (
              <span key={software} className="bg-[#ede6fa] text-[#18181b] px-4 py-2 rounded-full text-base font-medium">
                {software}
              </span>
            ))}
          </div>
          <div className="font-bold text-base text-gray-900 mb-1">Project URL</div>
          <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-base">{proj.url}</a>
        </div>
      ))}
      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultProject : projects[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </div>
  );
} 