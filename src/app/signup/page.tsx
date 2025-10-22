'use client';
import React, { useRef, useState } from 'react';
import TextInput from '@/components/shared/TextInput';
import { SITE_CONFIG } from '@/constants/siteconfig';
import SignupLayout from '@/components/Signup/Layout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [workStatus, setWorkStatus] = useState<'fresher' | 'experienced'>('fresher');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {signup}=useAuth()
  const router=useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup("test","test@abc.com","1111")
    router.push('/home')
    // handle signup logic here
  };

  return (
    <SignupLayout
      workStatus={workStatus}
      setWorkStatus={setWorkStatus}
      fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <TextInput
          id="fullName"
          label={SITE_CONFIG.signup.fullNameLabel}
          required
          placeholder={SITE_CONFIG.signup.fullNamePlaceholder}
          helperText={SITE_CONFIG.signup.fullNameHelper}
        />
        <TextInput
          id="email"
          label={SITE_CONFIG.signup.emailLabel}
          type="email"
          required
          placeholder={SITE_CONFIG.signup.emailPlaceholder}
          helperText={SITE_CONFIG.signup.emailHelper}
        />
        <TextInput
          id="password"
          label={SITE_CONFIG.signup.passwordLabel}
          type="password"
          required
          placeholder={SITE_CONFIG.signup.passwordPlaceholder}
          helperText={SITE_CONFIG.signup.passwordHelper}
        />
        <TextInput
          id="phone"
          label={SITE_CONFIG.signup.phoneLabel}
          type="tel"
          required
          placeholder={SITE_CONFIG.signup.phonePlaceholder}
          helperText={SITE_CONFIG.signup.phoneHelper}
        />
      </div>
    </SignupLayout>
  );
} 