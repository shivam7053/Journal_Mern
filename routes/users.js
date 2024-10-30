const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');
const Manuscript = require('../models/Manuscript');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Route to get current user profile
  router.get('/profile', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      const publishedPapers = await Manuscript.find({ 'authors.email': user.email, status: 'approved' });
      res.json({ ...user._doc, publishedPapers });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Route to update user profile
  router.put('/profile', auth, async (req, res) => {
    try {
      const { profilePhoto, college, introduction } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.user.userId, { profilePhoto, college, introduction }, { new: true }).select('-password');
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get('/me', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  
  


module.exports = router;
