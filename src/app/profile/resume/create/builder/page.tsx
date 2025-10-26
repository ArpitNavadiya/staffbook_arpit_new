'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileLayout from '../../../../..//components/shared/ProfileLayout';
import {
  FiUser,
  FiBriefcase,
  FiBook,
  FiTool,
  FiAward,
  FiFileText,
  FiArrowLeft,
  FiSave,
  FiEye,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiAlertCircle,
  FiLoader,
  FiX
} from 'react-icons/fi';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
}

const sections = [
  { id: 'personal', name: 'Personal Info', icon: FiUser, required: true },
  { id: 'summary', name: 'Summary', icon: FiFileText, required: false },
  { id: 'experience', name: 'Experience', icon: FiBriefcase, required: true },
  { id: 'education', name: 'Education', icon: FiBook, required: true },
  { id: 'skills', name: 'Skills', icon: FiTool, required: true },
  { id: 'certifications', name: 'Certifications', icon: FiAward, required: false }
];

// Component that uses useSearchParams
function ResumeBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Load parsed data if coming from upload
  useEffect(() => {
    if (source === 'upload') {
      const parsedData = localStorage.getItem('parsedResumeData');
      if (parsedData) {
        try {
          const parsed = JSON.parse(parsedData);
          setResumeData({
            personalInfo: parsed.personalInfo || resumeData.personalInfo,
            summary: parsed.summary || '',
            experience: parsed.experience?.map((exp: any, index: number) => ({
              ...exp,
              id: `exp-${index}`,
              current: exp.endDate === 'Present'
            })) || [],
            education: parsed.education?.map((edu: any, index: number) => ({
              ...edu,
              id: `edu-${index}`
            })) || [],
            skills: parsed.skills || [],
            certifications: parsed.certifications?.map((cert: any, index: number) => ({
              ...cert,
              id: `cert-${index}`
            })) || []
          });
          localStorage.removeItem('parsedResumeData');
        } catch (error) {
          console.error('Error parsing resume data:', error);
        }
      }
    }
  }, [source]);

  const validateSection = (sectionId: string): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (sectionId) {
      case 'personal':
        if (!resumeData.personalInfo.name.trim()) {
          newErrors['personal.name'] = 'Name is required';
        }
        if (!resumeData.personalInfo.email.trim()) {
          newErrors['personal.email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(resumeData.personalInfo.email)) {
          newErrors['personal.email'] = 'Invalid email format';
        }
        if (!resumeData.personalInfo.phone.trim()) {
          newErrors['personal.phone'] = 'Phone is required';
        }
        break;
      
      case 'experience':
        if (resumeData.experience.length === 0) {
          newErrors['experience'] = 'At least one work experience is required';
        }
        resumeData.experience.forEach((exp, index) => {
          if (!exp.company.trim()) {
            newErrors[`experience.${index}.company`] = 'Company name is required';
          }
          if (!exp.position.trim()) {
            newErrors[`experience.${index}.position`] = 'Position is required';
          }
          if (!exp.startDate) {
            newErrors[`experience.${index}.startDate`] = 'Start date is required';
          }
        });
        break;
      
      case 'education':
        if (resumeData.education.length === 0) {
          newErrors['education'] = 'At least one education entry is required';
        }
        resumeData.education.forEach((edu, index) => {
          if (!edu.institution.trim()) {
            newErrors[`education.${index}.institution`] = 'Institution is required';
          }
          if (!edu.degree.trim()) {
            newErrors[`education.${index}.degree`] = 'Degree is required';
          }
        });
        break;
      
      case 'skills':
        if (resumeData.skills.length === 0) {
          newErrors['skills'] = 'At least one skill is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const handleSave = async () => {
    // Validate all required sections
    const requiredSections = sections.filter(s => s.required).map(s => s.id);
    let isValid = true;
    
    for (const sectionId of requiredSections) {
      if (!validateSection(sectionId)) {
        isValid = false;
      }
    }
    
    if (!isValid) {
      alert('Please fix all validation errors before saving.');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for now
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      
      alert('Resume saved successfully!');
      router.push('/profile/resume');
    } catch (error) {
      alert('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#222] mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={resumeData.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
              errors['personal.name'] ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors['personal.name'] && (
            <p className="text-red-500 text-sm mt-1">{errors['personal.name']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
              errors['personal.email'] ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors['personal.email'] && (
            <p className="text-red-500 text-sm mt-1">{errors['personal.email']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
              errors['personal.phone'] ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors['personal.phone'] && (
            <p className="text-red-500 text-sm mt-1">{errors['personal.phone']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">
            Address
          </label>
          <input
            type="text"
            value={resumeData.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
            placeholder="City, State/Country"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#333] mb-2">
            Website/Portfolio
          </label>
          <input
            type="url"
            value={resumeData.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
            placeholder="yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#222] mb-6">Professional Summary</h2>
      
      <div>
        <label className="block text-sm font-medium text-[#333] mb-2">
          Summary
        </label>
        <textarea
          value={resumeData.summary}
          onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
        />
        <p className="text-sm text-[#666] mt-2">
          Tip: Keep it concise (2-3 sentences) and highlight your most relevant qualifications.
        </p>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#222]">Work Experience</h2>
        <button
          onClick={addExperience}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          <FiPlus size={16} />
          Add Experience
        </button>
      </div>
      
      {errors['experience'] && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <FiAlertCircle size={16} className="text-red-500" />
          <p className="text-red-600 text-sm">{errors['experience']}</p>
        </div>
      )}
      
      <div className="space-y-6">
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#222]">Experience #{index + 1}</h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
                    errors[`experience.${index}.company`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Company name"
                />
                {errors[`experience.${index}.company`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`experience.${index}.company`]}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
                    errors[`experience.${index}.position`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Job title"
                />
                {errors[`experience.${index}.position`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`experience.${index}.position`]}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Start Date *
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent ${
                    errors[`experience.${index}.startDate`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`experience.${index}.startDate`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`experience.${index}.startDate`]}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={exp.current ? '' : exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent disabled:bg-gray-100"
                />
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-[#5B5BE7] focus:ring-[#5B5BE7]"
                  />
                  <span className="text-sm text-[#666]">Currently working here</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#333] mb-2">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                placeholder="Describe your responsibilities, achievements, and key contributions..."
              />
            </div>
          </div>
        ))}
        
        {resumeData.experience.length === 0 && (
          <div className="text-center py-12 text-[#666]">
            <FiBriefcase size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#222]">Education</h2>
        <button
          onClick={addEducation}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          <FiPlus size={16} />
          Add Education
        </button>
      </div>
      
      {errors['education'] && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <FiAlertCircle size={16} className="text-red-500" />
          <p className="text-red-600 text-sm">{errors['education']}</p>
        </div>
      )}
      
      <div className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#222]">Education #{index + 1}</h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
                    errors[`education.${index}.institution`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="University/School name"
                />
                {errors[`education.${index}.institution`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`education.${index}.institution`]}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400 ${
                    errors[`education.${index}.degree`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Bachelor's, Master's, etc."
                />
                {errors[`education.${index}.degree`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`education.${index}.degree`]}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                  placeholder="3.8/4.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        ))}
        
        {resumeData.education.length === 0 && (
          <div className="text-center py-12 text-[#666]">
            <FiBook size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#222] mb-6">Skills</h2>
      
      {errors['skills'] && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <FiAlertCircle size={16} className="text-red-500" />
          <p className="text-red-600 text-sm">{errors['skills']}</p>
        </div>
      )}
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
        />
        <button
          onClick={addSkill}
          className="px-6 py-3 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          Add
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white px-4 py-2 rounded-full text-sm"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {resumeData.skills.length === 0 && (
        <div className="text-center py-12 text-[#666]">
          <FiTool size={48} className="mx-auto mb-4 text-gray-400" />
          <p>No skills added yet.</p>
          <p className="text-sm">Add your technical and soft skills above.</p>
        </div>
      )}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#222]">Certifications</h2>
        <button
          onClick={addCertification}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          <FiPlus size={16} />
          Add Certification
        </button>
      </div>
      
      <div className="space-y-6">
        {resumeData.certifications.map((cert, index) => (
          <div key={cert.id} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#222]">Certification #{index + 1}</h3>
              <button
                onClick={() => removeCertification(cert.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent placeholder-gray-400"
                  placeholder="Amazon Web Services"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Issue Date
                </label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="month"
                  value={cert.expiryDate || ''}
                  onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5B5BE7] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
        
        {resumeData.certifications.length === 0 && (
          <div className="text-center py-12 text-[#666]">
            <FiAward size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No certifications added yet.</p>
            <p className="text-sm">Click "Add Certification" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'summary':
        return renderSummary();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'certifications':
        return renderCertifications();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-[#F3EFFF] -mt-[10px]">
        <div className="flex h-screen">
          {/* Sidebar - 30% width */}
          <div className="w-[30%] bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto">
              <Link
                href="/profile/resume/create"
                className="inline-flex items-center gap-2 text-[#666] hover:text-[#5B5BE7] transition-colors duration-200 mb-6"
              >
                <FiArrowLeft size={20} />
                <span className="font-medium">Back to Options</span>
              </Link>
              
              <h2 className="text-xl font-bold text-[#222] mb-6">Resume Builder</h2>
              
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const hasError = Object.keys(errors).some(key => key.startsWith(section.id));
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white shadow-lg'
                          : 'text-[#666] hover:bg-[#F8F6FF] hover:text-[#5B5BE7]'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium text-sm">{section.name}</span>
                      {section.required && (
                        <span className="text-xs">*</span>
                      )}
                      {hasError && !isActive && (
                        <FiAlertCircle size={16} className="text-red-500 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* Save Button */}
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <FiLoader size={20} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={20} />
                    Save Resume
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Main Content - 70% width */}
          <div className="w-[70%] flex flex-col">
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-full">
                {renderSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

// Main component with Suspense boundary
export default function ResumeBuilder() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] to-[#E8E9FF] flex items-center justify-center">
        <div className="text-center">
          <FiLoader size={48} className="mx-auto mb-4 text-[#5B5BE7] animate-spin" />
          <p className="text-[#666] text-lg">Loading Resume Builder...</p>
        </div>
      </div>
    }>
      <ResumeBuilderContent />
    </Suspense>
  );
}