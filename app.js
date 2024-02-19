// Include packages needed for this application
const express = require('express');
const session = require('express-session');
// Imports the routing files from ./routes directory
const routes = require('./routes');
// const bodyParser = require('body-parser');
const path = require('path');
// import sequelize connection
const sequelize = require('./config/connection');
const morgan = require('morgan');
require('dotenv').config();

// set port the server will listen to
const PORT = process.env.PORT || 3000;

// initializes a new instance of the Express application
const app = express();

// Session middleware setup
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: 'auto',
    httpOnly: true,
    maxAge: 3600000 // Example: expires in 1 hour
  }
}));

//Setting view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the landing page
app.get('/', (req, res) => {
  res.render('index');
});

//editor
app.use('/quill', express.static(path.join(__dirname, 'node_modules/quill/dist')));


app.use(morgan('tiny')); // Log every request to the console

// middleware function mwLogger
const mwLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};
app.use(mwLogger);

// express app to use the routes defined
app.use(routes);

// To verify if Sequelize is successfully connecting to your database
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
sequelize.sync({ force: false }) // Consider using 'force: true' only in development
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Sequelize sync error:', err));