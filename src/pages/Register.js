import React, { useState } from 'react';
import axios from 'axios';
import "./Custom.css"

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user' // default role
  });

  const { fullName, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://journal-mern-oefu.onrender.com/api/users/register', formData);
      if (res && res.data) {
        alert(res.data.message);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <div className="BG-photo d-flex flex-column justify-content-center">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={fullName} onChange={onChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
