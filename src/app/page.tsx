'use client';

import { motion } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/hospital/Navbar';
import HeroSection from '@/components/hospital/HeroSection';
import AboutSection from '@/components/hospital/AboutSection';
import SpecialitiesSection from '@/components/hospital/SpecialitiesSection';
import WomensHealthSection from '@/components/hospital/WomensHealthSection';
import DoctorsSection from '@/components/hospital/DoctorsSection';
import StatsSection from '@/components/hospital/StatsSection';
import ContactSection from '@/components/hospital/ContactSection';
import AppointmentBookingSection from '@/components/hospital/AppointmentBookingSection';
import WhyChooseSection from '@/components/hospital/WhyChooseSection';
import Footer from '@/components/hospital/Footer';
import LanguageGateway from '@/components/hospital/LanguageGateway';
import LanguageToggle from '@/components/hospital/LanguageToggle';

export default function Home() {
  return (
    <LanguageProvider>
      <LanguageGateway />
      <LanguageToggle />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0A0E27]"
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SpecialitiesSection />
          <WomensHealthSection />
          <DoctorsSection />
          <StatsSection />
          <WhyChooseSection />
          <AppointmentBookingSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </LanguageProvider>
  );
}
