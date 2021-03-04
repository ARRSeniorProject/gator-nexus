const express = require('express');
const mongoose = require('mongoose');

// Routes
const items = require('./routes/api/items')

// Middleware
const app = express();
app.use(express.json());

// Load Environment Variables
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const port = process.env.PORT || 5000;

// DB Config
//const db = require('./config/keys').mongoURI;
const db = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../frontend/build'));
}


// Connect to Mongo
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

app.listen(port, () => console.log(`Server started on port ${port}`));