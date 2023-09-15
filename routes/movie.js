const express = require('express');
const moviesRoutes = express.Router();

const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movie');
const {
  validateUserMovieId,
  createMovieValidation,
} = require('../middlewares/validatons');

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', express.json(), createMovieValidation, createMovie);

moviesRoutes.delete('/_id', express.json(), validateUserMovieId, deleteMovieById);

module.exports = moviesRoutes;
