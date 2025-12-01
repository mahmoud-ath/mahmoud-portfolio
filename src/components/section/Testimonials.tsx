import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../layout/SectionHeader';
import { TESTIMONIALS } from '../../lib/data/testimonials';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="reviews" className="py-24 px-6 md:px-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
  <div className="container max-w-6xl mx-auto">
    {/* Section Header */}
    <SectionHeader title="Client Testimonials" />

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-center text-gray-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-16 transition-colors duration-300"
    >
      What my clients and collaborators are saying about working together
    </motion.p>

    {/* Carousel */}
    <div className="relative">
      {/* Main Carousel Container */}
      <div className="relative h-80 bg-gray-100 dark:bg-slate-800 rounded-3xl overflow-hidden transition-colors duration-300">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0 flex items-center justify-center px-8 md:px-16"
          >
            <div className="max-w-3xl mx-auto text-center">
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="p-3 bg-themeRed/10 dark:bg-themeRed/20 rounded-full transition-colors duration-300">
                  <Quote className="w-8 h-8 text-themeRed" />
                </div>
              </motion.div>

              {/* Rating Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-1 mb-6"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <Star className="w-5 h-5 fill-themeRed text-themeRed" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-900 dark:text-white font-serif italic mb-8 leading-relaxed transition-colors duration-300"
              >
                "{TESTIMONIALS[currentIndex].text}"
              </motion.p>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  {TESTIMONIALS[currentIndex].name}
                </h4>
                <span className="text-sm text-gray-600 dark:text-slate-400 font-medium transition-colors duration-300">
                  via {TESTIMONIALS[currentIndex].source}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-16 z-10 p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-full hover:border-themeRed dark:hover:border-themeRed hover:text-themeRed transition-colors duration-300 shadow-lg"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-16 z-10 p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-full hover:border-themeRed dark:hover:border-themeRed hover:text-themeRed transition-colors duration-300 shadow-lg"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Carousel Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-2 mt-8"
      >
        {TESTIMONIALS.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-themeRed w-8'
                : 'bg-gray-300 dark:bg-slate-600 w-2 hover:bg-gray-400 dark:hover:bg-slate-500'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </motion.div>
    </div>
  </div>
</section>
  );
};

export default Testimonials;