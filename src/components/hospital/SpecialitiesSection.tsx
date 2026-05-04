'use client';

import { motion } from 'framer-motion';
import {
  Baby,
  HeartPulse,
  Sparkles,
  ScanLine,
  Activity,
  Pill,
} from 'lucide-react';

const specialities = [
  {
    icon: Baby,
    title: 'Obstetrics & Maternity',
    desc: 'Comprehensive prenatal to postnatal care including high-risk pregnancy management, natural birthing suites, and dedicated LDR rooms for a safe, comfortable delivery experience.',
  },
  {
    icon: HeartPulse,
    title: 'Gynecologic Surgery',
    desc: 'Minimally invasive laparoscopic & robotic-assisted procedures for fibroids, endometriosis, ovarian cysts, and hysterectomy — faster recovery, smaller incisions, better outcomes.',
  },
  {
    icon: Sparkles,
    title: 'Fertility & IVF Centre',
    desc: 'State-of-the-art assisted reproductive technology including IVF, IUI, ICSI, and fertility preservation with personalised protocols and consistently high success rates.',
  },
  {
    icon: ScanLine,
    title: 'Gynecologic Oncology',
    desc: 'Specialised screening, early detection, and advanced treatment for cervical, ovarian, and uterine cancers — combining surgical expertise with compassionate support.',
  },
  {
    icon: Activity,
    title: 'Urogynecology',
    desc: 'Expert evaluation and treatment for pelvic floor disorders, urinary incontinence, and pelvic organ prolapse using both conservative and advanced surgical approaches.',
  },
  {
    icon: Pill,
    title: 'Menopause & Wellness',
    desc: 'Holistic menopause management including hormone replacement therapy, bone health screening, cardiovascular risk assessment, and emotional wellbeing support.',
  },
];

export default function SpecialitiesSection() {
  return (
    <section id="specialities" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1030] via-[#0A0E27] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0066FF]/[0.03] blur-[120px]" />

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
            Our Expertise
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            Gynecology Centres of <span className="gradient-text">Excellence</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Six specialised gynecology divisions — each equipped with cutting-edge technology
            and staffed by internationally trained women&apos;s health specialists.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="glass-card p-6 sm:p-8 group cursor-default relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#0066FF]/5 to-[#00D4FF]/5" />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/5 blur-[40px] transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 flex items-center justify-center mb-5 group-hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-shadow duration-500">
                  <spec.icon className="w-7 h-7 text-[#00D4FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{spec.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{spec.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[#00D4FF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
