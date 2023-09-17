const express = require('express');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { login, createUser, logout } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../utils/validators/users');

const router = express.Router();

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.post('/signout', auth, logout);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый роут не найден'));
});

module.exports = router;
