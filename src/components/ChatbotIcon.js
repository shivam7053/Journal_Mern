import React, { useState } from 'react';
import ChatbotInterface from './ChatbotInterface'; // This is the main chatbot interface component

const ChatbotIcon = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div>
      <button onClick={toggleChatbot} style={iconStyle}>
        💬
      </button>
      {showChatbot && <ChatbotInterface />}
    </div>
  );
};

const iconStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  padding: '10px',
  fontSize: '24px',
  cursor: 'pointer',
};

export default ChatbotIcon;
