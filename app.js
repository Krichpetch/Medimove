// app.js

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Replaces body-parser for URL-encoded data
app.use(express.json()); // Replaces body-parser for JSON data
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Index' });
});


app.use('/driver', driverRoutes);
app.use('/user', userRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});