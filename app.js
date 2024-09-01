require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    })
}));

// Increase the max listeners limit
require('events').EventEmitter.defaultMaxListeners = 20;

app.use(passport.initialize());
app.use(passport.session()); // Ensure this line is uncommented

// Connect to the database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.get('*', function (req, res) {
    res.status(404).render('404');
});

// Start server
app.listen(port, () => {
    console.log('App listening on port ' + port);
});
