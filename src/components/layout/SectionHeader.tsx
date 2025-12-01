import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
}

const SectionHeader: React.FC<Props> = ({ title }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 w-full"
    >
      <h2 className="text-2xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white whitespace-nowrap">{title}</h2>
      <div className="h-[1px] bg-slate-900/30 dark:bg-white/30 w-full max-w-xs md:max-w-md"></div>
    </motion.div>
  );
};

export default SectionHeader;