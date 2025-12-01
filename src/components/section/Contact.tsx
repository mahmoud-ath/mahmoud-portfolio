import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail,  Code2, Terminal, Zap, Cpu } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/data/social_links';


const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'elgharib.mahmoud2@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-24 bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-300 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(#4a5568 1px, transparent 1px),
                            linear-gradient(90deg, #4a5568 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Subtle Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-themeRed/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content Container */}
      <div className="container max-w-4xl mx-auto relative z-10">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <div className="flex items-center gap-2 text-cyan-300">
            <Terminal size={16} />
            <span className="font-mono text-sm">contact@portfolio:~</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="font-mono text-cyan-300 text-sm mb-2">// connect_with_developer</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Let's</span>{' '}
            <span className="text-themeRed">create</span>
          </h1>
          <div className="flex items-center gap-2 text-xl text-gray-400">
            <Cpu size={20} />
            <span className="font-mono">something extraordinary</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 font-mono">
            <div className="text-cyan-300 mb-2">$ message --about-project</div>
            <p className="text-gray-300 leading-relaxed">
              Whether you need a full-stack application, AI integration, or creative tech solutions - 
              I transform complex problems into elegant code. Let's build something that matters.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 justify-center"
        >
          <motion.a
            href={`mailto:${email}`}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-themeRed text-white font-mono font-bold rounded-lg border-2 border-themeRed hover:bg-transparent hover:text-themeRed transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            <span>send_message()</span>
            <Zap size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          <motion.button
            onClick={copyEmail}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-slate-600 text-gray-300 font-mono font-bold rounded-lg hover:border-themeRed hover:text-themeRed transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 size={20} />
            <span>{copied ? 'copied!' : 'copy_email'}</span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-5"
        >
          <div className="text-center mb-6">
            <div className="font-mono text-gray-400 text-sm">// digital_footprint</div>
          </div>
          <div className="flex justify-center gap-4">
            {SOCIAL_LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-lg bg-slate-800/50 border border-slate-700 ${link.color} hover:border-themeRed hover:bg-themeRed/10 transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Status Footer */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5 }}
  className="text-center border-t border-slate-700 pt-8 mt-12"
>
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

    {/* Left Section — Status */}
    <div className="flex items-center gap-3">
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <span className="font-mono text-sm text-gray-400">
          status: available
        </span>
      </motion.div>

      <div className="hidden sm:block font-mono text-xs text-gray-500">
        response_time: 24-48h
      </div>
    </div>

    {/* Back to Top */}
    <motion.button
      onClick={scrollToTop}
      className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-themeRed transition-all duration-300 group"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Return to top"
    >
      <span className="font-mono text-xs text-gray-300 group-hover:text-white">
        back_to_top
      </span>
      <ArrowUp
        size={16}
        className="text-gray-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform"
      />
    </motion.button>
  </div>

  {/* Rights Section */}
  <div className="mt-6 text-center font-mono text-xs text-gray-500">
    © {new Date().getFullYear()} <span className="text-gray-300">El Gharib Mahmoud</span>. All rights reserved.
  </div>
</motion.div>

      </div>
    </section>
  );
};

export default Contact;