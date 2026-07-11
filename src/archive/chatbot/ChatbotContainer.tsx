import React from 'react';
import { useChatbot } from './useChatbot';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';

const ChatbotContainer: React.FC = () => {
  const {
    isOpen,
    messages,
    isLoading,
    toggleChat,
    sendMessage,
    clearChat
  } = useChatbot();

  return (
    <>
      {/* Floating Chat Bubble */}
      <ChatBubble
        onClick={toggleChat}
        isOpen={isOpen}
        unreadCount={0}
      />

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          isOpen={isOpen}
          messages={messages}
          isLoading={isLoading}
          onClose={toggleChat}
          onSendMessage={sendMessage}
          onClearChat={clearChat}
        />
      )}
    </>
  );
};

export default ChatbotContainer;
