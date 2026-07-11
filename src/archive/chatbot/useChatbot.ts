import { useState, useCallback, useEffect } from 'react';
import { Message, ChatbotConfig } from './types';
import { processMessage, generateBotMessage, generateUserMessage } from './utils/messageProcessor';

export const useChatbot = () => {
  const [config, setConfig] = useState<ChatbotConfig>({
    isOpen: false,
    messages: [],
    isLoading: false
  });

  // Initialize with greeting
  useEffect(() => {
    const initialGreeting: Message = {
      id: '0',
      type: 'bot',
      content: "👋 Hi! I'm Mahmoud's portfolio assistant. Ask me anything about my skills, projects, or experience!",
      timestamp: new Date(),
      source: 'intent'
    };
    setConfig(prev => ({ ...prev, messages: [initialGreeting] }));
  }, []);

  const toggleChat = useCallback(() => {
    setConfig(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message
    const userMsg = generateUserMessage(userInput);
    setConfig(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true
    }));

    try {
      // Process message and get response
      const { response, source, intent } = await processMessage(userInput);
      
      // Add slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const botMsg = generateBotMessage(response, source);
      setConfig(prev => ({
        ...prev,
        messages: [...prev.messages, botMsg],
        isLoading: false
      }));
    } catch (error) {
      const errorMsg = generateBotMessage(
        "Sorry, something went wrong. Please try again.",
        'fallback'
      );
      setConfig(prev => ({
        ...prev,
        messages: [...prev.messages, errorMsg],
        isLoading: false,
        error: 'Failed to process message'
      }));
    }
  }, []);

  const clearChat = useCallback(() => {
    const initialGreeting: Message = {
      id: '0',
      type: 'bot',
      content: "👋 Hi! I'm Mahmoud's portfolio assistant. Ask me anything about my skills, projects, or experience!",
      timestamp: new Date(),
      source: 'intent'
    };
    setConfig(prev => ({ ...prev, messages: [initialGreeting] }));
  }, []);

  return {
    ...config,
    toggleChat,
    sendMessage,
    clearChat
  };
};
