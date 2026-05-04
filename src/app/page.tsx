'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/hospital/Navbar';
import HeroSection from '@/components/hospital/HeroSection';
import AboutSection from '@/components/hospital/AboutSection';
import SpecialitiesSection from '@/components/hospital/SpecialitiesSection';
import DoctorsSection from '@/components/hospital/DoctorsSection';
import StatsSection from '@/components/hospital/StatsSection';
import TestimonialsSection from '@/components/hospital/TestimonialsSection';
import ContactSection from '@/components/hospital/ContactSection';
import AppointmentBookingSection from '@/components/hospital/AppointmentBookingSection';
import Footer from '@/components/hospital/Footer';

export default function Home() {
  return (
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
        <DoctorsSection />
        <StatsSection />
        <TestimonialsSection />
        <AppointmentBookingSection />
        <ContactSection />
      </main>
      <Footer />
    </motion.div>
  );
}
