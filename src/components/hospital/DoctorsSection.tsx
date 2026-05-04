'use client';

import { motion } from 'framer-motion';
import { User, Star, Award, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const doctors = [
  {
    name: 'Dr. Vijay J. Ladumor',
    specKey: 'docs.doc1Spec',
    experience: '15+ Years',
    qualification: 'M.B.D.G.O',
    isFounder: true,
    gradientFrom: '#0066FF',
    gradientTo: '#00D4FF',
    photo: '/dr-vijay-ladumor.jpeg',
  },
  {
    name: 'Dr. Parita Baldaniya',
    specKey: 'docs.doc2Spec',
    experience: 'BHMS',
    qualification: 'BHMS',
    isFounder: false,
    gradientFrom: '#00E5FF',
    gradientTo: '#0066FF',
    photo: null,
  },
];

export default function DoctorsSection() {
  const { t } = useLanguage();

  return (
    <section id="doctors" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            {t('docs.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('docs.heading').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            {t('docs.description')}
          </p>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* Doctors Grid - 2 columns */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="glass-card p-8 text-center group cursor-default relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/5 blur-[30px] transition-all duration-500" />
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Avatar */}
                <div
                  className="w-24 h-24 mx-auto mb-5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#00D4FF]/30 transition-colors duration-300 relative overflow-hidden"
                  style={doc.photo ? {} : {
                    background: `linear-gradient(135deg, ${doc.gradientFrom}20, ${doc.gradientTo}15)`,
                  }}
                >
                  {doc.photo ? (
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-[#00D4FF]" />
                  )}

                  {/* Verified badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center z-10">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  </div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100"
                    style={{ borderColor: `${doc.gradientFrom}30` }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                <h3 className="text-xl font-bold text-white">{doc.name}</h3>
                <p className="text-[#00D4FF] font-medium text-sm mt-1">{t(doc.specKey)}</p>
                <p className="text-white/40 text-xs mt-1">{doc.qualification}</p>

                {/* Founder badge for Dr. Vijay */}
                {doc.isFounder && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-xs text-[#00D4FF] font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    {t('docs.founder')}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {doc.experience} {t('docs.exp')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
