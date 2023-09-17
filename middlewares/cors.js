const ALLOWED_ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3001',
  'https://localhost:3000',
  'https://react-mesto-backend.nomoreparties.co',
  'http://react-mesto-backend.nomoreparties.co',
];

const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method, headers } = req;
  const {
    origin,
    'access-control-request-headers': requestHeaders,
  } = headers;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }
  next();
};
