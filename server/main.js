const express = require('express');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = 80;
const devPort = 80;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/db_forNewbieProject');

app.use(session({
  secret: 'ohjellybelly777', 
  resave: false, 
  saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());

const api = require('./routes/index');
app.use('/api', api);

app.use('/', express.static(path.join(__dirname, './../dist')));

app.listen(port, () => {
  console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(
      devPort, () => {
          console.log('webpack-dev-server is listening on port', devPort);
      }
  );
}

