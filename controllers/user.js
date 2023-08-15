const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const DataError = require('../errors/data-err');
const TokenError = require('../errors/token-err');
const ExistingEmailError = require('../errors/email-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const saltPassword = 10;

exports.getUserMe = async (req, res, next) => {
  const ownerId = req.user._id;
  try {
    const userSpec = await user.findById(ownerId);
    if (userSpec) {
      res.status(200).send({ data: userSpec });
    } else {
      throw new NotFoundError(`Пользователь по указанному ${ownerId} не найден`);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new DataError(`Невалидный id ${ownerId}`));
    } else {
      next(err);
    }
  }
};

exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, saltPassword)
    .then((hash) => {
      user.create({
        name,
        email,
        password: hash,
      })
        .then(() => {
          res.status(200).send({
            data: {
              name,
              email,
            },
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new DataError('Некорректные данные'));
          } else if (err.code === 11000) {
            next(new ExistingEmailError('Данный email уже существует в базе данных'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

exports.patchUserMe = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const opts = { new: true, runValidators: true };
    const ownerId = req.user._id;
    const userPatchMe = await user.findByIdAndUpdate(ownerId, { name, email }, opts);
    if (userPatchMe) {
      res.status(200).send({ data: userPatchMe });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new DataError('Некорректные данные'));
    } else if (err.code === 11000) {
      next(new ExistingEmailError('Данный email уже существует в базе данных'));
    } else {
      next(err);
    }
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((existingUser) => {
      const token = jwt.sign(
        { _id: existingUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new TokenError('Ошибка авторизации: неправильная почта или логин'));
    });
};
