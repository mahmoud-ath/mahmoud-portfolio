import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '../effect-animation/DecryptedText';
import BlobCursor from '../effect-animation/BlobCursor';

const Hero: React.FC = () => {
  return (
    <BlobCursor
      blobType="circle"
      fillColor="#efbf44ff"
      trailCount={3}
      sizes={[250, 500, 300]}
      innerSizes={[100, 180, 120]}
      innerColor="rgba(255,255,255,0.8)"
      opacities={[0.6, 0.6, 0.6]}
      shadowColor="rgba(0,0,0,0.75)"
      shadowBlur={5}
      shadowOffsetX={10}
      shadowOffsetY={10}
      filterStdDeviation={30}
      useFilter={true}
      fastDuration={0.1}
      slowDuration={0.5}
      zIndex={20}
    >
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-24 relative overflow-hidden pt-20 md:pt-0">
        {/* Background layer for dark mode */}
        <div className="absolute inset-0 bg-white dark:bg-slate-950 pointer-events-none" style={{ zIndex: -1 }}></div>
        
        <div className="container max-w-6xl relative z-10">
          {/* Mobile Layout - Stacked */}
          <div className="md:hidden flex flex-col items-center text-center space-y-8">
  {/* Mobile Profile Image with Enhanced Border */}
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.1 }}
    className="relative w-40 h-40"
  >
    {/* Enhanced Border Effect - Similar to Desktop */}
    <div className="absolute inset-0 border-2 border-themeRed rounded-full translate-x-2 translate-y-2 z-0 transition-transform duration-300"></div>
    <img 
      src="/General/mahmoud-profile.jpg" 
      alt="Mahmoud EL GHARIB" 
      className="w-full h-full object-cover rounded-full relative z-10 transition-all duration-300 shadow-lg"
    />
  </motion.div>

  {/* Mobile Content */}
  <div className="space-y-6">
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-themeRed font-mono text-base font-semibold"
    >
      Hi, I'm
    </motion.p>
    
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-4xl font-heading font-black text-slate-900 dark:text-white leading-tight"
    >
      Mahmoud
      <br />
      EL GHARIB
    </motion.h1>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="min-h-[60px] flex items-center justify-center"
    >
      <DecryptedText
        texts={["AI & Data Science", "Full-Stack Developer", "ML Enthusiast"]}
        speed={80}
        switchInterval={2500}
        animationDuration={1200}
        maxIterations={12}
        sequential={true}
        revealDirection="start"
        useOriginalCharsOnly={false}
        className="text-lg font-heading font-bold text-themeRed text-center"
        encryptedClassName="text-themeRed/70"
      />
    </motion.div>
    
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-slate-700 dark:text-slate-300 text-base leading-relaxed px-2"
    >
      Master's in AI & Data Science passionate about designing intelligent solutions and data-driven applications.
    </motion.p>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex gap-4 justify-center pt-2"
    >
      <motion.a 
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-themeRed text-white font-bold rounded-full text-base hover:bg-themeRed/90 transition-colors duration-300 shadow-lg"
      >
        Contact Me
      </motion.a>
      
      <motion.a 
        href="#projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 border-2 border-themeRed text-themeRed font-bold rounded-full text-base hover:bg-themeRed hover:text-white transition-colors duration-300"
      >
        View Work
      </motion.a>
    </motion.div>
  </div>
</div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden md:flex flex-col justify-center items-start relative">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-themeRed font-mono mb-4 text-lg"
            >
              Hi, I'm
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black text-slate-900 dark:text-white mb-2"
            >
              Mahmoud EL GHARIB.
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-600 dark:text-slate-300 mb-6 md:mb-8"          
            >
              <DecryptedText
                texts={["AI & Data Science Specialist", "Full-Stack Developer", "Machine Learning Enthusiast"]}
                speed={99}
                switchInterval={3000}
                animationDuration={1500}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                useOriginalCharsOnly={false}
                className="text-themeRed"
                encryptedClassName="text-themeRed"
              />
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl text-slate-700 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10"
            >
              I'm a Master's student in Artificial Intelligence and Data Science, passionate about designing intelligent solutions. With expertise in full-stack development (React, Next.js, Django) and machine learning, I create data-driven applications addressing real-world challenges.
            </motion.p>
            
            <motion.a 
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="px-6 sm:px-8 py-3 md:py-4 border-2 border-themeRed text-themeRed font-bold rounded-md text-sm sm:text-base hover:bg-themeRed hover:text-white transition-colors duration-300"
            >
              Contact me!
            </motion.a>
          </div>

          {/* Desktop Image - Hidden on mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden md:block absolute right-4 lg:right-6 xl:right-12 top-1/2 -translate-y-1/2 w-40 md:w-56 lg:w-72"
          >
            {/* Image Border Effect */}
            <div className="absolute inset-0 border-2 border-themeRed rounded-lg translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3 z-0 transition-transform duration-300 hover:translate-x-1 hover:translate-y-1"></div>
            {/* Image Overlay */}
            <div className="absolute inset-0 hover:bg-transparent z-10 rounded-lg transition-colors duration-300 cursor-pointer"></div>
            <img 
              src="/General/mahmoud-profile.jpg" 
              alt="Mahmoud EL GHARIB" 
              className="w-full h-full aspect-square object-cover rounded-lg relative z-0 hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator for Mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 md:hidden"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-themeRed rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-themeRed rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>
    </BlobCursor>
  );
};

export default Hero;