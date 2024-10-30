import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Custom.css"

const Review = () => {
  const [manuscripts, setManuscripts] = useState([]);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://journal-mern-oefu.onrender.com/api/journal/manuscripts', {
          headers: { 'x-auth-token': token }
        });
        setManuscripts(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchManuscripts();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/journal/manuscripts/${id}`, { status }, {
        headers: { 'x-auth-token': token }
      });
      setManuscripts(manuscripts.map(m => m._id === id ? res.data : m));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="BG-photo d-flex flex-column justify-content-center">
      <h2>Review Manuscripts</h2>
      <ul>
        {manuscripts.map(m => (
          <li key={m._id}>
            <strong>Title:</strong> {m.title} - <strong>Status:</strong> {m.status}
            <br />
            <strong>Authors:</strong> {m.authors.map(a => `${a.name} (${a.type}, ${a.email})`).join(', ')}
            <br />
            <strong>Abstract:</strong> {m.abstract}
            <br />
            <strong>Subject:</strong> {m.subject}
            <br />
            <strong>File:</strong> <button onClick={() => handleDownload(m.file)}>Download</button>
            <br />
            <button onClick={() => handleStatusChange(m._id, 'approved')}>Approve</button>
            <button onClick={() => handleStatusChange(m._id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
