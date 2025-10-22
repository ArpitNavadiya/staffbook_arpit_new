import React, { useState } from 'react';
import Modal from '../shared/Modal';
import PrimaryButton from '../shared/PrimaryButton';
import TextInput from '../shared/TextInput';
import SelectInput from '../shared/SelectInput';
import type { Project } from '../../types/profile';

const YEARS = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  initialData: Project;
  onSave: (data: Project) => void;
  onDelete?: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, initialData, onSave, onDelete }) => {
  const [form, setForm] = useState<Project>(initialData);
  const [skills, setSkills] = useState<string[]>(form.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [softwares, setSoftwares] = useState<string[]>(form.softwares || []);
  const [softwareInput, setSoftwareInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
      e.preventDefault();
    }
  };
  const handleSkillRemove = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSoftwareAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && softwareInput.trim()) {
      setSoftwares([...softwares, softwareInput.trim()]);
      setSoftwareInput('');
      e.preventDefault();
    }
  };
  const handleSoftwareRemove = (software: string) => {
    setSoftwares(softwares.filter(s => s !== software));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, skills, softwares });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">Projects</div>
          {onDelete && (
            <button type="button" className="text-purple-500 mr-8 md:mr-0 font-semibold" onClick={onDelete}>Delete</button>
          )}
        </div>
        <div className="mb-4">
          <TextInput id="name" label="Project Title" value={form.name} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <TextInput id="role" label="Role" value={form.role} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4">
          <div>
            <label className="block text-gray-500 font-medium mb-1">Issue Date</label>
            <div className="flex gap-2">
              <SelectInput
                id="issueYear"
                label=""
                options={YEARS}
                value={form.issueYear || ''}
                onChange={e => setForm({ ...form, issueYear: e.target.value })}
                placeholder="-"
              />
              <SelectInput
                id="issueMonth"
                label=""
                options={MONTHS}
                value={form.issueMonth || ''}
                onChange={e => setForm({ ...form, issueMonth: e.target.value })}
                placeholder="-"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-500 font-medium mb-1">Expiry Date</label>
            <div className="flex gap-2">
              <SelectInput
                id="expiryYear"
                label=""
                options={YEARS}
                value={form.expiryYear || ''}
                onChange={e => setForm({ ...form, expiryYear: e.target.value })}
                placeholder="-"
              />
              <SelectInput
                id="expiryMonth"
                label=""
                options={MONTHS}
                value={form.expiryMonth || ''}
                onChange={e => setForm({ ...form, expiryMonth: e.target.value })}
                placeholder="-"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-medium mb-1">Project Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={4000}
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none"
          />
          <div className="text-right text-xs text-gray-400 mt-1">4000 Characters</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-medium mb-1">Softwares Used</label>
          <input
            type="text"
            value={softwareInput}
            onChange={e => setSoftwareInput(e.target.value)}
            onKeyDown={handleSoftwareAdd}
            placeholder="Add a software and press Enter"
            className="w-full rounded-xl text-gray-500 border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {softwares.map(software => (
              <span key={software} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                {software}
                <button type="button" className="ml-1 text-purple-400 hover:text-purple-700" onClick={() => handleSoftwareRemove(software)}>&times;</button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-medium mb-1">Skills Used</label>
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleSkillAdd}
            placeholder="Add a skill and press Enter"
            className="w-full rounded-xl text-gray-500 border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                {skill}
                <button type="button" className="ml-1 text-purple-400 hover:text-purple-700" onClick={() => handleSkillRemove(skill)}>&times;</button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <TextInput id="url" label="Project URL" value={form.url} onChange={handleChange} />
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <PrimaryButton type="button" className="bg-gray-100 text-purple-700 border border-gray-200 hover:bg-gray-200" onClick={onClose}>Cancel</PrimaryButton>
          <PrimaryButton type="submit">Save Changes</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal; 