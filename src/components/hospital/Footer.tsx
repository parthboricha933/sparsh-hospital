'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUp, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const quickLinkKeys = [
  { key: 'footer.home', href: '#home' },
  { key: 'footer.aboutUs', href: '#about' },
  { key: 'footer.services', href: '#specialities' },
  { key: 'footer.ourDoctors', href: '#doctors' },
  { key: 'footer.testimonials', href: '#testimonials' },
  { key: 'footer.bookAppt', href: '#contact' },
];

const specialityKeys = [
  'dept.obstetrics',
  'dept.surgery',
  'dept.fertility',
  'dept.oncology',
  'dept.menopause',
  'dept.general',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider" />

      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1333] to-[#070A1F]" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-[#0066FF]/5 blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#00D4FF]/3 blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 sm:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Hospital Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 mb-5">
              <img
                src="/logo.png"
                alt="Sparsh Hospital Logo"
                className="w-9 h-9 rounded-lg object-contain shadow-[0_0_15px_rgba(0,102,255,0.4)]"
              />
              <span className="text-xl font-bold">
                <span className="text-white">Sparsh</span>{' '}
                <span className="text-[#00D4FF]">Gynecology</span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00D4FF] hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {quickLinkKeys.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.ourServices')}</h3>
            <ul className="space-y-2.5">
              {specialityKeys.map((specKey) => (
                <li key={specKey}>
                  <a
                    href="#specialities"
                    className="text-white/40 hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {t(specKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/60 text-sm">+91 123 456 7890</p>
                  <p className="text-white/30 text-xs">{t('footer.emergency247')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-sm">info@sparshhospital.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-sm">
                  {t('footer.address')}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs sm:text-sm">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/50 transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white/50 transition-colors">{t('footer.termsOfService')}</a>
            <a href="#" className="hover:text-white/50 transition-colors">{t('footer.cookiePolicy')}</a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-shadow duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  );
}
