import { useEffect, useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  texts: string[]; // Array of texts to cycle through
  switchInterval?: number; // Time between text switches (ms)
  animationDuration?: number; // Duration of decrypt animation (ms)
  speed?: number; // Scrambling speed (ms between character changes)
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  autoStart?: boolean; // Whether to start animating automatically
}

export default function DecryptedText({
  texts,
  switchInterval = 3000, // 3 seconds between texts
  animationDuration = 2000, // 2 seconds for decrypt animation
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'zF9$@d&X^M!vQ)uN+T*Rp#jG_0oK(2sLhE%a1bYt8lI4eC5D^wO?S~Vf7JmWZ`6xU{A}/?=,k<:rP>£Ωµ∆√§∞',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  autoStart = true,
  ...props
}: DecryptedTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>(texts[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);

  // Text switching effect
  useEffect(() => {
    if (!autoStart || texts.length <= 1) return;

    const switchText = () => {
      if (texts.length > 1) {
        setIsAnimating(true);
        
        // Start scrambling current text
        setIsScrambling(true);
        setRevealedIndices(new Set());

        // After animation duration, switch to next text
        setTimeout(() => {
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
          setDisplayText(texts[(currentTextIndex + 1) % texts.length]);
          setIsAnimating(false);
        }, animationDuration);
      }
    };

    const interval = setInterval(switchText, switchInterval);

    return () => clearInterval(interval);
  }, [texts, switchInterval, animationDuration, autoStart, currentTextIndex]);

  // Scrambling animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = displayText.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(displayText.split(''))).filter(char => char !== ' ')
      : characters.split('');

    const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split('').map((char, i) => ({
          char,
          isSpace: char === ' ',
          index: i,
          isRevealed: currentRevealed.has(i)
        }));

        const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
        }

        let charIndex = 0;
        return positions
          .map(p => {
            if (p.isSpace) return ' ';
            if (p.isRevealed) return originalText[p.index];
            return nonSpaceChars[charIndex++];
          })
          .join('');
      } else {
        return originalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (currentRevealed.has(i)) return originalText[i];
            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join('');
      }
    };

    if (isAnimating && isScrambling) {
      interval = setInterval(() => {
        setRevealedIndices(prevRevealed => {
          if (sequential) {
            if (prevRevealed.size < displayText.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(texts[currentTextIndex], newRevealed));
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(texts[currentTextIndex], prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(texts[currentTextIndex]);
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(texts[currentTextIndex]);
      setRevealedIndices(new Set());
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, isScrambling, texts, currentTextIndex, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly, displayText]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...props}
    >
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isAnimating;

          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}