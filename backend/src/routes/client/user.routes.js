const express = require('express');
const UserController = require('../../controllers/client/user.controller');
const authenticate = require('../../middleware/auth/authenticate');
const { uploadProfileImage } = require('../../middleware/upload.middleware');
const router = express.Router();

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.createAccount);
router.get('/signout', authenticate, UserController.signOut);
router.put('/profile', authenticate, uploadProfileImage, UserController.updateProfile);
router.put('/password', authenticate, UserController.updatePassword);

module.exports = router;
