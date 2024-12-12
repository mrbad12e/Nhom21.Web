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
router.get('/check', authenticate, (req, res) => {
  res.status(200).json({ message: 'User is authenticated', user: req.user });
});

module.exports = router;
