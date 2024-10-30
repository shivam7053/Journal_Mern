import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatbotInterface = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSearch = () => {
    navigate(`/search/${searchType}/${searchQuery}`);
  };

  return (
    <div style={chatbotStyle}>
      {step === 1 && (
        <div>
          <p>Please enter your full name:</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Hello, {name}! What would you like to search for?</p>
          <button onClick={() => { setSearchType('author'); handleNextStep(); }}>Search by Author</button>
          <button onClick={() => { setSearchType('subject'); handleNextStep(); }}>Search by Subject</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <p>Enter the {searchType} you are looking for:</p>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
};

const chatbotStyle = {
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  width: '300px',
  height: '400px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

export default ChatbotInterface;
