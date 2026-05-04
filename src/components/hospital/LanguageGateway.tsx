'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageGateway() {
  const { isGatewayDismissed, dismissGateway, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (lang: 'en' | 'gu') => {
    setLanguage(lang);
    dismissGateway();
  };

  return (
    <AnimatePresence>
      {!isGatewayDismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-[#0A0E27]" />

          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 2 === 0 ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 102, 255, 0.15)',
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Subtle glow rings */}
          <motion.div
            className="absolute rounded-full border border-[#00D4FF]/10"
            style={{ width: 500, height: 500 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full border border-[#0066FF]/10"
            style={{ width: 700, height: 700 }}
            animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Main content card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="relative z-10 glass-strong rounded-3xl p-8 sm:p-12 md:p-16 max-w-lg w-[90%] text-center"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent" />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full border-2 border-[#00D4FF]/30 shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden">
                <img
                  src="/dr-vijay-ladumor.jpeg"
                  alt="Dr. Vijay Ladumor - Sparsh Hospital"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* English welcome */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Welcome to Sparsh Hospital
              </h1>
              <p className="text-white/50 text-sm sm:text-base mb-8">
                Please Select Your Preferred Language
              </p>
            </motion.div>

            {/* Gujarati welcome */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00D4FF] mb-2" style={{ fontFamily: "'Noto Sans Gujarati', 'Noto Sans SC', sans-serif" }}>
                સ્પર્શ હોસ્પિટલમાં આપનું સ્વાગત છે
              </h2>
              <p className="text-white/40 text-sm sm:text-base mb-10" style={{ fontFamily: "'Noto Sans Gujarati', 'Noto Sans SC', sans-serif" }}>
                કૃપા કરીને તમારી પસંદગીની ભાષા પસંદ કરો
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="w-24 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent"
            />

            {/* Language buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
            >
              {/* English Button */}
              <motion.button
                onClick={() => handleLanguageSelect('en')}
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0, 212, 255, 0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-10 py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-bold text-lg overflow-hidden transition-all duration-300"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Globe className="w-5 h-5" />
                  English
                </span>
              </motion.button>

              {/* Gujarati Button */}
              <motion.button
                onClick={() => handleLanguageSelect('gu')}
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0, 212, 255, 0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-10 py-4 rounded-2xl border-2 border-[#00D4FF]/40 bg-[#00D4FF]/5 text-[#00D4FF] font-bold text-lg hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/60 transition-all duration-300 overflow-hidden"
                style={{ fontFamily: "'Noto Sans Gujarati', 'Noto Sans SC', sans-serif" }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#00D4FF]/10 to-transparent skew-x-12" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Globe className="w-5 h-5" />
                  ગુજરાતી
                </span>
              </motion.button>
            </motion.div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
