import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick, isOpen, unreadCount = 0 }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center font-bold text-white transition-all duration-300 z-40 ${
        isOpen
          ? 'bg-red-700 dark:bg-red-800'
          : 'bg-themeRed dark:bg-themeRed hover:bg-red-700 dark:hover:bg-red-700'
      }`}
      title="Open chat assistant"
    >
      <motion.div
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle size={28} />
      </motion.div>

      {/* Unread Badge */}
      {unreadCount > 0 && !isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
        >
          {unreadCount}
        </motion.div>
      )}

      {/* Pulse animation when closed */}
      {!isOpen && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-themeRed opacity-20"
        />
      )}
    </motion.button>
  );
};

export default ChatBubble;
