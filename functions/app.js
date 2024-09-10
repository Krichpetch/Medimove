// app.js

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('../routes/userRoutes');
const driverRoutes = require('../routes/driverRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://Test1:Medimove@webapp.tjqisgo.mongodb.net/";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

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

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

app.use('/driver', driverRoutes);
app.use('/user', userRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});