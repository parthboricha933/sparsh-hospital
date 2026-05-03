'use client';

import { motion } from 'framer-motion';
import { Heart, Target, Eye, Award, Users, Shield } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

const highlights = [
  { icon: Heart, title: 'Patient-Centric Care', desc: 'Every decision puts patients first' },
  { icon: Target, title: 'Precision Medicine', desc: 'Targeted treatments for better outcomes' },
  { icon: Shield, title: 'NABH Accredited', desc: 'National quality standards certified' },
  { icon: Users, title: 'Expert Team', desc: '200+ specialists across all fields' },
  { icon: Award, title: 'Award Winning', desc: 'Recognized excellence in healthcare' },
  { icon: Eye, title: 'Innovation', desc: 'Cutting-edge medical technology' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-[#00D4FF]/5 blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest">
              About Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
              Pioneering Healthcare{' '}
              <span className="gradient-text">Since 1998</span>
            </h2>
            <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
          </div>
        </FadeInWhenVisible>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Description */}
          <FadeInWhenVisible delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg text-white/70 leading-relaxed">
                Founded in 1998, Sparsh Hospital has been at the forefront of medical innovation
                and compassionate care for over two decades. What began as a modest healthcare
                facility has grown into one of the region&apos;s most trusted multispeciality hospitals.
              </p>
              <p className="text-white/60 leading-relaxed">
                Our state-of-the-art infrastructure, combined with a team of over 200 dedicated
                medical professionals, ensures that every patient receives world-class treatment
                tailored to their unique needs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">1998</div>
                  <div className="text-sm text-white/50 mt-1">Year Founded</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">500+</div>
                  <div className="text-sm text-white/50 mt-1">Bed Capacity</div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    Our Mission
                  </h3>
                  <p className="mt-2 text-white/60 pl-10">
                    To deliver accessible, high-quality healthcare that transforms lives through
                    innovation, empathy, and clinical excellence.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    Our Vision
                  </h3>
                  <p className="mt-2 text-white/60 pl-10">
                    To be the global benchmark in patient-centric healthcare, setting new standards
                    in medical excellence and compassionate service.
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Right: Highlights Grid */}
          <FadeInWhenVisible delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="glass-card p-5 sm:p-6 group cursor-default"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-shadow duration-300">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF]" />
                  </div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">{item.title}</h4>
                  <p className="mt-1 text-xs sm:text-sm text-white/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
