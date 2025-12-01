import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Video, Image } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  videos?: string[]; // YouTube or video URLs
  title: string;
}

type MediaType = 'image' | 'video';

interface MediaItem {
  type: MediaType;
  url: string;
  thumbnail?: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, videos = [], title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Combine images and videos into a single media array
  const mediaItems: MediaItem[] = React.useMemo(() => {
    const items: MediaItem[] = [];

    // Add images
    images?.forEach(image => {
      items.push({
        type: 'image',
        url: image
      });
    });

    // Add videos
    videos?.forEach(video => {
      items.push({
        type: 'video',
        url: video,
        thumbnail: getVideoThumbnail(video)
      });
    });

    return items;
  }, [images, videos]);

  // Get YouTube thumbnail from URL
  const getVideoThumbnail = (url: string): string => {
    const youtubeId = extractYouTubeId(url);
    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    }
    return ''; // Return empty for non-YouTube videos or use a default thumbnail
  };

  // Extract YouTube video ID
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  if (!mediaItems || mediaItems.length === 0) {
    return (
      <section className="py-16">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 transition-colors duration-300">Gallery</h3>
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center justify-center transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No media available for this project</p>
        </div>
      </section>
    );
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = mediaItems[selectedIndex];

  const renderMedia = () => {
    if (currentMedia.type === 'video') {
      const videoId = extractYouTubeId(currentMedia.url);
      
      if (videoId) {
        return (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              className="w-full h-[600px] rounded-2xl"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={`${title} video`}
            />
          </div>
        );
      } else {
        // For non-YouTube videos, use HTML5 video player
        return (
          <div className="relative w-full h-full">
            <video
              src={currentMedia.url}
              className="w-full h-[600px] rounded-2xl object-cover"
              controls
              playsInline
            />
          </div>
        );
      }
    } else {
      return (
        <motion.img
          key={selectedIndex}
          src={currentMedia.url}
          alt={`${title} screenshot ${selectedIndex + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
        />
      );
    }
  };

  return (
    <section className="py-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 transition-colors duration-300">Gallery</h3>

      {/* Main Media Display */}
      <div className="relative bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden mb-6 transition-colors duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderMedia()}
          </motion.div>
        </AnimatePresence>

        {/* Media Type Badge */}
        <div className="absolute top-4 left-4 bg-black/70 dark:bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm transition-colors duration-300">
          {currentMedia.type === 'video' ? (
            <>
              <Video size={16} />
              Video
            </>
          ) : (
            <>
              <Image size={16} />
              Image
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        {mediaItems.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full p-2 shadow-lg dark:shadow-lg dark:shadow-black/40 backdrop-blur-sm transition-colors duration-300"
              aria-label="Previous media"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full p-2 shadow-lg dark:shadow-lg dark:shadow-black/40 backdrop-blur-sm transition-colors duration-300"
              aria-label="Next media"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Media Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 dark:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-colors duration-300">
              {selectedIndex + 1} / {mediaItems.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {mediaItems.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mediaItems.map((media, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all relative ${
                selectedIndex === index
                  ? 'border-themeRed shadow-lg dark:shadow-themeRed/40'
                  : 'border-gray-300 dark:border-gray-600 hover:border-themeRed dark:hover:border-themeRed'
              }`}
            >
              {/* Thumbnail Image */}
              {media.type === 'video' ? (
                <div className="relative">
                  <img
                    src={media.thumbnail}
                    alt={`Video thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center transition-colors duration-300">
                    <Play size={20} className="text-white fill-current" />
                  </div>
                </div>
              ) : (
                <img
                  src={media.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              )}

              {/* Media Type Indicator */}
              <div className={`absolute top-1 right-1 p-1 rounded-full ${
                media.type === 'video' ? 'bg-red-500 dark:bg-red-600' : 'bg-blue-500 dark:bg-blue-600'
              }`}>
                {media.type === 'video' ? (
                  <Video size={12} className="text-white" />
                ) : (
                  <Image size={12} className="text-white" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
