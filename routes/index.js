const routes = require('express').Router();
const express = require('express');
const auth = require('../middlewares/auth');
const usersRouter = require('./user');
const movieRouter = require('./movie');

const {
  login,
  createUser,
} = require('../controllers/user');

const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validatons');

const NotFoundError = require('../errors/not-found-err');

routes.post('/signup', express.json(), signUpValidation, createUser);
routes.post('/signin', express.json(), signInValidation, login);

routes.use('/users', auth, usersRouter);
routes.use('/movies', auth, movieRouter);


routes.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый URL не существует'));
});

module.exports = routes;
