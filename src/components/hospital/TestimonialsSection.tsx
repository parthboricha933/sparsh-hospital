'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sneha Kapoor',
    treatment: 'High-Risk Pregnancy & Delivery',
    quote:
      'The obstetrics team at Sparsh made my high-risk pregnancy feel safe and manageable. From weekly monitoring to the final delivery, every doctor and nurse treated me with genuine warmth. My baby and I are thriving thanks to them.',
  },
  {
    name: 'Anjali Rao',
    treatment: 'Laparoscopic Fibroid Surgery',
    quote:
      'After years of painful fibroids, the minimally invasive surgery at Sparsh changed my life. I was home in two days and recovered in weeks, not months. The surgical team is truly exceptional and so compassionate.',
  },
  {
    name: 'Deepa & Vikram Shah',
    treatment: 'IVF Treatment',
    quote:
      'We had almost given up hope after multiple failed attempts elsewhere. The fertility team at Sparsh gave us a personalised protocol and constant emotional support. Today we hold our beautiful daughter — we owe them everything.',
  },
  {
    name: 'Lakshmi Nair',
    treatment: 'Gynecologic Oncology',
    quote:
      'Being diagnosed with cervical cancer was terrifying, but the oncology team at Sparsh guided me through every step — from surgery to recovery. They treated me like family, not just a patient. Forever grateful.',
  },
  {
    name: 'Ritu Menon',
    treatment: 'Menopause Management',
    quote:
      'The menopause wellness programme at Sparsh helped me navigate a very difficult phase with dignity and confidence. The holistic approach — medical, emotional, and lifestyle support — made all the difference.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#0066FF]/5 blur-[100px]" />

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
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            What Our Patients <span className="gradient-text">Say</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="glass-card p-8 sm:p-10 md:p-12"
              >
                <Quote className="w-10 h-10 text-[#0066FF]/30 mb-4" />
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF]/30 to-[#00D4FF]/30 flex items-center justify-center border border-white/10">
                    <span className="text-lg font-bold text-[#00D4FF]">
                      {testimonials[current].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-sm text-[#00D4FF]">
                      {testimonials[current].treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-[#00D4FF]/30 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-gradient-to-r from-[#0066FF] to-[#00D4FF]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-[#00D4FF]/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
