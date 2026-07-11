import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionHeader from "../layout/SectionHeader";

const ACCENT = "#3fb950";
const EASE = [0.22, 1, 0.36, 1] as const;
const SERVICES = [
  {
    id: "01",
    title: "Intelligent Systems",
    desc: "Engineering AI-powered applications that transform complex data into practical, scalable solutions.",
    img: "public/services/system.png",
  },
  {
    id: "02",
    title: "Digital Architecture",
    desc: "Designing robust software architectures that balance performance, maintainability, and scalability.",
    img: "public/services/Digital Architecture.png",
  },
  {
    id: "03",
    title: "Interactive Interfaces",
    desc: "Creating modern user experiences with thoughtful interactions, motion, and responsive design systems.",
    img: "public/services/interface.png",
  },
  {
    id: "04",
    title: "Data Intelligence",
    desc: "Leveraging analytics and machine learning to uncover insights and support smarter decision-making.",
    img: "public/services/data.png",
  },
];

// ── Service accordion row ────────────────────────────────────
function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.2 + index * 0.08 }}
    >
      <button
        onClick={onToggle}
        className="group w-full text-left outline-none border-t border-slate-200 dark:border-white/[0.06] last:border-b last:border-slate-200 dark:last:border-white/[0.06]"
      >
        <div className="relative py-3 md:py-3.5 flex items-start justify-between group-hover:translate-x-0.5 transition-transform duration-300">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: ACCENT }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              />
              <h3
                className={`text-base md:text-lg font-semibold font-heading transition-colors duration-300 ${
                  isOpen ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-white/60 group-hover:text-slate-800 dark:group-hover:text-white/85"
                }`}
              >
                {service.title}
              </h3>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pl-4">
                    <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-[420px]">
                      {service.desc}
                    </p>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        const el = document.getElementById('contact');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } }}
                      role="button"
                      tabIndex={0}
                      className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-themeRed/80 hover:text-themeRed transition-colors duration-300 cursor-pointer"
                    >
                      Hire Me →
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span
            className={`text-[11px] font-mono shrink-0 mt-0.5 transition-colors duration-300 ${
              isOpen ? "text-[#8A8A8A]" : "text-slate-300 dark:text-white/15 group-hover:text-slate-500 dark:group-hover:text-white/30"
            }`}
          >
            {service.id}
          </span>
        </div>
      </button>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────
export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const active = openIndex !== null ? openIndex : 0;

  return (
    <section
      id="services"
      className="relative py-24 pb-32 md:pb-40 px-6 md:px-24 overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="svc-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="0.5" fill="rgba(255,255,255,0.025)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#svc-grid)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="Services" />

        {/* ── Two-column: image + accordion ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 lg:gap-14">
          {/* Left: dynamic image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="md:col-span-2 relative"
          >
            <div
              className="relative overflow-hidden rounded-sm h-full cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={SERVICES[active].img}
                  alt={SERVICES[active].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: accordion */}
          <div className="md:col-span-3 flex flex-col justify-center">
            {SERVICES.map((service, i) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={SERVICES[active].img}
            alt={SERVICES[active].title}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
