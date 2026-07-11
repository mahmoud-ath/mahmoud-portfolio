import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── Constants ── */
const SZ = 40;       // cursor bounding-box size
const CL = 12;       // corner arm length
const SW = 1.5;      // stroke width
const INSET = 6;     // how far corners move inward on hover

const LABEL_MAP: Record<string, string> = {
  open: 'OPEN',  view: 'VIEW',  click: 'CLICK',
  pdf: 'PDF',    git: 'GIT',    send: 'SEND',
};

/* ── Component ── */
const CustomCursor: React.FC = () => {
  /* ── Position – no React re-renders ── */
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 180, damping: 28, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 180, damping: 28, mass: 0.4 });

  /* ── Hover state ── */
  const rawHover = useMotionValue(0);
  const hoverSmooth = useSpring(rawHover, { stiffness: 260, damping: 24 });
  const label = useMotionValue('');

  /* ── Derived transforms ── */
  const dotScale   = useTransform(hoverSmooth, [0, 0.35], [1, 0]);
  const labelO     = useTransform(hoverSmooth, [0.5, 1],   [0, 1]);
  const tlOff      = useTransform(hoverSmooth, [0, 1], [0,  INSET]);  // right, down
  const trOff      = useTransform(hoverSmooth, [0, 1], [0, -INSET]);  // left,  down
  const blOff      = useTransform(hoverSmooth, [0, 1], [0,  INSET]);  // right
  const blUp       = useTransform(hoverSmooth, [0, 1], [0, -INSET]);  // up
  const brOff      = useTransform(hoverSmooth, [0, 1], [0, -INSET]);  // left,  up

  /* ── Events ── */
  useEffect(() => {
    const move = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        'a, button, [data-cursor], .mk-hover-profile',
      );
      if (!t) return;
      rawHover.set(1);

      const dc = t.getAttribute('data-cursor')?.toLowerCase();
      if (dc && dc in LABEL_MAP) { label.set(LABEL_MAP[dc]); return; }

      const href = (t as HTMLAnchorElement).href || '';
      const txt  = t.textContent?.toLowerCase().trim() || '';
      const cls  = t.className.toLowerCase();

      if (href.includes('.pdf') || cls.includes('resume') || cls.includes('cv'))
        label.set('PDF');
      else if (href.includes('github'))
        label.set('GIT');
      else if (txt.includes('send') || txt.includes('contact') || txt.includes('message'))
        label.set('SEND');
      else if (txt.includes('open') || txt.includes('view') || txt.includes('project') || txt.includes('blog'))
        label.set('OPEN');
      else
      label.set('');
    };

    const out = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        'a, button, [data-cursor], .mk-hover-profile',
      );
      if (!t) return;
      rawHover.set(0);
      label.set('');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
    };
  }, []);

  const GREEN = '#3fb950';

  /* ── Render ── */
  return (
    <div className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]">
      <motion.div
        className="absolute top-0 left-0"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        {/* ── Center dot ── */}
        <motion.div
          className="absolute w-[3px] h-[3px] rounded-full"
          style={{
            backgroundColor: GREEN,
            top: '50%', left: '50%',
            translateX: '-50%', translateY: '-50%',
            scale: dotScale,
          }}
        />

        {/* ── CAD Corner brackets ── */}
        <svg
          width={SZ}
          height={SZ}
          viewBox={`0 0 ${SZ} ${SZ}`}
          className="block"
          aria-hidden="true"
        >
          {/* TL */}
          <motion.path
            d={`M ${CL},0 L 0,0 L 0,${CL}`}
            fill="none" stroke={GREEN} strokeWidth={SW} strokeLinecap="square"
            style={{ translateX: tlOff, translateY: tlOff }}
          />
          {/* TR */}
          <motion.path
            d={`M ${SZ - CL},0 L ${SZ},0 L ${SZ},${CL}`}
            fill="none" stroke={GREEN} strokeWidth={SW} strokeLinecap="square"
            style={{ translateX: trOff, translateY: tlOff }}
          />
          {/* BL */}
          <motion.path
            d={`M 0,${SZ - CL} L 0,${SZ} L ${CL},${SZ}`}
            fill="none" stroke={GREEN} strokeWidth={SW} strokeLinecap="square"
            style={{ translateX: blOff, translateY: blUp }}
          />
          {/* BR */}
          <motion.path
            d={`M ${SZ - CL},${SZ} L ${SZ},${SZ} L ${SZ},${SZ - CL}`}
            fill="none" stroke={GREEN} strokeWidth={SW} strokeLinecap="square"
            style={{ translateX: brOff, translateY: brOff }}
          />
        </svg>

        {/* ── Label ── */}
        <motion.span
          className="absolute top-1/2 left-1/2 text-[11px] font-mono tracking-[0.15em] font-semibold"
          style={{
            color: GREEN,
            translateX: '-50%', translateY: '-50%',
            opacity: labelO,
          }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default CustomCursor;