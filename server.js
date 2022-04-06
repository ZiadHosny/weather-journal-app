// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Initialize the main images folder
app.use('/website/img', express.static('website/img'));

// Setup Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on: ${port}`));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// get route
app.get('/all', (req, res) => res.send(projectData).status(200).end);

// Post the new Weather data
app.post('/add', (req, res) => {
  projectData = {
    icon: req.body.icon,
    date: req.body.date,
    city: req.body.city,
    temp: req.body.temp,
    desc: req.body.desc,
    content: req.body.content,
  };
  res.send(projectData).status(200).end;
});
