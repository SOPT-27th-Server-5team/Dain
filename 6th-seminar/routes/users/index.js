const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authUtils.checkToken ,userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile); // profile 위치는 id 위로 놓고 작성해야한다. 안그러면 id에 profile값 들어감!
router.get('/:id', authUtils.checkToken, userController.readOne);

module.exports = router;