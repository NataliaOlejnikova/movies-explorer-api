const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://react-mesto-backend.nomoreparties.co',
    'http://react-mesto-backend.nomoreparties.co',
    'https://movies-frontend-nataolej.nomoredomainsicu.ru',
    'http://movies-frontend-nataolej.nomoredomainsicu.ru',
    'https://api.nomoreparties.co/beatfilm-movies'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = corsOptions;