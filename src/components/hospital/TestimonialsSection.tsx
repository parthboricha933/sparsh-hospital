'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  Baby,
  HeartPulse,
  ShieldCheck,
  Activity,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Testimonial Data ─── */
const testimonials = [
  { name: 'Sneha Kapoor', initials: 'SK', storyKey: 'test.story1', quoteKey: 'test.quote1', treatmentKey: 'test.treatment1', rating: 5, gradientFrom: '#0066FF', gradientTo: '#00D4FF' },
  { name: 'Anjali Rao', initials: 'AR', storyKey: 'test.story2', quoteKey: 'test.quote2', treatmentKey: 'test.treatment2', rating: 5, gradientFrom: '#FF6B8A', gradientTo: '#FF8FA3' },
  { name: 'Deepa & Vikram Shah', initials: 'DS', storyKey: 'test.story3', quoteKey: 'test.quote3', treatmentKey: 'test.treatment3', rating: 5, gradientFrom: '#00E5FF', gradientTo: '#0066FF' },
  { name: 'Lakshmi Nair', initials: 'LN', storyKey: 'test.story4', quoteKey: 'test.quote4', treatmentKey: 'test.treatment4', rating: 5, gradientFrom: '#66B2FF', gradientTo: '#0066FF' },
  { name: 'Ritu Menon', initials: 'RM', storyKey: 'test.story5', quoteKey: 'test.quote5', treatmentKey: 'test.treatment5', rating: 5, gradientFrom: '#00D4FF', gradientTo: '#00E5FF' },
  { name: 'Pritha Banerjee', initials: 'PB', storyKey: 'test.story6', quoteKey: 'test.quote6', treatmentKey: 'test.treatment6', rating: 5, gradientFrom: '#FF6B8A', gradientTo: '#66B2FF' },
];

/* ─── Counter Data ─── */
const trustCounterKeys = [
  { icon: Activity, value: 8500, suffix: '+', labelKey: 'test.surgeries', display: '8.5K+' },
  { icon: Baby, value: 10000, suffix: '+', labelKey: 'test.safeDeliveries', display: '10K+' },
  { icon: HeartPulse, value: 50000, suffix: '+', labelKey: 'test.recoveries', display: '50K+' },
  { icon: TrendingUp, value: 98, suffix: '%', labelKey: 'test.satisfaction', display: '98%' },
];

/* ─── Animated Counter Component ─── */
function TrustCounter({
  icon: Icon,
  value,
  suffix,
  label,
  display,
  delay = 0,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  display?: string;
  delay?: number;
}) {
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
      className="glass-card p-5 sm:p-6 text-center group hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-shadow duration-500 relative overflow-hidden"
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 border border-white/[0.06] flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-shadow duration-500">
        <Icon className="w-5 h-5 text-[#00D4FF]" />
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold gradient-text tabular-nums">
        {display || `${count.toLocaleString()}${suffix}`}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-white/40 font-medium">{label}</div>
    </motion.div>
  );
}

/* ─── Animated Quote Mark ─── */
function AnimatedQuote({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
      className={className}
      style={style}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-[#00D4FF]" fill="rgba(0,212,255,0.08)" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Star Rating ─── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.8 + i * 0.06, type: 'spring', stiffness: 200 }}
        >
          <Star
            className={`w-4 h-4 ${
              i < rating ? 'text-[#00D4FF] fill-[#00D4FF]' : 'text-white/10'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Testimonials Section
   ────────────────────────────────────────────── */
export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-slide with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const currentTestimonial = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* ── Trust-Oriented Soft Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0B1030] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />

      {/* Soft warm radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#0066FF]/[0.03] blur-[140px]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#00D4FF]/[0.03] blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF6B8A]/[0.02] blur-[90px]" />

      {/* Faint concentric trust rings */}
      {[200, 320, 440].map((size, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            border: `1px solid rgba(0, 212, 255, ${0.04 - i * 0.01})`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            {t('test.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('test.heading').split(' ').map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-white/45 max-w-2xl mx-auto leading-relaxed">
            {t('test.description')}
          </p>
          <div className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* ── Trust Counters ── */}
        <div className="mb-14 sm:mb-18">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trustCounterKeys.map((counter, i) => (
              <TrustCounter
                key={counter.labelKey}
                icon={counter.icon}
                value={counter.value}
                suffix={counter.suffix}
                label={t(counter.labelKey)}
                display={counter.display}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* ── Main Testimonial Carousel ── */}
        <div className="max-w-5xl mx-auto">
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Animated Quote Mark – top left */}
            <AnimatedQuote
              className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 z-20 pointer-events-none"
            />

            {/* Animated Quote Mark – bottom right (closing) */}
            <AnimatedQuote
              className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 z-20 pointer-events-none rotate-180"
            />

            {/* Card Container */}
            <div className="relative min-h-[340px] sm:min-h-[300px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="glass-card p-7 sm:p-10 md:p-12 relative overflow-hidden"
                >
                  {/* Top accent gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/25 to-transparent" />

                  {/* Story type badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6B8A]/10 border border-[#FF6B8A]/20">
                      <HeartPulse className="w-3.5 h-3.5 text-[#FF6B8A]" />
                      <span className="text-xs font-semibold text-[#FF6B8A]">
                        {t(currentTestimonial.storyKey)}
                      </span>
                    </div>
                    <StarRating rating={currentTestimonial.rating} />
                  </div>

                  {/* Quote text */}
                  <p className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed italic">
                    &ldquo;{t(currentTestimonial.quoteKey)}&rdquo;
                  </p>

                  {/* Patient info */}
                  <div className="mt-6 sm:mt-8 flex items-center gap-4">
                    {/* Profile Image Circle */}
                    <div
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-white/10 flex-shrink-0 group/avatar"
                      style={{
                        background: `linear-gradient(135deg, ${currentTestimonial.gradientFrom}30, ${currentTestimonial.gradientTo}15)`,
                      }}
                    >
                      <span
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: currentTestimonial.gradientFrom }}
                      >
                        {currentTestimonial.initials}
                      </span>

                      {/* Verified badge */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 text-green-400" />
                      </div>

                      {/* Pulse ring on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 opacity-0 group-hover/avatar:opacity-100"
                        style={{ borderColor: `${currentTestimonial.gradientFrom}40` }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-sm text-[#00D4FF] font-medium">
                        {t(currentTestimonial.treatmentKey)}
                      </p>
                    </div>
                  </div>

                  {/* Bottom decorative gradient */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${currentTestimonial.gradientFrom}20, transparent)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:border-[#00D4FF]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Dots */}
              <div className="flex items-center gap-2.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`rounded-full transition-all duration-500 ${
                      i === current
                        ? 'w-9 h-2.5 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.3)]'
                        : 'w-2.5 h-2.5 bg-white/15 hover:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:border-[#00D4FF]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Auto-slide progress indicator */}
            <div className="mt-4 flex justify-center">
              <div className="w-48 h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  key={current}
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '0%' : '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]"
                  onAnimationComplete={() => {
                    if (!isPaused) next();
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Mini Testimonial Cards (preview strip) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {testimonials.map((testItem, i) => (
              <motion.button
                key={testItem.name}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`glass-card p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  i === current
                    ? 'border-[#00D4FF]/30 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                    : 'hover:border-white/15'
                }`}
              >
                {/* Active accent line */}
                {i === current && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent" />
                )}

                {/* Mini avatar */}
                <div
                  className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${testItem.gradientFrom}25, ${testItem.gradientTo}10)`,
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: testItem.gradientFrom }}
                  >
                    {testItem.initials}
                  </span>
                </div>
                <p className="text-xs font-semibold text-white/80 truncate">{testItem.name}</p>
                <p className="text-[10px] text-white/35 mt-0.5 truncate">{t(testItem.treatmentKey)}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Section transition fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0E27] to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
