import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

const app = express();
const port = 80;
const devPort = 80;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/Scrapbook');

app.use(session({
  secret: 'ohjellybelly777', 
  resave: false, 
  saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());

import api from './routes';
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

