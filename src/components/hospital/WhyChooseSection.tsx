'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Clock,
  Microscope,
  UserCheck,
  ShieldCheck,
  Ambulance,
  FileDigit,
  HandHeart,
  Plus,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Feature Data ─── */
const features = [
  {
    icon: Clock,
    titleKey: 'why.feature1Title',
    descKey: 'why.feature1Desc',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-[#0066FF]/10',
    ringColor: 'rgba(0,212,255,0.15)',
  },
  {
    icon: Microscope,
    titleKey: 'why.feature3Title',
    descKey: 'why.feature3Desc',
    color: '#00E5FF',
    gradient: 'from-[#00E5FF]/20 to-[#0066FF]/10',
    ringColor: 'rgba(0,229,255,0.15)',
  },
  {
    icon: UserCheck,
    titleKey: 'why.feature4Title',
    descKey: 'why.feature4Desc',
    color: '#66B2FF',
    gradient: 'from-[#66B2FF]/20 to-[#0066FF]/10',
    ringColor: 'rgba(102,178,255,0.15)',
  },
  {
    icon: ShieldCheck,
    titleKey: 'why.feature5Title',
    descKey: 'why.feature5Desc',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-[#00E5FF]/10',
    ringColor: 'rgba(0,212,255,0.15)',
  },
  {
    icon: Ambulance,
    titleKey: 'why.feature6Title',
    descKey: 'why.feature6Desc',
    color: '#FF6B8A',
    gradient: 'from-[#FF6B8A]/20 to-[#FF4444]/10',
    ringColor: 'rgba(255,107,138,0.15)',
  },
  {
    icon: FileDigit,
    titleKey: 'why.feature7Title',
    descKey: 'why.feature7Desc',
    color: '#00E5FF',
    gradient: 'from-[#00E5FF]/20 to-[#00D4FF]/10',
    ringColor: 'rgba(0,229,255,0.15)',
  },
  {
    icon: HandHeart,
    titleKey: 'why.feature8Title',
    descKey: 'why.feature8Desc',
    color: '#66B2FF',
    gradient: 'from-[#66B2FF]/20 to-[#0066FF]/10',
    ringColor: 'rgba(102,178,255,0.15)',
  },
];

/* ─── Stagger Container Variants ─── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/* ─── Subtle Particle Canvas ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      targetAlpha: number;
    }

    const w = () => canvas.width / 2;
    const h = () => canvas.height / 2;

    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      radius: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.3 + 0.05,
      targetAlpha: Math.random() * 0.3 + 0.05,
    }));

    let animFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Fade alpha towards target
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.3 + 0.05;
        }

        // Wrap around
        if (p.x < -10) p.x = w() + 10;
        if (p.x > w() + 10) p.x = -10;
        if (p.y < -10) p.y = h() + 10;
        if (p.y > h() + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw subtle connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─── Glowing Background Ring ─── */
function GlowRing({
  size,
  top,
  left,
  delay,
  duration,
  opacity,
}: {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  opacity: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        border: `1.5px solid rgba(0, 212, 255, ${opacity})`,
        boxShadow: `0 0 ${size * 0.15}px rgba(0, 212, 255, ${opacity * 0.3}), inset 0 0 ${size * 0.1}px rgba(0, 212, 255, ${opacity * 0.1})`,
      }}
    >
      {/* Rotating dash arc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full"
        style={{
          border: `2px dashed rgba(0, 212, 255, ${opacity * 0.6})`,
          mask: 'radial-gradient(circle, transparent 55%, black 56%)',
          WebkitMask: 'radial-gradient(circle, transparent 55%, black 56%)',
        }}
      />
    </motion.div>
  );
}

/* ─── Floating Medical Cross Accent ─── */
function FloatingCross({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      animate={{ y: [0, -12, 0] }}
      style={{
        ...style,
        animationDuration: `${4 + delay * 2}s`,
      }}
      className="absolute pointer-events-none"
    >
      <div
        className="relative"
        style={{ color: 'rgba(0, 212, 255, 0.12)' }}
      >
        <Plus className="w-6 h-6" strokeWidth={2.5} />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Why Choose Sparsh Section
   ────────────────────────────────────────────── */
export default function WhyChooseSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="why-choose"
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0B1030] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />

      {/* Subtle Particle Motion */}
      <ParticleField />

      {/* ── Glowing Background Rings ── */}
      <GlowRing
        size={400}
        top="-10%"
        left="-8%"
        delay={0}
        duration={40}
        opacity={0.08}
      />
      <GlowRing
        size={300}
        top="20%"
        left="75%"
        delay={0.3}
        duration={35}
        opacity={0.06}
      />
      <GlowRing
        size={250}
        top="60%"
        left="-5%"
        delay={0.6}
        duration={45}
        opacity={0.05}
      />
      <GlowRing
        size={180}
        top="75%"
        left="80%"
        delay={0.9}
        duration={30}
        opacity={0.07}
      />
      <GlowRing
        size={120}
        top="10%"
        left="50%"
        delay={1.2}
        duration={25}
        opacity={0.04}
      />

      {/* ── Floating Medical Crosses ── */}
      <FloatingCross style={{ top: '8%', left: '12%' }} delay={0} />
      <FloatingCross style={{ top: '15%', right: '15%' }} delay={1.5 } />
      <FloatingCross style={{ top: '45%', left: '5%' }} delay={0.8 } />
      <FloatingCross style={{ top: '70%', right: '8%' }} delay={2 } />
      <FloatingCross style={{ top: '85%', left: '20%' }} delay={1.2 } />
      <FloatingCross style={{ top: '35%', right: '3%' }} delay={0.5 } />

      {/* Decorative blurs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-[#0066FF]/[0.04] blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#00D4FF]/[0.04] blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B8A]/[0.02] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
            {t('why.subtitle')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('why.heading')}
          </h2>
          <p className="mt-4 text-white/45 max-w-2xl mx-auto leading-relaxed">
            {t('why.description')}
          </p>
          <div className="mt-5 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* ── Feature Cards Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              variants={cardVariant}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="glass-card p-6 sm:p-7 relative overflow-hidden group cursor-default"
            >
              {/* Hover glow background */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ backgroundColor: feature.ringColor }}
              />

              {/* Decorative top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-[#00D4FF]/30 transition-all duration-500" />

              {/* Floating Icon Circle */}
              <div className="relative mb-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3 + i * 0.08,
                  }}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${feature.ringColor}, rgba(255,255,255,0.03))`,
                    border: `1.5px solid ${feature.ringColor}`,
                    boxShadow: `0 0 20px ${feature.ringColor}, inset 0 0 12px rgba(255,255,255,0.02)`,
                  }}
                >
                  <feature.icon
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    style={{ color: feature.color }}
                  />

                  {/* Pulsing outer ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      border: `1.5px solid ${feature.color}`,
                    }}
                  />
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors">
                {t(feature.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-white/45 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                {t(feature.descKey)}
              </p>

              {/* Bottom decorative gradient line */}
              <div
                className="absolute bottom-0 left-4 right-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.color}30, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 sm:mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="#appointment"
              className="btn-glow px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0044CC] text-white font-semibold text-base flex items-center gap-2 transition-all duration-300"
            >
              {t('why.bookVisit')}
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-[#00D4FF]/40 hover:bg-white/[0.03] font-semibold text-base transition-all duration-300"
            >
              {t('why.learnMore')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Section transition fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0E27] to-transparent z-[3] pointer-events-none" />
    </section>
  );
}
