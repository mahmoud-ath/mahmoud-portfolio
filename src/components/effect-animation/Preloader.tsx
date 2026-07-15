/**
 * Preloader — Blueprint Construction
 * Grid → Corners → Construction lines → M outline → M fill → Pulse → Zoom out
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const G = '#3fb950';
const SZ = 80;

type Phase = 'grid' | 'corners' | 'lines' | 'm-outline' | 'm-fill' | 'pulse' | 'done';

const TIMING: { phase: Phase; at: number }[] = [
  { phase: 'grid',      at: 0 },
  { phase: 'corners',   at: 350 },
  { phase: 'lines',     at: 750 },
  { phase: 'm-outline', at: 1000 },
  { phase: 'm-fill',    at: 1350 },
  { phase: 'pulse',     at: 1500 },
  { phase: 'done',      at: 2800 },
];

const PRELOADER_KEY = 'portfolio_preloader_seen';

// Check localStorage on module load
const hasSeenPreloader = (): boolean => {
  try {
    return localStorage.getItem(PRELOADER_KEY) === 'true';
  } catch {
    return false;
  }
};

const markPreloaderSeen = (): void => {
  try {
    localStorage.setItem(PRELOADER_KEY, 'true');
  } catch { /* noop */ }
};

/* ── Dot grid pattern ── */
const DOTS: { x: number; y: number }[] = [];
for (let x = 0; x <= 80; x += 8)
  for (let y = 0; y <= 80; y += 8)
    DOTS.push({ x, y });

const Preloader = () => {
  const [phase, setPhase] = useState<Phase>(hasSeenPreloader() ? 'done' : 'grid');

  useEffect(() => {
    if (hasSeenPreloader()) return; // skip animation on repeat visits

    const timers = TIMING.map(({ phase: p, at }) =>
      setTimeout(() => {
        setPhase(p);
        if (p === 'done') markPreloaderSeen();
      }, at)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const isAtLeast = (p: Phase) => {
    const idx = (ph: Phase) => TIMING.find(t => t.phase === ph)!.at;
    return idx(phase) >= idx(p);
  };

  useEffect(() => {
    // Dismiss preloader early if user interacts
    const onInteraction = () => {
      if (phase !== 'done') {
        markPreloaderSeen();
        setPhase('done');
      }
    };
    window.addEventListener('pointerdown', onInteraction, { once: true });
    window.addEventListener('keydown', onInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white dark:bg-slate-950"
        >
          {/* ── Blueprint dot grid ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.15 }}
            aria-hidden="true"
          >
            <defs>
              <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="0.5" fill={G} />
                <circle cx="0" cy="0" r="0.5" fill={G} opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bp-grid)" />
          </svg>

          {/* ── Central logo area ── */}
          <motion.div className="relative">
            <svg width={SZ * 1.6} height={SZ * 1.6} viewBox={`0 0 ${SZ} ${SZ}`} aria-hidden="true">
              {/* ── Construction lines (crosshair) ── */}
              <motion.line
                x1={40} y1={8} x2={40} y2={72}
                stroke={G} strokeWidth={0.5} strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: isAtLeast('lines') ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.line
                x1={8} y1={40} x2={72} y2={40}
                stroke={G} strokeWidth={0.5} strokeDasharray="3 3"
                initial={{ pathLength: 0 }} animate={{ pathLength: isAtLeast('lines') ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* ── CAD corners ── */}
              <motion.path
                d="M 24,6 L 6,6 L 6,24"
                fill="none" stroke={G} strokeWidth={2} strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: isAtLeast('corners') ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.path
                d="M 56,6 L 74,6 L 74,24"
                fill="none" stroke={G} strokeWidth={2} strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: isAtLeast('corners') ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              />
              <motion.path
                d="M 6,56 L 6,74 L 24,74"
                fill="none" stroke={G} strokeWidth={2} strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: isAtLeast('corners') ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              />
              <motion.path
                d="M 74,56 L 74,74 L 56,74"
                fill="none" stroke={G} strokeWidth={2} strokeLinecap="square"
                initial={{ pathLength: 0 }} animate={{ pathLength: isAtLeast('corners') ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              />

              {/* ── M outline (drawn) ── */}
              <motion.path
                d="M 22,54 L 30,24 L 40,38 L 50,24 L 58,54"
                fill="none" stroke={G} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isAtLeast('m-outline') ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* ── M fill (fills after outline) ── */}
              <motion.path
                d="M 22,54 L 30,24 L 40,38 L 50,24 L 58,54 L 52,54 L 40,46 L 28,54 Z"
                fill={G}
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isAtLeast('m-fill') ? 0.12 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* ── Pulse ring ── */}
              {phase === 'pulse' && (
                <motion.circle
                  cx={40} cy={40} r={34}
                  fill="none" stroke={G} strokeWidth={0.5}
                  initial={{ scale: 0.95, opacity: 0.6 }}
                  animate={{ scale: 1.05, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              )}

              {/* ── Coordinate labels ── */}
              <motion.text
                x={6} y={78}
                fill={G} fontSize={5} fontFamily="monospace" opacity="0.5"
                initial={{ opacity: 0 }} animate={{ opacity: isAtLeast('corners') ? 0.5 : 0 }}
              >
                X:0 Y:0
              </motion.text>
              <motion.text
                x={62} y={10}
                fill={G} fontSize={5} fontFamily="monospace" opacity="0.5"
                initial={{ opacity: 0 }} animate={{ opacity: isAtLeast('corners') ? 0.5 : 0 }}
              >
                INIT
              </motion.text>
            </svg>
          </motion.div>

          {/* ── Bottom status ── */}
          <motion.span
            className="absolute bottom-8 text-[10px] font-mono tracking-[0.2em]"
            style={{ color: G }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isAtLeast('lines') ? 0.35 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {phase === 'grid' && 'LOADING'}
            {phase === 'corners' && 'CALIBRATING'}
            {phase === 'lines' && 'ALIGNING'}
            {phase === 'm-outline' && 'RENDERING'}
            {phase === 'm-fill' || phase === 'pulse' ? 'READY' : ''}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
