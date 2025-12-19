import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Message } from './types';
import IconResponse from './components/IconResponse';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';

  const handleProjectRedirect = () => {
    if (message.projectSlug) {
      window.location.href = `/#/projects/${message.projectSlug}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-themeRed text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
        } shadow-md transition-all duration-300`}
      >
        <div>
          {isUser ? (
            <p className="text-sm font-medium whitespace-pre-wrap break-words">
              {message.content}
            </p>
          ) : (
            <>
              <IconResponse content={message.content} />
              {message.source === 'project' && message.projectSlug && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProjectRedirect}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-themeRed text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-xs font-semibold"
                >
                  View Full Project
                  <ArrowRight size={14} />
                </motion.button>
              )}
            </>
          )}
        </div>
        <span className={`text-xs mt-1 block ${isUser ? 'text-white/70' : 'text-gray-600 dark:text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
