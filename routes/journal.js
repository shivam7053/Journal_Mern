const express = require('express');
const router = express.Router();
const Manuscript = require('../models/Manuscript');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Route to fetch pending manuscripts for review
router.get('/manuscripts', authMiddleware, async (req, res) => {
  if (req.user.role !== 'editor' && req.user.role !== 'administrator') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const manuscripts = await Manuscript.find({ status: 'pending review' });
  res.json(manuscripts);
});

// Route to update manuscript status
router.put('/manuscripts/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'editor' && req.user.role !== 'administrator') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { status } = req.body;
  const manuscript = await Manuscript.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(manuscript);
});

// Route to submit a new manuscript
router.post('/manuscripts', authMiddleware, upload.single('file'), async (req, res) => {
    try {
      const { title, authors, abstract, subject } = req.body;
      const file = req.file ? req.file.path : null;
  
      const newManuscript = new Manuscript({
        title,
        authors: JSON.parse(authors),
        abstract,
        subject,
        file,
        status: 'pending review'
      });
  
      await newManuscript.save();
      res.status(201).json(newManuscript);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  
});

// Route to fetch approved journals
router.get('/journal', async (req, res) => {
    try {
      const journals = await Manuscript.find({ status: 'approved' }).populate('authors', 'name email type');
      res.json(journals);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
