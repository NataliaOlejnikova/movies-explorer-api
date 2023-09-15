const movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const DataError = require('../errors/data-err');
const DeleteCardError = require('../errors/delete-card-err');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch(next);
};
exports.deleteMovieById = (req, res, next) => {
  const ownerId = req.user._id;
  movie.findById(req.params.userMovieId)
    .orFail(() => new NotFoundError('Нет карточки с фильмом по заданному id'))
    .then((userMovie) => {
      if (!userMovie.owner.equals(ownerId)) {
        return next(new DeleteCardError('Чужая карточка с фильмом не может быть удалена'));
      }
      return userMovie.remove()
        .then(() => res.status(200).send(userMovie));
    })
    .catch(next);
};

exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const movieNew = await movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    res.status(201).send({ data: movieNew });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new DataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
