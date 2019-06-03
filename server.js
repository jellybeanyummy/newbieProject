// ENV
require('dotenv').config();

// dependecies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//const PORT = process.env.PORT;
const PORT = 80;

// MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Succeccfully connected to mongodb'))
  .catch(e => console.error(e));
const db = mongoose.connection;

// Static File Service
const app = express();
app.use(express.static('public/views'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User
const User = require('./models/user.js');

//session
app.use(session({
  secret: 'itmustbelove200percent', 
  resave: true, 
  saveUninitialized: false, 
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//Router
const router = require('./routes/router.js')(app, User);

// port
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
