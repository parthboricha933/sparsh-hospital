'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Send,
  CheckCircle,
  Phone,
  PhoneCall,
  CalendarCheck,
  User,
  Clock,
  MessageSquare,
  Stethoscope,
  ShieldCheck,
  Zap,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Data ─── */
const departmentKeys = [
  'dept.obstetrics',
  'dept.surgery',
  'dept.fertility',
  'dept.oncology',
  'dept.menopause',
  'dept.general',
];

const doctorsByDepartmentKey: Record<string, string[]> = {
  'dept.obstetrics': ['Dr. Vijay J. Ladumor', 'Dr. Parita Baldaniya'],
  'dept.surgery': ['Dr. Vijay J. Ladumor'],
  'dept.fertility': ['Dr. Vijay J. Ladumor'],
  'dept.oncology': ['Dr. Vijay J. Ladumor'],
  'dept.menopause': ['Dr. Parita Baldaniya'],
  'dept.general': ['Dr. Vijay J. Ladumor', 'Dr. Parita Baldaniya'],
};

const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
];

/* ─── Animated ECG Background ─── */
function ECGBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const drawECG = () => {
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      ctx.clearRect(0, 0, w, h);

      offsetRef.current += 0.4;

      // Draw multiple ECG lines at different Y positions
      const lines = [
        { y: h * 0.25, amplitude: 12, speed: 1, opacity: 0.08, color: '0, 212, 255' },
        { y: h * 0.5, amplitude: 18, speed: 1.3, opacity: 0.12, color: '0, 212, 255' },
        { y: h * 0.75, amplitude: 10, speed: 0.8, opacity: 0.06, color: '0, 102, 255' },
      ];

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${line.color}, ${line.opacity})`;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < w; x += 2) {
          const progress = (x + offsetRef.current * line.speed) % w;
          const normalized = progress / w;

          // ECG waveform pattern: flat -> P wave -> flat -> QRS complex -> flat -> T wave -> flat
          let y = line.y;
          const cyclePos = (normalized * 4) % 1; // 4 cycles across the width

          if (cyclePos > 0.1 && cyclePos < 0.15) {
            // P wave
            y -= Math.sin(((cyclePos - 0.1) / 0.05) * Math.PI) * line.amplitude * 0.5;
          } else if (cyclePos > 0.2 && cyclePos < 0.22) {
            // Q dip
            y += Math.sin(((cyclePos - 0.2) / 0.02) * Math.PI) * line.amplitude * 0.3;
          } else if (cyclePos > 0.22 && cyclePos < 0.27) {
            // R peak (tall spike)
            y -= Math.sin(((cyclePos - 0.22) / 0.05) * Math.PI) * line.amplitude * 1.8;
          } else if (cyclePos > 0.27 && cyclePos < 0.3) {
            // S dip
            y += Math.sin(((cyclePos - 0.27) / 0.03) * Math.PI) * line.amplitude * 0.4;
          } else if (cyclePos > 0.38 && cyclePos < 0.48) {
            // T wave
            y -= Math.sin(((cyclePos - 0.38) / 0.1) * Math.PI) * line.amplitude * 0.6;
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Add subtle glow dots at QRS peaks
      for (let i = 0; i < 6; i++) {
        const x = ((offsetRef.current * 1.3 + i * (w / 6)) % w);
        const cyclePos = ((x / w) * 4) % 1;
        if (cyclePos > 0.22 && cyclePos < 0.27) {
          const glowIntensity = Math.sin(((cyclePos - 0.22) / 0.05) * Math.PI);
          ctx.beginPath();
          ctx.arc(x, h * 0.5 - 18 * glowIntensity * 1.8, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${0.3 * glowIntensity})`;
          ctx.fill();

          // Glow ring
          ctx.beginPath();
          ctx.arc(x, h * 0.5 - 18 * glowIntensity * 1.8, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${0.06 * glowIntensity})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(drawECG);
    };

    animationRef.current = requestAnimationFrame(drawECG);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}

/* ─── Form Field Wrapper ─── */
function FormField({
  label,
  icon: Icon,
  children,
  delay = 0,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <label className="text-sm text-white/55 font-medium mb-2 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-[#00D4FF]/60" />
        {label}
      </label>
      {children}
    </motion.div>
  );
}

/* ─── Custom Select ─── */
function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
  name,
  displayFn,
}: {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  displayFn?: (option: string) => string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplay = (option: string) => {
    if (displayFn) return displayFn(option);
    return option;
  };

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-left flex items-center justify-between gap-2 transition-all duration-300 text-sm ${
          value
            ? 'border-[#00D4FF]/30 text-white'
            : 'border-white/[0.08] text-white/25 hover:border-white/15'
        } ${isOpen ? 'border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.08)]' : ''}`}
      >
        <span className="truncate">{value ? getDisplay(value) : placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#00D4FF]/50 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 mt-2 w-full rounded-xl bg-[#111940]/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="max-h-52 overflow-y-auto custom-scrollbar py-1.5">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: option } } as React.ChangeEvent<HTMLSelectElement>);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                  value === option
                    ? 'bg-[#00D4FF]/10 text-[#00D4FF] font-medium'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {getDisplay(option)}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Appointment Booking Section
   ────────────────────────────────────────────── */
export default function AppointmentBookingSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const availableDoctors = formData.department
    ? doctorsByDepartmentKey[formData.department] || []
    : [];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        // Reset doctor when department changes
        if (name === 'department') {
          return { ...prev, department: value, doctor: '' };
        }
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          setFormData({ name: '', phone: '', department: '', doctor: '', date: '', time: '', message: '' });
        }, 4000);
      }
    } catch {
      // Still show success to user even if API fails
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', department: '', doctor: '', date: '', time: '', message: '' });
      }, 4000);
    }
  };

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:border-[#00D4FF]/40 focus:shadow-[0_0_15px_rgba(0,212,255,0.08)] focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/20 transition-all duration-300 text-sm';

  return (
    <section
      id="appointment"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1030] via-[#0A0E27] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />

      {/* ECG Background Animation */}
      <ECGBackground />

      {/* Decorative blurs */}
      <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-[#0066FF]/[0.04] blur-[100px]" />
      <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-[#00D4FF]/[0.04] blur-[100px]" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#FF6B8A]/[0.03] blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            {t('appt.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('appt.heading').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-white/45 max-w-2xl mx-auto leading-relaxed">
            {t('appt.description')}
          </p>
          <div className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* ── Main Layout: Form + Side Cards ── */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* ── Left: Appointment Form (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

              {isSubmitted ? (
                /* ── Success State ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#0066FF]/20 border border-[#00D4FF]/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,212,255,0.15)]"
                  >
                    <CheckCircle className="w-10 h-10 text-[#00D4FF]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">
                    {t('appt.successTitle')}
                  </h3>
                  <p className="text-white/50 mt-3 max-w-sm leading-relaxed">
                    {t('appt.successMsg')}
                  </p>
                  <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-medium text-green-400">
                      {t('appt.confirmNote')}
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label={t('appt.patientName')} icon={User} delay={0.05}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder={t('appt.namePlaceholder')}
                        className={`${inputBase} ${
                          focusedField === 'name' ? 'shadow-[0_0_20px_rgba(0,212,255,0.1)]' : ''
                        }`}
                      />
                    </FormField>

                    <FormField label={t('appt.phoneNum')} icon={Phone} delay={0.1}>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        required
                        placeholder={t('appt.phonePlaceholder')}
                        className={`${inputBase} ${
                          focusedField === 'phone' ? 'shadow-[0_0_20px_rgba(0,212,255,0.1)]' : ''
                        }`}
                      />
                    </FormField>
                  </div>

                  {/* Row 2: Department + Doctor */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label={t('appt.deptField')} icon={Stethoscope} delay={0.15}>
                      <CustomSelect
                        options={departmentKeys}
                        placeholder={t('appt.deptPlaceholder')}
                        value={formData.department}
                        onChange={handleChange}
                        name="department"
                        displayFn={(option) => t(option)}
                      />
                    </FormField>

                    <FormField
                      label={t('appt.prefDoctor')}
                      icon={User}
                      delay={0.2}
                    >
                      <CustomSelect
                        options={availableDoctors}
                        placeholder={
                          formData.department
                            ? t('appt.doctorPlaceholder')
                            : t('appt.deptFirstPlaceholder')
                        }
                        value={formData.doctor}
                        onChange={handleChange}
                        name="doctor"
                      />
                    </FormField>
                  </div>

                  {/* Row 3: Date + Time */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField label={t('appt.prefDate')} icon={CalendarCheck} delay={0.25}>
                      <div className="relative">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('date')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`${inputBase} ${
                            focusedField === 'date' ? 'shadow-[0_0_20px_rgba(0,212,255,0.1)]' : ''
                          }`}
                        />
                      </div>
                    </FormField>

                    <FormField label={t('appt.prefTime')} icon={Clock} delay={0.3}>
                      <CustomSelect
                        options={timeSlots}
                        placeholder={t('appt.timePlaceholder')}
                        value={formData.time}
                        onChange={handleChange}
                        name="time"
                      />
                    </FormField>
                  </div>

                  {/* Row 4: Message */}
                  <FormField label={t('appt.messageField')} icon={MessageSquare} delay={0.35}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      placeholder={t('appt.msgPlaceholder')}
                      className={`${inputBase} resize-none ${
                        focusedField === 'message' ? 'shadow-[0_0_20px_rgba(0,212,255,0.1)]' : ''
                      }`}
                    />
                  </FormField>

                  {/* ── Glowing Submit Button ── */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 overflow-hidden group"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#0044CC] to-[#0066FF] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

                    {/* Glow layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(0,212,255,0.2),0_0_40px_rgba(0,212,255,0.3)]" />

                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

                    <span className="relative z-10 flex items-center gap-2.5 text-white">
                      <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                      {t('appt.bookBtn')}
                    </span>
                  </motion.button>

                  {/* Privacy note */}
                  <p className="text-center text-white/25 text-xs flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    {t('appt.privacyNote')}
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right: Emergency Call Card + Online Consultation Badge ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* ── Emergency Call Card ── */}
            <div className="glass-card p-6 sm:p-7 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(255,68,68,0.1)] transition-shadow duration-500">
              {/* Red accent top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-400/40 to-transparent" />

              {/* Pulsing background circle */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-red-500/[0.06] group-hover:bg-red-500/[0.1] transition-all duration-500" />

              <div className="relative z-10">
                {/* Emergency icon */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(255,68,68,0.1)]"
                >
                  <PhoneCall className="w-7 h-7 text-red-400" />
                </motion.div>

                <h3 className="text-lg font-bold text-white">
                  {t('appt.emergencyTitle')}
                </h3>
                <p className="text-white/45 text-sm mt-2 leading-relaxed">
                  {t('appt.emergencyDesc')}
                </p>

                {/* Phone number */}
                <a
                  href="tel:+911234567890"
                  className="mt-5 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:text-white hover:border-red-400/50 hover:bg-red-500/20 transition-all duration-300 group/phone"
                >
                  <Phone className="w-4.5 h-4.5 animate-pulse" />
                  <span className="font-bold text-base tracking-wide">
                    +91 123 456 7890
                  </span>
                </a>

                {/* Availability indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                  <span className="text-xs text-green-400/80 font-medium">
                    {t('appt.emergencyLine')}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Quick Info Cards ── */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass-card p-4 text-center group hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-shadow duration-500"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 flex items-center justify-center mb-2.5 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-shadow duration-500">
                  <Clock className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div className="text-lg font-bold gradient-text">30 Min</div>
                <div className="text-[11px] text-white/35 mt-0.5">{t('appt.avgWait')}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="glass-card p-4 text-center group hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-shadow duration-500"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-[#FF6B8A]/15 to-[#FF8FA3]/15 flex items-center justify-center mb-2.5 group-hover:shadow-[0_0_15px_rgba(255,107,138,0.15)] transition-shadow duration-500">
                  <Zap className="w-5 h-5 text-[#FF6B8A]" />
                </div>
                <div className="text-lg font-bold gradient-text-warm">{t('appt.sameDay')}</div>
                <div className="text-[11px] text-white/35 mt-0.5">{t('appt.urgentSlots')}</div>
              </motion.div>
            </div>

            {/* ── Assurance note ── */}
            <div className="glass-card p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#00D4FF]/60 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] sm:text-xs text-white/35 leading-relaxed">
                {t('appt.assuranceNote')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Section transition fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0E27] to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
