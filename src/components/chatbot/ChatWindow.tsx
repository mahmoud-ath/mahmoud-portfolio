import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';
import { Message } from './types';

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  messages,
  isLoading,
  onClose,
  onSendMessage,
  onClearChat
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (message: string) => {
    onSendMessage(message);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col max-h-[500px] border border-gray-200 dark:border-gray-700 transition-colors duration-300 z-50"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-themeRed to-red-600 text-white p-3 rounded-t-xl flex items-center justify-between shadow-md">
          <div>
            <h2 className="text-base font-bold">Portfolio Assistant</h2>
            <p className="text-xs text-white/80">Ask me anything!</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onClearChat}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-300 text-white"
              title="Clear chat"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-300 text-white"
              title="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          <AnimatePresence>
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-3 h-3 border-2 border-transparent border-t-themeRed rounded-full"
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <QuickActions onActionClick={handleQuickAction} />
        </motion.div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl transition-colors duration-300">
          <div className="flex gap-1.5">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask something..."
              type="text"
              className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeRed transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-3 py-1.5 bg-themeRed text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold flex items-center gap-1"
            >
              <Send size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatWindow;
