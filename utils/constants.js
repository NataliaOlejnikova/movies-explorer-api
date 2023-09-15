// constants errors
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  /(https|http)?:\/\/(?:www\.|(?!www))react-mesto-backend.nomoreparties.co\/[a-z]+\/|[a-z]+\/|[a-z]+(\/|)/,
];

module.exports = { allowedCors};
