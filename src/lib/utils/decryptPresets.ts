export const decryptPresets = {
  heroSubtitle: {
    speed: 50,
    maxIterations: 15,
    sequential: true,
    revealDirection: 'start' as const,
    useOriginalCharsOnly: true,
    animateOn: 'both' as const,
  },
  hoverOnly: {
    speed: 40,
    maxIterations: 20,
    sequential: false,
    useOriginalCharsOnly: false,
    animateOn: 'hover' as const,
  },
  viewTrigger: {
    speed: 60,
    maxIterations: 12,
    sequential: true,
    revealDirection: 'center' as const,
    useOriginalCharsOnly: true,
    animateOn: 'view' as const,
  },
  fastReveal: {
    speed: 30,
    maxIterations: 10,
    sequential: true,
    revealDirection: 'start' as const,
    useOriginalCharsOnly: true,
    animateOn: 'both' as const,
  },
  centerReveal: {
    speed: 50,
    maxIterations: 15,
    sequential: true,
    revealDirection: 'center' as const,
    useOriginalCharsOnly: true,
    animateOn: 'hover' as const,
  }
};
