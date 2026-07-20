    import React, { useEffect, useRef, useState, useCallback } from "react";
    import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
    import TrueFocus from "@/src/components/effect-animation/TrueFocus";
    import { useDarkMode } from "../../contexts/DarkModeContext";

    // ── Theme ───────────────────────────────────────────────────
    const ACCENT = "rgba(63,185,80,";
    const ACCENT_HEX = "#3fb950";
    const EASE = [0.22, 1, 0.36, 1] as const;

    // ── Portrait images for the auto-rotating carousel ─────────
    const PORTRAITS = [
      "/General/mahmoud-profile.webp",
      "/General/me2.webp",
      "/General/ME 3.webp",
    ];

    // ── Wireframe ring behind portrait ─────────────────────────
    function WireframeRing({ isDark }: { isDark: boolean }) {
      const sub = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)";
      const dim = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
      return (
        <svg
          className="absolute z-0 pointer-events-none"
          viewBox="0 0 400 400"
          style={{
            width: "clamp(300px, 42vw, 460px)",
            height: "clamp(300px, 42vw, 460px)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        >
          <motion.circle
            cx="200" cy="200" r="185"
            fill="none" stroke={`${ACCENT}0.05)`}
            strokeWidth="0.5" strokeDasharray="4 12"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          <motion.circle
            cx="200" cy="200" r="165"
            fill="none" stroke={sub}
            strokeWidth="0.3" strokeDasharray="2 8"
            animate={{ rotate: -360 }}
            transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          <line x1="195" y1="200" x2="205" y2="200" stroke={dim} strokeWidth="0.5" />
          <line x1="200" y1="195" x2="200" y2="205" stroke={dim} strokeWidth="0.5" />
        </svg>
      );
    }

    // ── Scan-line overlay ──────────────────────────────────────
    function ScanLine() {
      return (
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden rounded-sm" aria-hidden="true">
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}0.12), transparent)` }}
            initial={{ top: "-2%" }}
            animate={{ top: "102%" }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 16, ease: "linear" }}
          />
        </div>
      );
    }


    // ── Grain overlay ───────────────────────────────────────────
    function GrainOverlay() {
      const canvasRef = useRef<HTMLCanvasElement>(null);
      useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        c.width = 256;
        c.height = 256;
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 5000; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }, []);
      return (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.15] mix-blend-overlay"
          style={{ imageRendering: "pixelated" }}
          aria-hidden="true"
        />
      );
    }

    // ── CAD corner (reusable) ───────────────────────────────────
    const CORNERS = [
      "M 6,2 L 2,2 L 2,6",
      "M 94,2 L 98,2 L 98,6",
      "M 6,98 L 2,98 L 2,94",
      "M 94,98 L 98,98 L 98,94",
    ];

    function CadCorners({ active, isDark }: { active: boolean; isDark: boolean }) {
      const dim = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
      return (
        <svg className="absolute inset-0 w-full h-full z-[3] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {CORNERS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              strokeWidth="1"
              strokeLinecap="square"
              animate={{ stroke: active ? `${ACCENT}0.6)` : dim }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          ))}
        </svg>
      );
    }

    // ── Main hero ───────────────────────────────────────────────
    export default function Hero() {
      const { isDarkMode } = useDarkMode();
      const [imageHovered, setImageHovered] = useState(false);
      const [currentImage, setCurrentImage] = useState(0);

      // Auto-rotate carousel (paused on hover)
      useEffect(() => {
        if (imageHovered) return;
        const timer = setInterval(() => {
          setCurrentImage((prev) => (prev + 1) % PORTRAITS.length);
        }, 4000);
        return () => clearInterval(timer);
      }, [imageHovered]);

      const tiltX = useMotionValue(0);
      const tiltY = useMotionValue(0);
      const smoothTiltX = useSpring(tiltX, { stiffness: 70, damping: 24 });
      const smoothTiltY = useSpring(tiltY, { stiffness: 70, damping: 24 });

      const handleMouse = useCallback((e: React.MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        tiltX.set(dy * 1.2);
        tiltY.set(dx * 1.2);
      }, [tiltX, tiltY]);

      return (
        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950 select-none"
          onMouseMove={handleMouse}
          aria-label="Home"
        >
          <h1 className="sr-only">Mahmoud EL GHARIB — Full-Stack Developer &amp; AI Engineer Portfolio</h1>
          {/* ── Background layers ── */}
          <div className="absolute inset-0 bg-white dark:bg-slate-950 z-0" />

          <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <pattern id="arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="24" cy="24" r="0.5" fill="rgba(255,255,255,0.03)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arch-grid)" />
          </svg>


          <GrainOverlay />


          {/* ── Page indicator ── */}
          <div className="absolute top-8 right-10 z-20 hidden md:flex items-center gap-3 pointer-events-none">
            <div className="w-6 h-px bg-white/[0.06]" />
            <span className="text-[9px] font-mono text-white/[0.08]">01</span>
          </div>

          {/* ── Main content ── */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24 pt-24 md:pt-0">

            {/* ── Left: Name + Tagline + CTA ── */}
            <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-sm md:text-base uppercase tracking-[0.3em] text-slate-500 dark:text-white/50 mb-6"
              >
                hello I'm
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-sm md:text-base uppercase tracking-[0.3em] text-slate-500 dark:text-white/50 mb-6"
              >
                Mahmoud EL GHARIB
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="w-full"
              >
                <TrueFocus
                  sentence="Build. Solve. Improve."
                  separator=" "
                  blurAmount={5}
                  borderColor={ACCENT_HEX}
                  glowColor={`${ACCENT}0.15)`}
                  animationDuration={0.6}
                  pauseBetweenAnimations={2.5}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
                className="mt-5 text-[clamp(0.85rem,1.8vw,1.1rem)] text-zinc-600 dark:text-zinc-500 font-light leading-relaxed text-left"
              >
                Building intelligent software through{" "}
                <span className="text-slate-800 dark:text-white/80">AI</span> and modern engineering.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                className="mt-8"
              >
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-3 px-0 py-3 text-sm font-medium tracking-wide text-slate-500 dark:text-white/60 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                >
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-slate-300 dark:bg-white/10 group-hover:bg-themeRed/50 transition-colors duration-300" />
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-themeRed group-hover:w-full transition-all duration-500 ease-out" />
                  View Projects
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* ── Right: Portrait carousel ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
              className="flex-shrink-0 relative"
              style={{ rotateX: smoothTiltX, rotateY: smoothTiltY, transformPerspective: 800 }}
            >
              <WireframeRing isDark={isDarkMode} />

              <div className="relative" style={{ width: "clamp(220px, 26vw, 320px)" }}>
                <div
                  className="relative overflow-hidden rounded-sm"
                  onMouseEnter={() => setImageHovered(true)}
                  onMouseLeave={() => setImageHovered(false)}
                >
{/* Crossfade carousel (all images above fold — eager load) */}
                    <div className="relative" style={{ aspectRatio: "3/4" }}>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImage}
                          src={PORTRAITS[currentImage]}
                          alt={`Mahmoud EL GHARIB — ${currentImage + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          draggable={false}
                          fetchPriority="high"
                          loading="eager"
                          width="960"
                          height="1280"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: EASE }}
                      />
                    </AnimatePresence>
                  </div>

                  <ScanLine />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      boxShadow: imageHovered
                        ? `inset 0 0 0 1px ${ACCENT}0.3)`
                        : isDarkMode ? "inset 0 0 0 1px rgba(255,255,255,0.05)" : "inset 0 0 0 1px rgba(0,0,0,0.06)",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-3">
                  {PORTRAITS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className="rounded-full transition-all duration-500 flex items-center justify-center"
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: "transparent",
                      }}
                      aria-label={`Photo ${i + 1}`}
                    >
                      <span
                        className="rounded-full"
                        style={{
                          width: i === currentImage ? 18 : 5,
                          height: 5,
                          backgroundColor:
                            i === currentImage
                              ? ACCENT_HEX
                              : isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
                          transition: "all 0.5s",
                        }}
                      />
                    </button>
                  ))}
                </div>

                <CadCorners active={imageHovered} isDark={isDarkMode} />
              </div>
            </motion.div>
          </div>

        </section>
      );
    }