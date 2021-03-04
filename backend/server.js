const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Routes
const items = require('./routes/api/items')

// Middleware
const app = express();
app.use(express.json());

// Load Environment Variables
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const port = process.env.PORT || 5000;
// DB Config
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
	app.use(express.static('../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../frontend/build/index.html'))
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));