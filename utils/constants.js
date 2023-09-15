// constants errors
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  /(https|http)?:\/\/(?:www\.|(?!www))movies-api.nomoredomains.xyz\/[a-z]+\/|[a-z]+\/|[a-z]+(\/|)/,
];

const errorMessages = {
  image: 'неправильный формат ссылки на картинку',
  trailerLink: 'неправильный формат ссылки на трейлер',
  thumbnail: 'неправильный формат ссылки на постер',
  createMovie: 'неправильные данные при создании фильма',
  movieNotFound: 'Фильм не найден',
  removeMovie: 'фильм другого пользователя удалить нельзя',
  userNotFound: 'пользователь не существует',
  createUser: 'пользователь уже существует',
  updateProfile: 'email с таким именем уже зарегистрирован',
  incorrectData: 'неправильный логин или пароль',
  incorrectEmail: 'некорректный формат почты',
  incorrectPath: 'неправильный путь',
  auth: 'необходима авторизация',
  crash: 'сервер сейчас перегружен',
};

module.exports = { allowedCors, errorMessages };
