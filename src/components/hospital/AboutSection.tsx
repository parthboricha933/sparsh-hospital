'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ShieldCheck,
  HeartPulse,
  Baby,
  Eye,
  Target,
  Award,
  Sparkles,
  CheckCircle2,
  CircleDot,
} from 'lucide-react';

/* ─── Animated Counter ─── */
function GlowCounter({
  value,
  suffix,
  label,
  delay = 0,
  display,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  display?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
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
      className="glass-card p-5 sm:p-6 text-center group hover:shadow-[0_0_30px_rgba(0,212,255,0.12)] transition-shadow duration-500"
    >
      <div className="text-3xl sm:text-4xl font-extrabold gradient-text tabular-nums">
        {display || `${count.toLocaleString()}${suffix}`}
      </div>
      <div className="mt-1.5 text-xs sm:text-sm text-white/45 font-medium">{label}</div>
    </motion.div>
  );
}

/* ─── Timeline Data ─── */
const timeline = [
  { year: '1998', event: 'Sparsh Hospital founded with a vision for women\'s health' },
  { year: '2005', event: 'First advanced laparoscopic surgery unit for gynecology' },
  { year: '2010', event: 'NABH accreditation achieved; 100-bed expansion' },
  { year: '2016', event: 'State-of-the-art NICU & high-risk pregnancy wing inaugurated' },
  { year: '2020', event: '10,000+ successful deliveries milestone reached' },
  { year: '2024', event: 'Robotic-assisted gynecologic surgery program launched' },
];

/* ─── Trust Badges ─── */
const trustBadges = [
  { icon: ShieldCheck, label: 'NABH Certified', color: '#00D4FF' },
  { icon: HeartPulse, label: 'Emergency Excellence', color: '#FF6B8A' },
  { icon: Baby, label: 'Patient Safety Focus', color: '#00E5FF' },
];

/* ─── Commitment Points ─── */
const commitments = [
  'Advanced laparoscopic & robotic surgical systems',
  'Dedicated high-risk pregnancy & NICU wing',
  '24/7 emergency obstetric & gynecologic care',
  'Fertility & reproductive medicine centre of excellence',
  'Women-centric compassionate care environment',
  'Internationally trained gynecologic specialists',
];

/* ─── Fade-in wrapper ─── */
function FadeIn({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const offsets = {
    up: { x: 0, y: 40 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   About Section
   ────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
      {/* ── Background: smooth merge from hero ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0A0E27] to-[#0B1030]" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#0066FF]/[0.04] blur-[120px]" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-[#00D4FF]/[0.04] blur-[100px]" />
      <div className="absolute top-1/3 left-1/4 w-60 h-60 rounded-full bg-[#FF6B8A]/[0.03] blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <FadeIn>
          <div className="text-center mb-16 sm:mb-20">
            <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
              About Sparsh
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
              Dedicated to{' '}
              <span className="gradient-text">Women&apos;s Health</span>
            </h2>
            <p className="mt-4 text-white/45 max-w-2xl mx-auto leading-relaxed">
              For over 25 years, Sparsh Hospital has been the region&apos;s most trusted
              name in gynecology and obstetrics — where clinical excellence meets
              genuine compassion for every woman who walks through our doors.
            </p>
            <div className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
          </div>
        </FadeIn>

        {/* ── Main Grid: Left Image Frame + Right Content ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ── Left: Premium Hospital Glass Frame ── */}
          <FadeIn direction="left" delay={0.1}>
            <div className="relative">
              {/* Main glass card frame */}
              <div className="glass-card rounded-3xl overflow-hidden relative">
                {/* Image area – gradient art + holographic medical visuals */}
                <div className="relative aspect-[4/3] sm:aspect-[3/2.2] overflow-hidden">
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1333] via-[#111940] to-[#0A0E27]" />

                  {/* Subtle dot grid */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.25) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Holographic medical visual – stylized female symbol + care imagery */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Venus / female medical symbol */}
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                        {/* Circle of the symbol */}
                        <div className="absolute inset-0 rounded-full border-[3px] border-[#00D4FF]/25 shadow-[0_0_30px_rgba(0,212,255,0.15)]" />
                        <div className="absolute inset-3 rounded-full border border-[#0066FF]/15" />
                        {/* Cross bar */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-16 bg-gradient-to-b from-[#00D4FF]/40 to-[#00D4FF]/10" />
                        {/* Small cross at bottom */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#00D4FF]/30 rounded-full" />
                        {/* Inner glow pulse */}
                        <div className="absolute inset-6 rounded-full bg-[#00D4FF]/[0.06] animate-pulse-glow" />
                        {/* Heartbeat line across */}
                        <svg
                          className="absolute top-1/2 -translate-y-1/2 left-0 w-full"
                          viewBox="0 0 160 20"
                          fill="none"
                        >
                          <path
                            d="M0 10 L30 10 L38 10 L42 2 L48 18 L52 6 L56 14 L60 10 L90 10 L98 10 L102 3 L108 17 L112 7 L116 13 L120 10 L160 10"
                            stroke="rgba(0,212,255,0.35)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute top-5 left-5 glass-card px-3 py-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6B8A]" />
                    <span className="text-[10px] sm:text-xs text-white/60 font-medium">Est. 1998</span>
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-medium text-green-400">Open 24/7</span>
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[rgba(255,255,255,0.05)] to-transparent" />
                </div>

                {/* Bottom info strip */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Sparsh Gynecology Hospital</h3>
                    <p className="text-[11px] text-white/35 mt-0.5">Bangalore, India</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {trustBadges.map((badge) => (
                      <div
                        key={badge.label}
                        className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center"
                        title={badge.label}
                      >
                        <badge.icon className="w-3.5 h-3.5" style={{ color: badge.color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent badge – top-left */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 glass-card px-3 py-2 flex items-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.2)]"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0066FF]/30 to-[#00D4FF]/30 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-white">NABH</p>
                  <p className="text-[9px] text-white/35">Certified</p>
                </div>
              </motion.div>

              {/* Floating accent badge – bottom-right */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 glass-card px-3 py-2 flex items-center gap-2 shadow-[0_0_20px_rgba(255,107,138,0.15)]"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B8A]/30 to-[#FF8FA3]/30 flex items-center justify-center">
                  <HeartPulse className="w-3.5 h-3.5 text-[#FF6B8A]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-white">25+ Yrs</p>
                  <p className="text-[9px] text-white/35">Excellence</p>
                </div>
              </motion.div>

              {/* Glow behind card */}
              <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-[#0066FF]/[0.04] blur-[60px]" />
            </div>
          </FadeIn>

          {/* ── Right: Text Content ── */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-7">
              {/* Mission */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 flex items-center justify-center">
                    <Target className="w-4.5 h-4.5 text-[#00D4FF]" />
                  </div>
                  Our Mission
                </h3>
                <p className="mt-3 text-white/55 leading-relaxed pl-[46px]">
                  To provide every woman with access to world-class gynecological care that
                  combines cutting-edge medical science with warmth, dignity, and unwavering
                  respect for her choices. We believe healthcare for women should empower, not
                  just treat — and every protocol at Sparsh is designed around that belief.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B8A]/20 to-[#FF8FA3]/20 flex items-center justify-center">
                    <Eye className="w-4.5 h-4.5 text-[#FF6B8A]" />
                  </div>
                  Our Vision
                </h3>
                <p className="mt-3 text-white/55 leading-relaxed pl-[46px]">
                  To be India&apos;s most trusted gynecology hospital — setting the national
                  benchmark in women&apos;s healthcare through clinical innovation, surgical
                  precision, and a patient-first philosophy that treats every woman like family.
                </p>
              </div>

              {/* Commitment */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00E5FF]/20 flex items-center justify-center">
                    <Award className="w-4.5 h-4.5 text-[#00E5FF]" />
                  </div>
                  Our Commitment
                </h3>
                <ul className="mt-3 pl-[46px] space-y-2.5">
                  {commitments.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-2 flex flex-wrap gap-3">
                {trustBadges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="glass-card px-4 py-3 flex items-center gap-2.5 group hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-shadow duration-400"
                  >
                    <badge.icon className="w-4.5 h-4.5" style={{ color: badge.color }} />
                    <span className="text-xs sm:text-sm font-semibold text-white/75 group-hover:text-white transition-colors">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Animated Timeline ── */}
        <FadeIn delay={0.15}>
          <div className="mt-20 sm:mt-24">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
                Our Journey
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                25+ Years of <span className="gradient-text">Excellence</span>
              </h3>
              <div className="mt-3 w-16 h-0.5 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#0066FF]/40 via-[#00D4FF]/30 to-[#0066FF]/10" />

              <div className="space-y-8 sm:space-y-10">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className={`relative flex items-start gap-6 sm:gap-0 ${
                      i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-[#0A0E27] border-2 border-[#00D4FF] flex items-center justify-center">
                        <CircleDot className="w-2 h-2 text-[#00D4FF]" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}>
                      <div className="glass-card p-4 sm:p-5 inline-block group hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-shadow duration-400">
                        <span className="text-xs sm:text-sm font-bold gradient-text">
                          {item.year}
                        </span>
                        <p className="mt-1 text-xs sm:text-sm text-white/50 leading-relaxed">
                          {item.event}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Floating Glowing Counters ── */}
        <div className="mt-20 sm:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <GlowCounter value={25} suffix="+" label="Years of Excellence" delay={0} />
            <GlowCounter value={100} suffix="+" label="Gynecology Experts" delay={0.08} />
            <GlowCounter value={50000} suffix="+" label="Happy Mothers" delay={0.16} display="50K+" />
            <GlowCounter value={10000} suffix="+" label="Successful Deliveries" delay={0.24} display="10K+" />
          </div>
        </div>
      </div>

      {/* ── Section transition fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B1030] to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
