const express = require('express');
const router = express.Router();
const Manuscript = require('../models/Manuscript');

// Search route
router.get('/', async (req, res) => {
  try {
    const { type, query } = req.query;
    let results;
    if (type === 'author') {
      results = await Manuscript.find({ 'authors.name': new RegExp(query, 'i'), status: 'approved' });
    } else if (type === 'subject') {
      results = await Manuscript.find({ subject: new RegExp(query, 'i'), status: 'approved' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
