require('dotenv').config();

const cors = require('cors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 10000;

// Apply CORS middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Set up session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL
  })
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Connect to Database
connectDB();

// Serve static files
app.use(express.static('public'));

// Set up templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Define routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
