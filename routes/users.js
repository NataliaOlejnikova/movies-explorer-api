const express = require('express');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { validateUser } = require('../utils/validators/users');

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateUser);

module.exports = router;
