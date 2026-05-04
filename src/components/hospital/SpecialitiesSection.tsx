'use client';

import { motion } from 'framer-motion';
import {
  Baby,
  HeartPulse,
  Sparkles,
  ScanLine,
  Pill,
  Stethoscope,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const specialities = [
  { icon: Baby, titleKey: 'spec.obstetrics', descKey: 'spec.obstetricsDesc' },
  { icon: HeartPulse, titleKey: 'spec.surgery', descKey: 'spec.surgeryDesc' },
  { icon: Sparkles, titleKey: 'spec.fertility', descKey: 'spec.fertilityDesc' },
  { icon: ScanLine, titleKey: 'spec.oncology', descKey: 'spec.oncologyDesc' },
  { icon: Pill, titleKey: 'spec.menopause', descKey: 'spec.menopauseDesc' },
  { icon: Stethoscope, titleKey: 'spec.general', descKey: 'spec.generalDesc' },
];

export default function SpecialitiesSection() {
  const { t } = useLanguage();

  return (
    <section id="specialities" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1030] via-[#0A0E27] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            {t('spec.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('spec.heading').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            {t('spec.description')}
          </p>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((spec, i) => (
            <motion.div
              key={spec.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="glass-card p-6 sm:p-8 group cursor-default relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#0066FF]/5 to-[#00D4FF]/5" />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/5 blur-[40px] transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 flex items-center justify-center mb-5 group-hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-shadow duration-500">
                  <spec.icon className="w-7 h-7 text-[#00D4FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t(spec.titleKey)}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{t(spec.descKey)}</p>
                <div className="mt-4 flex items-center gap-1 text-[#00D4FF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t('spec.learnMore')}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
