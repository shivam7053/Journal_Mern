import React, { useState } from 'react';

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input) {
      setChat([...chat, { user: true, message: input }]);
      setInput('');
      // Simulate a chatbot response
      setTimeout(() => {
        setChat([...chat, { user: true, message: input }, { user: false, message: `You asked about: ${input}` }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {chat.map((msg, index) => (
          <div key={index} className={msg.user ? 'user-message' : 'bot-message'}>
            {msg.message}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
