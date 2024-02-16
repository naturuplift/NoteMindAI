// Include packages needed for this application
const app = require('./app');
// import sequelize connection
const sequelize = require('./config/connection');

// set port the server will listen to
const PORT = process.env.PORT || 3000;


// To verify if Sequelize is successfully connecting to your database
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ force: false }) // Consider using 'force: true' only in development
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Sequelize sync error:', err));