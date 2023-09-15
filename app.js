require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandle = require('./errors/handle-errors');

const { PORT = 3000, NODE_ENV, DB_PROD } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_PROD : 'https://api.nomoreparties.co/beatfilm-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});
const { requestLogger, errorLogger } = require('./middlewares/logger');


app.use(cors());

app.use(requestLogger);

app.use(express.json());

app.use('/', routes);

app.use(helmet());

app.use(errorLogger);

app.use(errors());

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
