const router = require('express').Router();

const authController = require('../Controllers/authController');

// Authentication
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;