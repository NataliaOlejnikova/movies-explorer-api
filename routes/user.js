const express = require('express');
const userRoutes = express.Router();
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/user');
const { patchUserMeValidation } = require('../middlewares/validatons');

userRoutes.get('/users/me', getUserMe);

userRoutes.patch('/users/me', express.json(), patchUserMeValidation, patchUserMe);

module.exports = userRoutes;
