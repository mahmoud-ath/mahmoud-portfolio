import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';

interface GalleryTabProps {
  images: string[];
  title: string;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ images, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  if (!images || images.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No images available for this project</p>
      </div>
    );
  }

  const featuredImages = images.slice(0, 3);
  const displayedImages = filter === 'featured' ? featuredImages : images;

  const openLightbox = (index: number) => {
    const actualIndex = filter === 'featured' 
      ? images.indexOf(images[index])
      : index;
    setSelectedImageIndex(actualIndex);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column - Controls */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Gallery Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <Images className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Gallery
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 transition-colors duration-300">
            {images.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
            High-quality project {images.length === 1 ? 'screenshot' : 'screenshots'}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-emerald-500 dark:bg-emerald-600 h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            View Options
          </h4>
          <div className="space-y-2">
            {[
              { value: 'all' as const, label: `All (${images.length})` },
              { value: 'featured' as const, label: `Featured (${Math.min(3, images.length)})` },
            ].map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setFilter(option.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  filter === option.value
                    ? 'bg-emerald-500 text-white shadow-md dark:shadow-emerald-500/30'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 shadow-sm dark:shadow-none transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-emerald-900 dark:text-emerald-300 mb-4 transition-colors duration-300">
            Collection Stats
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-800 dark:text-emerald-300 transition-colors duration-300">Total Images</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-300">{images.length}</span>
            </div>
            <div className="border-t border-emerald-200 dark:border-emerald-800 pt-3 flex items-center justify-between transition-colors duration-300">
              <span className="text-sm text-emerald-800 dark:text-emerald-300 transition-colors duration-300">Format</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 transition-colors duration-300">JPG/PNG</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Gallery Grid */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {filter === 'featured' ? 'Featured Screenshots' : 'Project Screenshots'}
          </h3>
         
        </motion.div>

        {/* Image Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {displayedImages.map((image, index) => (
            <motion.div
              key={`${filter}-${index}`}
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden cursor-pointer group border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`${title} screenshot ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 dark:group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
              {/* Image Number Badge */}
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {displayedImages.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="col-span-2 py-12 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300"
          >
            <p>No images in this view</p>
          </motion.div>
        )}
      </div>
{/* Enhanced Lightbox Modal */}
<AnimatePresence>
  {lightboxOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setLightboxOpen(false)}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl transition-all duration-500"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-emerald-500/20"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full max-h-[85vh] flex flex-col"
      >
        {/* Header Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-xl rounded-t-2xl border-b border-white/10"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-lg shadow-emerald-400/20"></div>
            <span className="text-white/90 font-medium text-sm">
              {title} - Image {selectedImageIndex + 1}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
           

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90, backgroundColor: "rgba(239,68,68,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLightboxOpen(false)}
                className="text-white/80 hover:text-red-400 transition-all duration-500 p-2 rounded-lg hover:bg-red-500/20 backdrop-blur-sm group"
              title="Close"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Image Container */}
        <div className="relative bg-black/50 rounded-b-2xl overflow-hidden flex-1 flex items-center justify-center min-h-0">
          <motion.img
            key={selectedImageIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={images[selectedImageIndex]}
            alt={`${title} screenshot ${selectedImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-b-2xl shadow-2xl"
          />

          {/* Navigation Buttons - Enhanced */}
          <motion.button
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.85 }}
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl group"
            title="Previous image"
          >
            <ChevronLeft size={32} className="group-hover:-translate-x-0.5 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15, x: 5 }}
            whileTap={{ scale: 0.85 }}
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl group"
            title="Next image"
          >
            <ChevronRight size={32} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4">
            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/70 backdrop-blur-xl text-white/90 px-4 py-2.5 rounded-full text-sm font-medium border border-white/10 shadow-2xl"
            >
              <span className="text-emerald-400 font-semibold">{selectedImageIndex + 1}</span>
              <span className="mx-1.5 text-white/60">of</span>
              <span className="text-white/90">{images.length}</span>
            </motion.div>

            {/* Dots Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedImageIndex
                      ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/30'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-xs flex items-center space-x-6"
        >
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-1 bg-white/10 rounded text-xs">←</kbd>
            <span>Previous</span>
          </span>
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-1 bg-white/10 rounded text-xs">→</kbd>
            <span>Next</span>
          </span>
          <span className="flex items-center space-x-1">
            <kbd className="px-1.5 py-1 bg-white/10 rounded text-xs">ESC</kbd>
            <span>Close</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Background Close Area */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onClick={() => setLightboxOpen(false)}
        className="absolute inset-0 w-full h-full -z-10 cursor-zoom-out"
      />
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  );
};

export default GalleryTab;
