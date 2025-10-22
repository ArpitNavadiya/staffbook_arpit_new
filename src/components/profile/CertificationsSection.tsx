'use client'
import React, { useState } from 'react';
import { Plus, Edit2, Award, Calendar } from 'lucide-react';
import { certifications as initialCertifications } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Certification } from '../../types/profile';
import CertificationModal from './CertificationModal';

const defaultCertification: Certification = {
  name: '',
  role: '',
  startYear: '',
  startMonth: '',
  endYear: '',
  endMonth: '',
  description: '',
  skills: [],
  credentialId: '',
  url: '',
  institution: '',
  location: '',
  issued: '',
  expires: '',
  credentialIdOld: '',
  descriptionOld: '',
  urlOld: '',
};

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications.map(cert => ({
      ...cert,
      role: '',
      startYear: '',
      startMonth: '',
      endYear: '',
      endMonth: '',
      skills: cert.skills || [],
      credentialId: cert.credentialId || '',
      url: cert.url || '',
      credentialIdOld: '',
      descriptionOld: '',
      urlOld: '',
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

  const handleSave = (cert: Certification) => {
    if (editingIndex === null) {
      setCertifications([...certifications, cert]);
    } else {
      setCertifications(certifications.map((c, i) => (i === editingIndex ? cert : c)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setCertifications(certifications.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col gap-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{SITE_CONFIG.certificationsSection.section}</h2>
        <div className="flex gap-2 absolute top-8 right-8">
          <button
            className="w-9 h-9 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={handleAdd}
            aria-label="Add Certification"
          >
            <Plus size={22} className="text-[#a259e6]" />
          </button>
        </div>
      </div>
      {certifications.map((cert: Certification, idx: number) => (
        <div key={cert.name + idx} className="border-b last:border-b-0 pb-8 mb-8 flex flex-col gap-2 relative">
          {/* <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center cursor-pointer"
            onClick={() => handleEdit(idx)}
            aria-label="Edit Certification"
          >
            <Edit2 size={18} className="text-[#a259e6]" />
          </button> */}
          <div className="text-xl font-bold text-gray-900 leading-tight mb-1">{cert.name}</div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-1">
            <Award size={18} className="inline-block" />
            <span className="font-medium">{cert.institution}</span>
            <span className="mx-1">•</span>
            <span>{cert.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-base mb-1">
            <Calendar size={16} className="inline-block" />
            <span>
              {cert.startMonth && cert.startYear ? `${cert.startMonth} ${cert.startYear}` : ''}
              {cert.endMonth && cert.endYear ? ` – ${cert.endMonth} ${cert.endYear}` : ''}
            </span>
          </div>
          <div className="text-gray-400 text-base mb-1">Credential ID: {cert.credentialId}</div>
          <div className="text-base text-gray-700 mt-2 mb-2">{cert.description}</div>
          <div className="font-bold text-base text-gray-900 mb-1">Credential URL</div>
          <a href={`https://${cert.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-base mb-2">{cert.url}</a>
          <div className="font-medium text-base text-gray-900 mb-1">Skills Acquired</div>
          <div className="flex flex-wrap gap-3 mb-2">
            {cert.skills.map((skill) => (
              <span key={skill} className="bg-[#ede6fa] text-[#18181b] px-4 py-2 rounded-full text-base font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <CertificationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultCertification : certifications[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </div>
  );
} 