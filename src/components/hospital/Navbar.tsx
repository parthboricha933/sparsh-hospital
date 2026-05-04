'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#specialities' },
    { name: t('nav.womensHealth'), href: '#womens-health' },
    { name: t('nav.doctors'), href: '#doctors' },
    { name: t('nav.appointment'), href: '#appointment' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0E27]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <img
                src="/dr-vijay-ladumor.jpeg"
                alt="Dr. Vijay Ladumor - Sparsh Hospital"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#00D4FF]/30 group-hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] group-hover:border-[#00D4FF]/60 transition-all duration-300"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight">
                <span className="text-white">Sparsh</span>{' '}
                <span className="text-[#00D4FF]">Hospital</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-[#00D4FF] transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>{t('nav.emergency')}</span>
              </a>
              <a
                href="#appointment"
                className="btn-glow px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white text-sm font-semibold"
              >
                {t('nav.bookAppointment')}
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-[#0D1333]/95 backdrop-blur-2xl border-l border-white/10 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <img src="/dr-vijay-ladumor.jpeg" alt="Dr. Vijay Ladumor - Sparsh Hospital" className="w-7 h-7 rounded-full object-cover border border-[#00D4FF]/30" />
                    <span className="text-lg font-bold">
                      <span className="text-white">Sparsh</span>{' '}
                      <span className="text-[#00D4FF]">Hospital</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white/70 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <a
                    href="#appointment"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-glow w-full text-center py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-semibold"
                  >
                    {t('nav.bookAppointment')}
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-[#00D4FF] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {t('nav.emergencyFull')}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
