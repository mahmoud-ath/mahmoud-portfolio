import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Share2, ExternalLink, Book, Layers, Wrench, Plug, BarChart3, Rocket, Lightbulb, Loader2 } from 'lucide-react';

interface DocumentationTabProps {
  documentation: string | undefined;
  title: string;
}

const DocumentationTab: React.FC<DocumentationTabProps> = ({ documentation, title }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!documentation) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">No documentation available for this project</p>
      </div>
    );
  }

  const fileName = documentation.split('/').pop() || 'documentation.pdf';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(documentation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // FIXED: Proper download function
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Method 1: Using fetch and blob (Recommended)
      const response = await fetch(documentation);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: Open in new tab if download fails
      window.open(documentation, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  // Alternative: Simple download with download attribute
  const getDownloadUrl = () => {
    // If it's a relative path, ensure it's absolute
    if (documentation.startsWith('/')) {
      return `${window.location.origin}${documentation}`;
    }
    return documentation;
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

  const features = [
    {
      icon: Layers,
      title: 'Complete Overview',
      description: 'Project overview and key features',
    },
    {
      icon: Wrench,
      title: 'Architecture',
      description: 'System design and patterns',
    },
    {
      icon: Plug,
      title: 'Setup Guide',
      description: 'Installation instructions',
    },
    {
      icon: Plug,
      title: 'API Reference',
      description: 'Complete API documentation',
    },
    {
      icon: BarChart3,
      title: 'Data Models',
      description: 'Database schemas',
    },
    {
      icon: Rocket,
      title: 'Deployment',
      description: 'Production guidelines',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column - Info & Features */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Documentation Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Documentation
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 transition-colors duration-300">PDF</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
            Complete project documentation
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
            <FileText size={14} />
            {fileName}
          </div>
        </motion.div>

        {/* Quick Features */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            Included Sections
          </h4>
          <div className="space-y-3">
            {features.slice(0, 3).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <feature.icon className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">{feature.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* More Features */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            More Sections
          </h4>
          <div className="space-y-3">
            {features.slice(3).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <feature.icon className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">{feature.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Doc Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-6 shadow-sm dark:shadow-none transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-violet-900 dark:text-violet-300 mb-4 transition-colors duration-300">
            Document Info
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-violet-800 dark:text-violet-300 transition-colors duration-300">Type</span>
              <span className="font-bold text-violet-600 dark:text-violet-400 transition-colors duration-300">PDF</span>
            </div>
            <div className="border-t border-violet-200 dark:border-violet-800 pt-3 flex items-center justify-between transition-colors duration-300">
              <span className="text-sm text-violet-800 dark:text-violet-300 transition-colors duration-300">Format</span>
              <span className="font-bold text-violet-600 dark:text-violet-400 transition-colors duration-300">Portable</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Preview & Actions */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Document Preview Card */}
        <motion.div
          variants={itemVariants}
          className="bg-violet-100 dark:bg-violet-900/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-8 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-violet-500/20 transition-all duration-500"
        >
          <div className="space-y-6">
            {/* Preview Icon */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="flex justify-center"
            >
              <div className="w-32 h-40 bg-violet-500 dark:bg-violet-600 rounded-lg flex items-center justify-center shadow-lg dark:shadow-violet-500/30">
                <FileText className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Document Details */}
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {title} Documentation
              </h3>
              <p className="text-gray-700 dark:text-gray-400 transition-colors duration-300">
                Technical documentation and implementation guide for the {title} project. Includes detailed specifications, API documentation, code examples, and best practices.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 transition-colors duration-300">
                <FileText size={16} />
                <span>{fileName}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons - FIXED */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-themeRed/20 transition-all duration-500"
        >
          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
            Quick Actions
          </h4>
          <div className="space-y-3">
            {/* FIXED: Download Button */}
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-violet-500 dark:bg-violet-600 hover:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold rounded-lg transition-all duration-500 shadow-md hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download PDF
                </>
              )}
            </motion.button>

            {/* Alternative Download Method */}
            <motion.a
              href={getDownloadUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-all duration-500"
            >
              <ExternalLink size={18} />
              Open in New Tab
            </motion.a>

          </div>
        </motion.div>

        {/* Info Tip */}
        <motion.div
          variants={itemVariants}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm dark:shadow-none transition-all duration-500"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-blue-900 dark:text-blue-300 mb-2 transition-colors duration-300">
                Pro Tip
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 transition-colors duration-300">
                Download the complete PDF documentation for step-by-step guides, code examples, troubleshooting tips, and more. Perfect for offline reference.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DocumentationTab;