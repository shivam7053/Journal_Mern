const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;

//routes

    //user
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

    //news
const newsRoutes = require('./routes/news');
app.use('/api/news', newsRoutes);

    //search
const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

    //journal
const journalRoutes = require('./routes/journal');
app.use('/api/journal', journalRoutes);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected.');
}).catch(err => {
  console.error('Connection error', err.message);
});

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
