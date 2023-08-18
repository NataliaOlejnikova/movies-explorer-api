const express = require('express');
const userRoutes = express.Router();
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/user');
const { patchUserMeValidation } = require('../middlewares/validatons');

userRoutes.get('/me', getUserMe);

userRoutes.patch('/me', express.json(), patchUserMeValidation, patchUserMe);

module.exports = userRoutes;
