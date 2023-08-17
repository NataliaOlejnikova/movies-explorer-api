const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const { routes } = require('./routes');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DB_PROD } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_PROD : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

  app.use(cors());

  app.use(requestLogger);

  app.use(limiter);

  app.use(routes);

  app.use(errorLogger);
  
  app.use(errors());
  
  app.use(errorHandle);

  app.listen(PORT, () => {
    console.log('App listening on port ${PORT}');
  });
