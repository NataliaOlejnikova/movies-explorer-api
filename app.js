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

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DB_PROD : 'mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.use(cors());

  app.use(requestLogger);

  app.use(limiter);

  app.use(routes);

  app.use(errorLogger);

  app.use(errors());

  app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
    next();
  });

  await app.listen(PORT);
}

main();
