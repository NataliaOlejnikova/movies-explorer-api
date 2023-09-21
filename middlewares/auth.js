const jwt = require('jsonwebtoken');
const TokenError = require('../errors/token-err');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new TokenError('Ошибка авторизации: неправильная почта или логин');
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new TokenError('Ошибка авторизации: не получилось верифицировать токен');
  }

  req.user = payload;

  next();
};
