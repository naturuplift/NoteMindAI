// Include packages needed for this application
const express = require('express');
require('dotenv').config();

// initializes a new instance of the Express application
const app = express();
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");

//for swagger documentation
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const bodyParser = require('body-parser');

//cookies and file middleware
// app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

//temp check
app.set("view engine", "ejs");

// morgan middleware
app.use(morgan('tiny'));

// Imports the routing files from ./routes directory
const routes = require('./routes');
// express app to use the routes defined
app.use(routes);

//to handle production error
// app.use(productionError);



const path = require('path');
//Setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev')); // Log every request to the console

// express app to recognize incoming requests as JSON objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//editor
app.use('/quill', express.static(path.join(__dirname, 'node_modules/quill/dist')));

const notes =[];

app.get('/notes/new', (req, res) => {
  res.render('newNote');
});


// includes openAIService.js file
const openAIService = require('./services/openAIService');

// Call OpenAI summarizeText function in openAIService.js file
async function summarizeNoteController(req, res) {
  try {
    // Assuming note content comes in the request body
    const noteContent = req.body.noteContent;
    // Call summarizeText function from openaiService
    const summary = await openAIService.summarizeText(noteContent);
    // return summary response to content
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Define an endpoint '/summarize' that uses summarizeNoteController
app.post('/summarize', summarizeNoteController); // TODO: uncomment when need to use


// middleware function mwLogger
// const mwLogger = (req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// };
// app.use(mwLogger);

// export app js
module.exports = app;