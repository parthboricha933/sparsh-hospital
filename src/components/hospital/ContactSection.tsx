'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const departments = [
  'Obstetrics & Maternity',
  'Gynecologic Surgery',
  'Fertility & IVF',
  'Gynecologic Oncology',
  'Urogynecology',
  'Menopause & Wellness',
  'Reproductive Endocrinology',
  'General Gynecology',
];

const contactInfo = [
  {
    icon: Phone,
    label: 'Emergency',
    value: '+91 123 456 7890',
    sublabel: '24/7 Available',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@sparshhospital.com',
    sublabel: 'We respond within 24h',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: '123 Healthcare Avenue, Bangalore, Karnataka 560001',
    sublabel: '',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon-Sat: 8:00 AM - 10:00 PM',
    sublabel: 'Emergency: 24/7',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    date: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', department: '', date: '', message: '' });
    }, 3000);
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
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            Book an <span className="gradient-text">Appointment</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Schedule a consultation with our specialists. We&apos;re here to help you
            take the first step towards better health.
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
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
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
                  <h4 className="font-semibold text-white text-sm">{item.label}</h4>
                  <p className="text-white/60 text-sm mt-0.5">{item.value}</p>
                  {item.sublabel && (
                    <p className="text-[#00D4FF] text-xs mt-0.5">{item.sublabel}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div className="glass-card overflow-hidden h-48 sm:h-56 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D1333] to-[#0A0E27] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#00D4FF]/50 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">Sparsh Hospital</p>
                  <p className="text-white/20 text-xs mt-1">Bangalore, India</p>
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
                  <h3 className="text-xl font-bold text-white">Appointment Requested!</h3>
                  <p className="text-white/50 mt-2">
                    We&apos;ll contact you shortly to confirm your appointment.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white/60 font-medium mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        Department *
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0D1333]">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept} className="bg-[#0D1333]">
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-white/60 font-medium mb-1.5 block">
                        Preferred Date
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
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your condition or any specific requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00D4FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/30 transition-all duration-300 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-glow w-full py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-semibold text-base flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Request Appointment
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
