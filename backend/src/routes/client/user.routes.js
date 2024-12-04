const express = require('express');
const UserController = require('../../controllers/client/user.controller');

const router = express.Router();

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.createAccount);
router.put('/profile/:id', UserController.updateProfile);
router.put('/password', UserController.updatePassword);
router.get('/cart/:id', UserController.getCart);

module.exports = router;
