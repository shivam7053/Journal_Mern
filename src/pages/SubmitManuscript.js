import React, { useState } from 'react';
import axios from 'axios';
import "./Custom.css"

const SubmitManuscript = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([{ name: '', email: '', type: '' }]);
  const [abstract, setAbstract] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...authors];
    newAuthors[index][field] = value;
    setAuthors(newAuthors);
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, { name: '', email: '', type: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('authors', JSON.stringify(authors));
      formData.append('abstract', abstract);
      formData.append('subject', subject);
      formData.append('file', file);

      const token = localStorage.getItem('token');
      await axios.post('https://journal-mern-oefu.onrender.com/api/journal/manuscripts', formData, {
        headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
      });

      alert('Manuscript submitted successfully!');
      setTitle('');
      setAuthors([{ name: '', email: '', type: '' }]);
      setAbstract('');
      setSubject('');
      setFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="BG-photo d-flex flex-column justify-content-center">
      <h2>Submit New Manuscript</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        {authors.map((author, index) => (
          <div key={index}>
            <label>Author {index + 1}</label>
            <input type="text" placeholder="Name" value={author.name} onChange={(e) => handleAuthorChange(index, 'name', e.target.value)} required />
            <input type="email" placeholder="Email" value={author.email} onChange={(e) => handleAuthorChange(index, 'email', e.target.value)} required />
            <select value={author.type} onChange={(e) => handleAuthorChange(index, 'type', e.target.value)} required>
              <option value="">Select Type</option>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>
        ))}
        {authors.length < 4 && <button type="button" onClick={handleAddAuthor}>Add Author</button>}

        <div>
          <label>Abstract</label>
          <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required />
        </div>

        <div>
          <label>Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>

        <div>
          <label>File</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitManuscript;
