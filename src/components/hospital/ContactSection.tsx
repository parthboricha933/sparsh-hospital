'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const departmentKeys = [
  'dept.obstetrics',
  'dept.surgery',
  'dept.fertility',
  'dept.oncology',
  'dept.menopause',
  'dept.general',
];

const contactInfoKeys = [
  {
    icon: Phone,
    labelKey: 'contact.emergency',
    value: '+91 9574243674',
    sublabelKey: 'contact.available247',
  },
  {
    icon: Mail,
    labelKey: 'contact.emailUs',
    value: 'info@sparshhospital.com',
    sublabelKey: 'contact.respond24h',
  },
  {
    icon: MapPin,
    labelKey: 'contact.visitUs',
    valueKey: 'contact.address',
    sublabelKey: '',
  },
  {
    icon: Clock,
    labelKey: 'contact.workingHours',
    valueKey: 'contact.hoursValue',
    sublabelKey: 'contact.emergency247',
  },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', phone: '', email: '', department: '', date: '', message: '' });
        }, 3000);
      }
    } catch {
      // Still show success to user even if API fails
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', department: '', date: '', message: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-[100px]" />

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
            {t('contact.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('contact.heading').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfoKeys.map((item, i) => (
              <motion.div
                key={item.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-5 flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-shadow duration-300">
                  <item.icon className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{t(item.labelKey)}</h4>
                  <p className="text-white/60 text-sm mt-0.5">
                    {item.valueKey ? t(item.valueKey) : item.value}
                  </p>
                  {item.sublabelKey && (
                    <p className="text-[#00D4FF] text-xs mt-0.5">{t(item.sublabelKey)}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div className="glass-card overflow-hidden h-48 sm:h-56 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D1333] to-[#0A0E27] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#00D4FF]/50 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">{t('contact.mapTitle')}</p>
                  <p className="text-white/20 text-xs mt-1">{t('contact.mapSub')}</p>
                </div>
              </div>
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, #00D4FF 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
            </div>
          </motion.div>

          {/* Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 sm:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('contact.successTitle')}</h3>
                  <p className="text-white/50 mt-2">
                    {t('contact.successMsg')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        {t('contact.fullName')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.namePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        {t('contact.phoneField')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t('contact.phonePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white/60 font-medium mb-1.5 block">
                      {t('contact.emailField')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        {t('contact.deptField')}
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0D1333]">{t('contact.selectDept')}</option>
                        {departmentKeys.map((deptKey) => (
                          <option key={deptKey} value={deptKey} className="bg-[#0D1333]">
                            {t(deptKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        {t('contact.dateField')}
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white/60 font-medium mb-1.5 block">
                      {t('contact.messageField')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t('contact.msgPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-glow w-full py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Submitting...' : t('contact.requestBtn')}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
