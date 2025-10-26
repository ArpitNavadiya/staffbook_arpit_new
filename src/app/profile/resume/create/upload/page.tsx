'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileLayout from '../../../../../components/shared/ProfileLayout';
import {
  FiUpload,
  FiFile,
  FiX,
  FiArrowLeft,
  FiLoader,
  FiCheck,
  FiAlertTriangle,
  FiRefreshCw
} from 'react-icons/fi';

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  type: string;
}

interface ParsedData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

export default function UploadResume() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const acceptedFormats = ['.pdf', '.docx', '.doc'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedFormats.includes(fileExtension)) {
      return `Invalid file format. Please upload ${acceptedFormats.join(', ')} files only.`;
    }
    
    if (file.size > maxFileSize) {
      return `File size too large. Please upload files smaller than ${formatFileSize(maxFileSize)}.`;
    }
    
    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploadedFile({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processResumeWithGemini = async (file: File): Promise<ParsedData> => {
    // Simulate API processing steps
    setProcessingStep('Reading file content...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProcessingStep('Analyzing resume structure...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProcessingStep('Extracting information...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessingStep('Organizing data...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock parsed data - In real implementation, this would come from Gemini API
    const mockParsedData: ParsedData = {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.dev'
      },
      summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams.',
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          startDate: '2021-03',
          endDate: 'Present',
          description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.'
        },
        {
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: '2019-06',
          endDate: '2021-02',
          description: 'Built responsive web applications using React and Node.js. Collaborated with design team to implement pixel-perfect UI components. Optimized database queries improving performance by 40%.'
        }
      ],
      education: [
        {
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015-09',
          endDate: '2019-05',
          gpa: '3.8'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'Agile'],
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2022-08'
        },
        {
          name: 'React Developer Certification',
          issuer: 'Meta',
          date: '2021-12'
        }
      ]
    };

    return mockParsedData;
  };

  const handleProcessResume = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const parsed = await processResumeWithGemini(uploadedFile.file);
      setParsedData(parsed);
      setProcessingStep('Processing complete!');
      
      // Store parsed data in localStorage for the builder
      localStorage.setItem('parsedResumeData', JSON.stringify(parsed));
      
      // Redirect to builder after a short delay
      setTimeout(() => {
        router.push('/profile/resume/create/builder?source=upload');
      }, 1500);
      
    } catch (err) {
      setError('Failed to process resume. Please try again or contact support.');
      setIsProcessing(false);
    }
  };

  const retryProcessing = () => {
    setError(null);
    setParsedData(null);
    handleProcessResume();
  };

  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6FF] to-[#F3EFFF] p-4 md:p-6 -mt-[10px]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#222] mb-4">
                Upload Your Resume
              </h1>
              <p className="text-lg text-[#666] max-w-2xl mx-auto">
                Upload your existing resume and we'll automatically extract all the information 
                to create an editable version.
              </p>
            </div>
          </div>

          {/* Upload Area */}
          {!uploadedFile && !isProcessing && (
            <div className="mb-8">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  isDragOver
                    ? 'border-[#5B5BE7] bg-[#F8F6FF]'
                    : 'border-gray-300 hover:border-[#5B5BE7] hover:bg-[#F8F6FF]'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedFormats.join(',')}
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B5BE7] to-[#8B2AE2] rounded-2xl">
                    <FiUpload size={28} className="text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#222] mb-2">
                      Drop your resume here or click to browse
                    </h3>
                    <p className="text-[#666]">
                      Supports PDF, DOC, and DOCX files up to {formatFileSize(maxFileSize)}
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiFile size={20} />
                    Choose File
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <FiAlertTriangle size={20} className="text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Upload Error</h4>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* File Preview */}
          {uploadedFile && !isProcessing && !parsedData && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F8F6FF] rounded-xl">
                      <FiFile size={24} className="text-[#5B5BE7]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222]">{uploadedFile.name}</h3>
                      <p className="text-sm text-[#666]">{uploadedFile.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 text-[#666] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleProcessResume}
                    className="w-full bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Process Resume
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B5BE7] to-[#8B2AE2] rounded-2xl mb-6">
                  <FiLoader size={28} className="text-white animate-spin" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#222] mb-2">
                  Processing Your Resume
                </h3>
                <p className="text-[#666] mb-6">
                  {processingStep}
                </p>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {parsedData && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6">
                  <FiCheck size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#222] mb-2">
                  Resume Processed Successfully!
                </h3>
                <p className="text-[#666] mb-6">
                  We've extracted all your information. Redirecting to the resume builder...
                </p>
                
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Error State with Retry */}
          {error && uploadedFile && !isProcessing && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6">
                  <FiAlertTriangle size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#222] mb-2">
                  Processing Failed
                </h3>
                <p className="text-[#666] mb-6">
                  {error}
                </p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={retryProcessing}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5B5BE7] to-[#8B2AE2] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <FiRefreshCw size={20} />
                    Try Again
                  </button>
                  <button
                    onClick={removeFile}
                    className="px-6 py-3 border border-gray-300 text-[#666] rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Choose Different File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-[#222] mb-4">Tips for Best Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#666]">
              <div className="flex items-start gap-2">
                <FiCheck size={16} className="text-green-500 mt-0.5" />
                <span>Use a well-formatted, text-based resume</span>
              </div>
              <div className="flex items-start gap-2">
                <FiCheck size={16} className="text-green-500 mt-0.5" />
                <span>Avoid image-heavy or overly designed resumes</span>
              </div>
              <div className="flex items-start gap-2">
                <FiCheck size={16} className="text-green-500 mt-0.5" />
                <span>Ensure text is clear and readable</span>
              </div>
              <div className="flex items-start gap-2">
                <FiCheck size={16} className="text-green-500 mt-0.5" />
                <span>Include standard sections (experience, education, skills)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}