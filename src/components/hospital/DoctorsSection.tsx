'use client';

import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Ananya Sharma',
    speciality: 'Obstetrics & High-Risk Pregnancy',
    experience: '20+ Years',
    qualification: 'MBBS, MS OB-GYN, FRCOG',
  },
  {
    name: 'Dr. Priya Menon',
    speciality: 'Laparoscopic & Robotic Surgery',
    experience: '18+ Years',
    qualification: 'MBBS, MS OB-GYN, Fellowship',
  },
  {
    name: 'Dr. Kavitha Reddy',
    speciality: 'Fertility & IVF Specialist',
    experience: '16+ Years',
    qualification: 'MBBS, MS OB-GYN, FRCOG',
  },
  {
    name: 'Dr. Meera Patel',
    speciality: 'Gynecologic Oncology',
    experience: '17+ Years',
    qualification: 'MBBS, MS, Fellowship Gyn-Onc',
  },
  {
    name: 'Dr. Sunita Desai',
    speciality: 'Urogynecology & Pelvic Floor',
    experience: '14+ Years',
    qualification: 'MBBS, MS OB-GYN, Fellowship',
  },
  {
    name: 'Dr. Ritu Kapoor',
    speciality: 'Menopause & Wellness',
    experience: '15+ Years',
    qualification: 'MBBS, MD OB-GYN, Certification',
  },
  {
    name: 'Dr. Nandini Iyer',
    speciality: 'Maternal-Fetal Medicine',
    experience: '12+ Years',
    qualification: 'MBBS, MS OB-GYN, DM MFM',
  },
  {
    name: 'Dr. Deepa Nair',
    speciality: 'Reproductive Endocrinology',
    experience: '13+ Years',
    qualification: 'MBBS, MS OB-GYN, Fellowship',
  },
];

export default function DoctorsSection() {
  return (
    <section id="doctors" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full section-divider" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-[100px]" />

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
            Our Team
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold">
            Expert Gynecology <span className="gradient-text">Specialists</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Our team of renowned gynecologists and obstetricians brings decades of experience
            and a commitment to delivering the best possible outcomes for every woman.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF]" />
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="glass-card p-6 text-center group cursor-default relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#00D4FF]/0 group-hover:bg-[#00D4FF]/5 blur-[30px] transition-all duration-500" />

              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0066FF]/30 to-[#00D4FF]/30 flex items-center justify-center border border-white/10 group-hover:border-[#00D4FF]/30 transition-colors duration-300">
                  <User className="w-8 h-8 text-[#00D4FF]" />
                </div>

                <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                <p className="text-[#00D4FF] font-medium text-sm mt-1">{doc.speciality}</p>
                <p className="text-white/40 text-xs mt-1">{doc.qualification}</p>

                <div className="mt-3 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                  <Star className="w-3.5 h-3.5 text-[#00D4FF] fill-[#00D4FF]" />
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {doc.experience} Experience
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
