import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Custom.css"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [college, setCollege] = useState('');
  const [introduction, setIntroduction] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://journal-mern-oefu.onrender.com/api/users/profile', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
        setProfilePhoto(res.data.profilePhoto || '');
        setCollege(res.data.college || '');
        setIntroduction(res.data.introduction || '');
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/profile', {
        profilePhoto,
        college,
        introduction
      }, {
        headers: { 'x-auth-token': token }
      });
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="BG-photo d-flex flex-column justify-content-center">
      <h2>Profile</h2>
      {editMode ? (
        <div>
          <label>Profile Photo URL</label>
          <input type="text" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} />
          <label>College/Organization</label>
          <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} />
          <label>Introduction</label>
          <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <img src={user.profilePhoto || 'https://via.placeholder.com/150'} alt="Profile" />
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>College/Organization:</strong> {user.college}</p>
          <p><strong>Introduction:</strong> {user.introduction}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
          <h3>Published Papers</h3>
          <ul>
            {user.publishedPapers?.map((paper, index) => (
              <li key={index}>{paper.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
