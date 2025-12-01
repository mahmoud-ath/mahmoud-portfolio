'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, BookOpen, Search, Code2, Cloud, Hexagon, Smartphone, GraduationCap, Briefcase, Award, CheckCircle2, AlertCircle, Clock, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Certification } from '../../../../lib/types/Experience_Section';

interface CertificationsProps {
  data: Certification[];
  activeId: string;
  onItemChange: (id: string) => void;
}

const getCertificationIcon = (issuer: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'ALX Africa': <Globe className="w-6 h-6" />,
    'Coursera': <BookOpen className="w-6 h-6" />,
    'Google': <Search className="w-6 h-6" />,
    'Microsoft': <Code2 className="w-6 h-6" />,
    'AWS': <Cloud className="w-6 h-6" />,
    'IBM': <Hexagon className="w-6 h-6" />,
    'Meta': <Smartphone className="w-6 h-6" />,
    'Udemy': <GraduationCap className="w-6 h-6" />,
    'LinkedIn': <Briefcase className="w-6 h-6" />,
  };
  
  for (const [key, value] of Object.entries(iconMap)) {
    if (issuer.includes(key)) return value;
  }
  return <Award className="w-6 h-6" />;
};

const getStatusBadge = (status: string) => {
  const badges = {
    active: {
      colors: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700',
      icon: <CheckCircle2 className="w-3 h-3" />,
      label: 'Active'
    },
    expired: {
      colors: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700',
      icon: <Clock className="w-3 h-3" />,
      label: 'Expired'
    },
    'in-progress': {
      colors: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
      icon: <Clock className="w-3 h-3" />,
      label: 'In Progress'
    }
  };
  
  return badges[status as keyof typeof badges] || badges.active;
};

const Certifications: React.FC<CertificationsProps> = ({ data, activeId, onItemChange }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const activeCertification = data.find(cert => cert.id === activeId) || data[0];
  
  // Get all credential images (support both single credentialUrl and array)
  const credentialImages = activeCertification.credentialUrl 
    ? (Array.isArray(activeCertification.credentialUrl) 
        ? activeCertification.credentialUrl 
        : [activeCertification.credentialUrl])
    : [];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % credentialImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + credentialImages.length) % credentialImages.length);
  };

  return (
    <>
     <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-white/80 dark:border-slate-700/80 transition-colors duration-300">
  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
    {/* Certifications List - Sidebar */}
    <div className="lg:w-1/3">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-200/60 dark:border-slate-700/60 transition-colors duration-300">
        Certifications
      </h3>
      <div className="space-y-2 max-h-[250px] sm:max-h-[300px] lg:max-h-[350px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
        {data.map((cert, idx) => {
          const statusBadge = getStatusBadge(cert.status);
          return (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onItemChange(cert.id)}
              className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                activeId === cert.id
                  ? 'bg-themeRed/10 dark:bg-themeRed/20 border-2 border-themeRed dark:border-themeRed/60 shadow-md'
                  : 'bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-slate-700/50 hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-sm dark:hover:shadow-slate-700/20'
              }`}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                {/* Left Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-gray-700 dark:text-slate-300 flex-shrink-0 transition-colors duration-300">
                      {getCertificationIcon(cert.issuer)}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border transition-colors duration-300 ${statusBadge.colors} flex items-center gap-1 flex-shrink-0`}>
                      {statusBadge.icon}
                    </span>
                  </div>
                  <p className={`font-semibold text-sm transition-colors duration-300 line-clamp-2 ${
                    activeId === cert.id ? 'text-themeRed dark:text-themeRed' : 'text-gray-900 dark:text-white'
                  }`}>
                    {cert.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 line-clamp-1 transition-colors duration-300">
                    @{cert.issuer}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 transition-colors duration-300">
                    {cert.date}
                  </p>
                </div>

                {/* Right Image Badge */}
                {cert.image && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-lg overflow-hidden shadow-md border border-gray-200/50 dark:border-slate-600/50 transition-colors duration-300"
                  >
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>

    {/* Certification Details */}
    <div className="lg:w-2/3">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCertification.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/80 dark:border-slate-700/80 h-full transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="text-themeRed transition-colors duration-300 shrink-0">
                  {getCertificationIcon(activeCertification.issuer)}
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2">
                  {activeCertification.name}
                </h4>
              </div>
              <p className="text-themeRed font-semibold text-sm sm:text-base transition-colors duration-300">
                @{activeCertification.issuer}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-100 dark:bg-slate-700/50 rounded-full text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-medium whitespace-nowrap transition-colors duration-300">
                {activeCertification.date}
              </span>
              {(() => {
                const statusBadge = getStatusBadge(activeCertification.status);
                return (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-300 ${statusBadge.colors} flex items-center gap-1`}>
                    {statusBadge.icon}
                    {statusBadge.label}
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Credential ID */}
          {activeCertification.credentialId && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 mb-4 sm:mb-5 transition-colors duration-300">
              <Briefcase className="w-3 sm:w-4 h-3 sm:h-4 shrink-0" />
              <span className="truncate">Credential ID: {activeCertification.credentialId}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm md:text-base transition-colors duration-300">
            {activeCertification.description}
          </p>

          {/* Credential Images Gallery */}
          {credentialImages.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-xs sm:text-sm transition-colors duration-300">
                Credentials
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3">
                {credentialImages.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsGalleryOpen(true);
                    }}
                    className="relative h-20 sm:h-24 rounded-lg overflow-hidden shadow-md border border-gray-200/50 dark:border-slate-600/50 hover:border-themeRed/50 dark:hover:border-themeRed/60 transition-all group"
                  >
                    <img
                      src={image}
                      alt={`${activeCertification.name} credential ${index + 1}`}
                      className="w-full h-full object-cover group-hover:brightness-75 transition-all"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 dark:bg-black/40">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 text-themeRed" />
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Skills & Credential Link */}
          {activeCertification.skills && activeCertification.skills.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-xs sm:text-sm transition-colors duration-300">
                Skills Gained
              </h5>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeCertification.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-themeRed/10 dark:bg-themeRed/20 text-themeRed dark:text-themeRed/90 rounded-full text-xs md:text-sm font-medium border border-themeRed/20 dark:border-themeRed/30 transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* External Credential Link Button */}
          {activeCertification.credentialId && (
            <div className="pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
              <a
                href={`https://www.credly.com/badges/${activeCertification.credentialId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-themeRed text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-themeRed/90 transition-colors"
              >
                <span>View on Credly</span>
                <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
              </a>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</div>

      {/* Fullscreen Image Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-themeRed rounded-full flex items-center justify-center text-white hover:bg-themeRed/90 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={credentialImages[currentImageIndex]}
                  alt={`${activeCertification.name} credential`}
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </div>

              {/* Navigation Controls */}
              {credentialImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-themeRed rounded-full flex items-center justify-center text-white hover:bg-themeRed/90 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-themeRed rounded-full flex items-center justify-center text-white hover:bg-themeRed/90 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {credentialImages.length}
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="absolute bottom-16 left-0 right-0 px-4 py-2 flex gap-2 justify-center overflow-x-auto">
                    {credentialImages.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-12 w-12 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-themeRed shadow-lg'
                            : 'border-white/30 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              {/* Credential Info */}
              <div className="absolute top-4 left-4 max-w-sm">
                <p className="text-sm font-semibold text-gray-900 bg-white/90 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  {activeCertification.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;
