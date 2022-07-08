const router = require('express').Router();
const userController = require('../Controllers/userController');

router.get('/', userController.getUsers);

module.exports = router;