require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const cors = require('./middlewares/cors');
const rateLimit = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_URL } = require('./utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.use(helmet());
app.use(rateLimit);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
