'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '../../constants/siteconfig';
import ServiceCard from '../shared/ServiceCard';
import ResumeWritingSection from '../shared/ResumeWritingSection';
import ContactUsSection from '../shared/ContactUsSection';
import ServiceNavigation from '../shared/ServiceNavigation';
import { ServicesConfig } from '../../types/service';

export default function Services() {
  const { services } = SITE_CONFIG;
  const [activeSection, setActiveSection] = useState('recruiters');
  
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <ServiceNavigation onSectionChange={setActiveSection} />
      
      {/* Top spacing to account for fixed navigation */}
      <div className="pt-20 md:pt-24" />
      
      {/* Recruiter Plans Section */}
      <section id="recruiters" className="w-full bg-[#f7f7fa] py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
            {services.recruiterPlans.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.recruiterPlans.plans.map((plan, index) => (
              <ServiceCard
                key={index}
                title={plan.title}
                features={plan.features}
                price={plan.price}
                image={plan.image}
                popular={plan.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Job Seeker Plans Section */}
      <section id="jobseekers" className="w-full bg-white py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
            {services.jobSeekerPlans.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.jobSeekerPlans.plans.map((plan, index) => (
              <ServiceCard
                key={index}
                title={plan.title}
                features={plan.features}
                price={plan.price}
                image={plan.image}
                popular={plan.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Job Seeker Plans Section */}
      <section className="w-full bg-[#f7f7fa] py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.additionalPlans.plans.map((plan, index) => (
              <ServiceCard
                key={index}
                title={plan.title}
                features={plan.features}
                price={plan.price}
                image={plan.image}
                popular={plan.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Resume Writing Section */}
      <section id="resume" className="w-full bg-white">
        <ResumeWritingSection />
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="w-full bg-white">
        <ContactUsSection />
      </section>
    </div>
  );
} 