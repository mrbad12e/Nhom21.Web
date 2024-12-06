const express = require('express');
const UserController = require('../../controllers/client/user.controller');
<<<<<<< HEAD
=======
const { authenticate } = require('../../middleware/auth/authenticate');
>>>>>>> b5f7bb4131230df3ec402beae7c35a43e242ff76

const router = express.Router();

router.post('/signin', UserController.signIn);
router.post('/signup', UserController.createAccount);
router.get('/signout', authenticate, UserController.signOut);
router.put('/profile', authenticate, UserController.updateProfile);
router.put('/password', authenticate, UserController.updatePassword);

module.exports = router;
