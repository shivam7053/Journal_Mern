import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Review from './pages/Review';
import SubmitManuscript from './pages/SubmitManuscript';
import AddNews from './pages/AddNews';
import SearchResults from './pages/SearchResults';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotIcon from './components/ChatbotIcon';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/review" element={<Review />} />
          <Route path="/submit-manuscript" element={<SubmitManuscript />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/search/:searchType/:searchQuery" element={<SearchResults />} />
        </Routes>
        <ChatbotIcon />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
