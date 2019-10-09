const express = require('express');
const router = express.Router();

const AuthRoutes = require('../controllers/AuthController');

router.post('/signin', AuthRoutes.signin);
router.post('/signup', AuthRoutes.signup);

module.exports = router;
