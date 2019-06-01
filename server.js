// ENV
require('dotenv').config();

// dependecies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

// Static File Service
app.use(express.static('public/views');
app.set('views', __dirname + 'public/views');
app.engine('html', require('ejs').renderFile);

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// Router
const User = require('./models/user.js');
const router = require('./routes.router.js')(app, User);

// port
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
