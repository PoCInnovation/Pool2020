const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { config } = require('dotenv');

const routeUtils = require('./routes/request');

config();

const startServer = () => {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.text());
  app.use(bodyParser.json());

  app.use(routeUtils);

  app.listen(process.env.PORT || 8080, () => {
    console.log("Ready.");
  });
};

startServer();