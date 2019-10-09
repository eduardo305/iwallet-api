const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../controllers/AuthController');

const UserController = require('../controllers/UserController');

router.get('/', isAuthenticated, UserController.fetchUsers);

module.exports = router;
