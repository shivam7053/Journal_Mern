import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');  // Assuming you're storing the token in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://journal-mern-oefu.onrender.com/api/news', 
        { title, content },
        { headers: { 'x-auth-token': token } }  // Use x-auth-token header
      );
      navigate('/');  // Redirect after successful submission
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  return (
    <div>
      <h2>Add News</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddNews;
