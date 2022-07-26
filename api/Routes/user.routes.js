const router = require('express').Router();
const userController = require('../Controllers/userController');

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUserInfo);

router.post('/', userController.createUser);
router.patch('/:user_id', userController.updateUserData);

module.exports = router;