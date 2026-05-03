'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown } from 'lucide-react';

const MedicalScene = dynamic(() => import('./MedicalScene'), { ssr: false });
const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

const stats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '200+', label: 'Expert Doctors' },
  { value: '50+', label: 'Specialities' },
  { value: '100K+', label: 'Happy Patients' },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <MedicalScene />
      </div>

      {/* Particle Overlay */}
      <ParticleBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/40 via-transparent to-[#0A0E27] z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/60 via-transparent to-[#0A0E27]/60 z-[2]" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-sm text-white/70 font-medium">
              Advanced Multispeciality Hospital
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          >
            Redefining Healthcare
            <br />
            with{' '}
            <span className="gradient-text">Precision</span>
            <br />
            & <span className="gradient-text">Compassion</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 sm:mt-8 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            Sparsh Hospital — Where advanced technology meets world-class care.
            Experience healthcare that puts you at the center of everything we do.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-semibold text-lg transition-all duration-300"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#specialities"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#00D4FF]/50 hover:bg-white/5 font-semibold text-lg transition-all duration-300"
            >
              Explore Specialities
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 mt-auto pb-8 sm:pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-white/50 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
