'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 200, suffix: '+', label: 'Expert Doctors' },
  { value: 50, suffix: '+', label: 'Specialities' },
  { value: 100000, suffix: '+', label: 'Happy Patients', display: '100K+' },
  { value: 75000, suffix: '+', label: 'Surgeries Performed', display: '75K+' },
  { value: 150, suffix: '+', label: 'Awards & Recognitions' },
];

function AnimatedCounter({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasStartedRef = useRef(false);

  const startCounting = useCallback(() => {
    const duration = 2000;
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
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      const timer = startCounting();
      return () => clearInterval(timer);
    }
  }, [isInView, startCounting]);

  const formatNumber = (num: number) => {
    if (display) return display;
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1333] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0066FF]/8 blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-[#00D4FF]/5 blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            Our Impact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            Numbers That <span className="gradient-text">Speak</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center glass-card p-5 sm:p-6"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
