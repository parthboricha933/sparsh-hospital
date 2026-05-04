'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage, isGatewayDismissed, t } = useLanguage();

  if (!isGatewayDismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-20 right-4 sm:right-6 z-[60]"
    >
      <div className="glass-card flex items-center gap-0.5 p-1 rounded-full">
        <motion.button
          onClick={() => setLanguage('en')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
            language === 'en'
              ? 'bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          <Globe className="w-3 h-3" />
          English
        </motion.button>

        <div className="w-px h-4 bg-white/10" />

        <motion.button
          onClick={() => setLanguage('gu')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
            language === 'gu'
              ? 'bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]'
              : 'text-white/50 hover:text-white/80 hover:bg-white/5'
          }`}
          style={{ fontFamily: "'Noto Sans Gujarati', 'Noto Sans SC', sans-serif" }}
        >
          <Globe className="w-3 h-3" />
          ગુજરાતી
        </motion.button>
      </div>
    </motion.div>
  );
}
