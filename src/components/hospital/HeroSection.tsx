'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  ChevronDown,
  Phone,
  Search,
  ShieldCheck,
  Building2,
  Stethoscope,
  Users,
  Clock,
  Heart,
  Star,
} from 'lucide-react';

const MedicalScene = dynamic(() => import('./MedicalScene'), { ssr: false });
const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

/* ─── Data ─── */
const stats = [
  { icon: Building2, value: '25+', label: 'Years of Care' },
  { icon: Users, value: '100+', label: 'Gynecologists' },
  { icon: Clock, value: '24/7', label: 'Emergency' },
  { icon: Heart, value: '50K+', label: 'Happy Mothers' },
];

const trustBadges = [
  'NABH Certified',
  'Gynecology Excellence',
  'Patient Safety Focus',
];

/* ─── Stagger container variant ─── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ──────────────────────────────────────────────
   Main Hero Section
   ────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── 3D Background Layer ── */}
      <div className="absolute inset-0">
        <MedicalScene />
      </div>

      {/* ── Particle Overlay ── */}
      <ParticleBackground />

      {/* ── Gradient overlays for depth & readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/50 via-transparent to-[#0A0E27] z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/70 via-transparent to-[#0A0E27]/40 z-[2]" />

      {/* ── Main Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
          {/* ── Left Column: Headline + CTAs ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4FF]" />
                </span>
                <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
                <span className="text-sm text-white/70 font-medium">
                  {trustBadges.join('  ·  ')}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl font-extrabold leading-[1.08] tracking-tight"
            >
              <span className="text-white">Advanced Care.</span>
              <br />
              <span className="gradient-text">Human Touch.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-5 sm:mt-7 text-base sm:text-lg lg:text-xl text-white/55 max-w-xl leading-relaxed"
            >
              World‑class gynecology & obstetrics care powered by cutting‑edge technology,
              delivered with compassionate healing that puts every woman at the heart of everything we do.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              {/* Primary: Book Appointment */}
              <a
                href="#contact"
                className="btn-glow group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-semibold text-base sm:text-lg transition-all duration-300"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary: Emergency Help */}
              <a
                href="tel:+911234567890"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-red-400/30 bg-red-500/10 text-red-300 hover:text-white hover:border-red-400/60 hover:bg-red-500/20 font-semibold text-base sm:text-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                Emergency Help
              </a>

              {/* Tertiary: Find Doctor */}
              <a
                href="#doctors"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/15 text-white/75 hover:text-white hover:border-[#00D4FF]/50 hover:bg-white/[0.04] font-semibold text-base sm:text-lg transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                Find Doctor
              </a>
            </motion.div>

            {/* Animated Patient Trust Badge */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 inline-flex items-center gap-3"
            >
              {/* Mini avatar stack */}
              <div className="flex -space-x-2.5">
                {['A', 'S', 'R', 'P'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#0066FF]/40 to-[#00D4FF]/40 border-2 border-[#0A0E27] flex items-center justify-center text-[10px] sm:text-xs font-bold text-white/80"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]"
                    />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-white">4.9</span>
                </div>
                <span className="text-xs text-white/40 font-medium">
                  Trusted by 50,000+ mothers & families
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Futuristic Hospital Building Glass Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md xl:max-w-lg">
              {/* Main glass card */}
              <div className="glass-card relative overflow-hidden p-0 rounded-3xl">
                {/* Building visual – gradient art */}
                <div className="relative h-72 xl:h-80 overflow-hidden">
                  {/* Gradient building silhouette */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1333] via-[#111940] to-[#0A0E27]" />
                  {/* Grid overlay – hospital windows */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  {/* Glowing windows */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-sm animate-pulse-glow"
                        style={{
                          width: '10px',
                          height: '10px',
                          left: `${12 + (i % 6) * 15}%`,
                          top: `${18 + Math.floor(i / 6) * 22}%`,
                          background:
                            i % 3 === 0
                              ? 'rgba(0,212,255,0.25)'
                              : i % 3 === 1
                              ? 'rgba(0,102,255,0.2)'
                              : 'rgba(179,229,252,0.15)',
                          animationDelay: `${i * 0.4}s`,
                          animationDuration: `${2.5 + (i % 3)}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Central holographic building outline */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Main tower */}
                      <div className="w-28 xl:w-32 h-44 xl:h-52 rounded-t-lg border border-[#00D4FF]/20 bg-gradient-to-t from-[#00D4FF]/5 to-transparent relative">
                        {/* Spire */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-[#00D4FF]/30 to-[#00D4FF]/70" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.6)]" />
                        {/* Windows grid on tower */}
                        <div className="grid grid-cols-4 gap-2 p-3 pt-4">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-3.5 h-3.5 rounded-[2px] animate-pulse-glow"
                              style={{
                                background: i % 5 === 0 ? 'rgba(0,212,255,0.35)' : 'rgba(0,102,255,0.15)',
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${2 + (i % 4) * 0.5}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Wing left */}
                      <div className="absolute -left-16 bottom-0 w-14 h-24 rounded-t-md border border-[#0066FF]/15 bg-gradient-to-t from-[#0066FF]/5 to-transparent">
                        <div className="grid grid-cols-3 gap-1.5 p-2 pt-3">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-[1px]"
                              style={{
                                background: i % 4 === 0 ? 'rgba(0,212,255,0.3)' : 'rgba(0,102,255,0.12)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Wing right */}
                      <div className="absolute -right-16 bottom-0 w-14 h-20 rounded-t-md border border-[#0066FF]/15 bg-gradient-to-t from-[#0066FF]/5 to-transparent">
                        <div className="grid grid-cols-3 gap-1.5 p-2 pt-3">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-[1px]"
                              style={{
                                background: i % 3 === 0 ? 'rgba(0,212,255,0.3)' : 'rgba(0,102,255,0.12)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Cross symbol on building */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/30 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  {/* Bottom gradient fade into card content */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[rgba(255,255,255,0.05)] to-transparent" />
                </div>

                {/* Card info bar */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Sparsh Gynecology Hospital</h3>
                    <p className="text-xs text-white/40 mt-0.5">
                      Bangalore, India
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">Open Now</span>
                  </div>
                </div>
              </div>

              {/* Floating accent badges around the card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -top-4 -left-4 glass-card px-3.5 py-2.5 flex items-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.2)]"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF]/30 to-[#00D4FF]/30 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">NABH</p>
                  <p className="text-[10px] text-white/40">Certified</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="absolute -bottom-3 -right-3 glass-card px-3.5 py-2.5 flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00D4FF]/30 to-[#0066FF]/30 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">50K+</p>
                  <p className="text-[10px] text-white/40">Patients Served</p>
                </div>
              </motion.div>

              {/* Soft glow behind card */}
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-[#0066FF]/5 blur-[60px]" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Floating Stats Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 mt-auto pb-6 sm:pb-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-5 sm:p-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 group"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 border border-white/[0.06] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-shadow duration-500 flex-shrink-0">
                    <stat.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#00D4FF]" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold gradient-text leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/45 font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-medium">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-[#00D4FF]/60"
          />
        </div>
      </motion.div>

      {/* ── Bottom Fade Gradient → connects to next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/80 to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
