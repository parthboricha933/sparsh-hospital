'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Baby,
  ScanLine,
  Scissors,
  Sparkles,
  Heart,
  Stethoscope,
  ShieldCheck,
  Activity,
  Microscope,
  Syringe,
  Dna,
  FlaskConical,
  Pill,
  ClipboardCheck,
  UserCheck,
  TestTube2,
  Building2,
  Award,
  Users,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Animated Counter Component ─── */
function AchievementCounter({
  icon: Icon,
  value,
  suffix,
  labelKey,
  display,
  delay = 0,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  labelKey: string;
  display?: string;
  delay?: number;
}) {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasStarted = useRef(false);

  const start = useCallback(() => {
    const duration = 2200;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (current >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, stepTime);
    return timer;
  }, [value]);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const timer = start();
      return () => clearInterval(timer);
    }
  }, [isInView, start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 sm:p-8 text-center group hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-shadow duration-500 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Glow orb */}
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/5 blur-[30px] transition-all duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 border border-white/[0.06] flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-shadow duration-500">
          <Icon className="w-6 h-6 text-[#00D4FF]" />
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold gradient-text tabular-nums">
          {display || `${count.toLocaleString()}${suffix}`}
        </div>
        <div className="mt-2 text-sm text-white/40 font-medium">{t(labelKey)}</div>
      </div>
    </motion.div>
  );
}

/* ─── Specialty Tab Data ─── */
const specialtyTabs = [
  {
    key: 'obstetrics',
    icon: Baby,
    titleKey: 'womens.tabObstetrics',
    descKey: 'womens.tabObstetricsDesc',
    color: '#00D4FF',
  },
  {
    key: 'sonography',
    icon: ScanLine,
    titleKey: 'womens.tabSonography',
    descKey: 'womens.tabSonographyDesc',
    color: '#0066FF',
  },
  {
    key: 'laparoscopy',
    icon: Scissors,
    titleKey: 'womens.tabLaparoscopy',
    descKey: 'womens.tabLaparoscopyDesc',
    color: '#00E5FF',
  },
  {
    key: 'infertility',
    icon: Sparkles,
    titleKey: 'womens.tabInfertility',
    descKey: 'womens.tabInfertilityDesc',
    color: '#FF6B8A',
  },
];

/* ─── Facilities Data ─── */
const facilities = [
  { icon: Heart, titleKey: 'womens.fac1' },
  { icon: Baby, titleKey: 'womens.fac2' },
  { icon: Scissors, titleKey: 'womens.fac3' },
  { icon: ClipboardCheck, titleKey: 'womens.fac4' },
  { icon: Stethoscope, titleKey: 'womens.fac5' },
  { icon: ShieldCheck, titleKey: 'womens.fac6' },
  { icon: ScanLine, titleKey: 'womens.fac7' },
  { icon: Sparkles, titleKey: 'womens.fac8' },
  { icon: Dna, titleKey: 'womens.fac9' },
  { icon: Syringe, titleKey: 'womens.fac10' },
  { icon: Microscope, titleKey: 'womens.fac11' },
  { icon: Activity, titleKey: 'womens.fac12' },
  { icon: TestTube2, titleKey: 'womens.fac13' },
  { icon: UserCheck, titleKey: 'womens.fac14' },
  { icon: Building2, titleKey: 'womens.fac15' },
  { icon: FlaskConical, titleKey: 'womens.fac16' },
];

/* ─── Achievement Counters ─── */
const achievementCounters = [
  { icon: Baby, value: 5000, suffix: '+', labelKey: 'womens.counterDeliveries', display: '5000+' },
  { icon: Scissors, value: 500, suffix: '+', labelKey: 'womens.counterSurgeries', display: '500+' },
  { icon: Users, value: 105000, suffix: '+', labelKey: 'womens.counterOPD', display: '105000+' },
  { icon: Sparkles, value: 1500, suffix: '+', labelKey: 'womens.counterFertility', display: '1500+' },
];

/* ──────────────────────────────────────────────
   Women's Health Section
   ────────────────────────────────────────────── */
export default function WomensHealthSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('obstetrics');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="womens-health"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0B1030] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />

      {/* Soft radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#0066FF]/[0.03] blur-[140px]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#00D4FF]/[0.03] blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF6B8A]/[0.02] blur-[90px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            {t('womens.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {t('womens.heading').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-white/45 max-w-2xl mx-auto leading-relaxed">
            {t('womens.description')}
          </p>
          <div className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* ── Doctor Information Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass-card p-8 sm:p-10 relative overflow-hidden">
            {/* Top accent gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />

            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00D4FF]/5 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#0066FF]/5 blur-[60px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Doctor Avatar */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-white/10 overflow-hidden relative group">
                  <img
                    src="/dr-vijay-ladumor.jpeg"
                    alt="Dr. Vijay J. Ladumor"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-[#00D4FF]/20"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Verified badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center z-10">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {t('womens.docName')}
                </h3>
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00D4FF] text-sm font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    {t('womens.docDegree')}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
                    {t('womens.docSpecialty1')}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
                    {t('womens.docSpecialty2')}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
                    {t('womens.docSpecialty3')}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-shrink-0 grid grid-cols-2 gap-3">
                <div className="glass p-4 rounded-xl text-center min-w-[100px]">
                  <div className="text-xl font-bold gradient-text">15+</div>
                  <div className="text-xs text-white/40">{t('womens.docYears')}</div>
                </div>
                <div className="glass p-4 rounded-xl text-center min-w-[100px]">
                  <div className="text-xl font-bold gradient-text">5000+</div>
                  <div className="text-xs text-white/40">{t('womens.docDeliveries')}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Specialty Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {specialtyTabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)] border border-[#00D4FF]/20'
                    : 'glass text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {t(tab.titleKey)}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl mx-auto">
            {specialtyTabs.map((tab) => (
              activeTab === tab.key && (
                <motion.div
                  key={tab.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-8 sm:p-10 text-center relative overflow-hidden"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />
                  
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 border border-white/10 flex items-center justify-center">
                    <tab.icon className="w-8 h-8 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{t(tab.titleKey)}</h3>
                  <p className="text-white/60 leading-relaxed">{t(tab.descKey)}</p>
                </motion.div>
              )
            ))}
          </div>
        </motion.div>

        {/* ── Hospital Facilities ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
              {t('womens.facSubtitle')}
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              {t('womens.facHeading')}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facilities.map((fac, i) => (
              <motion.div
                key={fac.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-4 sm:p-5 flex items-start gap-3 group cursor-default relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/5 blur-[20px] transition-all duration-500" />

                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 border border-white/[0.06] flex items-center justify-center group-hover:shadow-[0_0_12px_rgba(0,212,255,0.15)] transition-shadow duration-500">
                  <fac.icon className="w-4.5 h-4.5 text-[#00D4FF]" />
                </div>
                <div className="relative z-10">
                  <span className="text-sm text-white/80 font-medium leading-snug">{t(fac.titleKey)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Achievement Counter Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-14"
        >
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
              {t('womens.counterSubtitle')}
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              {t('womens.counterHeading')}
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {achievementCounters.map((counter, i) => (
              <AchievementCounter
                key={counter.labelKey}
                icon={counter.icon}
                value={counter.value}
                suffix={counter.suffix}
                labelKey={counter.labelKey}
                display={counter.display}
                delay={i * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Trust Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="glass-card p-8 sm:p-10 relative overflow-hidden">
            {/* Accent lines */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF]/15 to-transparent" />

            <div className="relative z-10">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 border border-white/[0.06] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#00D4FF]" />
              </div>
              <p className="text-lg sm:text-xl text-white/75 leading-relaxed font-medium">
                {t('womens.trustStatement')}
              </p>
              <div className="mt-5 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
                <span className="text-sm text-[#00D4FF]/70 font-medium">{t('womens.trustBadge')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Section transition fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0E27] to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
