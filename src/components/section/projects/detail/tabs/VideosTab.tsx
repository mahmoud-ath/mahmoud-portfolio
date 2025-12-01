import React, { useState, useMemo } from 'react';
import { motion} from 'framer-motion';
import { Play, Film } from 'lucide-react';

interface VideosTabProps {
  videos: string[] | undefined;
  title: string;
}

const VideosTab: React.FC<VideosTabProps> = ({ videos, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Extract YouTube video IDs
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (url: string): string => {
    const id = extractYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  };

  const processedVideos = useMemo(() => {
    if (!videos || videos.length === 0) return [];
    return videos.map((url) => ({
      url,
      id: extractYouTubeId(url),
      thumbnail: getYouTubeThumbnail(url),
    }));
  }, [videos]);

  if (!processedVideos || processedVideos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No videos available for this project</p>
      </div>
    );
  }

  const currentVideo = processedVideos[selectedIndex];

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
      {/* Left Column - Playlist */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Video Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Videos
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 transition-colors duration-300">
            {processedVideos.length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
            Project demonstration{processedVideos.length !== 1 ? 's' : ''}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((selectedIndex + 1) / processedVideos.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-red-500 dark:bg-red-600 h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            Playlist
          </h4>
          <div className="space-y-2">
            {processedVideos.map((video, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedIndex === idx
                    ? 'border-red-500 dark:border-red-600 shadow-md dark:shadow-red-500/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'
                }`}
              >
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden group">
                  {video.thumbnail && (
                    <img
                      src={video.thumbnail}
                      alt={`Video ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  {!video.thumbnail && (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 dark:from-gray-600 to-gray-300 dark:to-gray-700 flex items-center justify-center">
                      <Play className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 dark:group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <div className="w-10 h-10 bg-red-500/80 dark:bg-red-600/80 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-red-50 dark:from-red-900/20 to-pink-50 dark:to-pink-900/20 border-t-2 border-red-500/10 dark:border-red-900/40">
                  <p className="text-xs font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">Video {idx + 1}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Video Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-red-50 dark:from-red-900/20 to-pink-50 dark:to-pink-900/20 rounded-2xl border border-red-200 dark:border-red-800 p-6 shadow-sm dark:shadow-none transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-red-900 dark:text-red-300 mb-4 transition-colors duration-300">
            Video Stats
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-800 dark:text-red-300 transition-colors duration-300">Total Videos</span>
              <span className="font-bold text-red-600 dark:text-red-400 transition-colors duration-300">{processedVideos.length}</span>
            </div>
            <div className="border-t border-red-200 dark:border-red-800 pt-3 flex items-center justify-between transition-colors duration-300">
              <span className="text-sm text-red-800 dark:text-red-300 transition-colors duration-300">Currently Playing</span>
              <span className="font-bold text-red-600 dark:text-red-400 transition-colors duration-300">{selectedIndex + 1}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Player */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Player */}
        <motion.div
          variants={itemVariants}
          className="bg-black dark:bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-500"
        >
          <div className="relative bg-black aspect-video">
            {currentVideo.id ? (
              <iframe
                key={`video-${selectedIndex}`}
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={`${title} Video ${selectedIndex + 1}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 dark:from-gray-900 to-gray-900 dark:to-black">
                <p className="text-white text-center">Video not available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Video Info */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {title} - Video {selectedIndex + 1}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                {selectedIndex + 1} of {processedVideos.length} videos
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-bold transition-colors duration-300">
              {Math.round(((selectedIndex + 1) / processedVideos.length) * 100)}%
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(selectedIndex === 0 ? processedVideos.length - 1 : selectedIndex - 1)}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-2xl transition-all duration-500 flex items-center justify-center gap-2"
            >
              <span>← Previous</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(selectedIndex === processedVideos.length - 1 ? 0 : selectedIndex + 1)}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 hover:from-red-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-red-500/30 flex items-center justify-center gap-2"
            >
              <span>Next →</span>
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 transition-colors duration-300">Playlist Progress</span>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 transition-colors duration-300">{Math.round(((selectedIndex + 1) / processedVideos.length) * 100)}%</span>
            </div>
            <motion.div
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 transition-colors duration-300"
            >
              <motion.div
                animate={{ width: `${((selectedIndex + 1) / processedVideos.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 h-full rounded-full transition-colors duration-300"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideosTab;
