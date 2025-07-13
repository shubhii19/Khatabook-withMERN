const express = require('express');
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  profileController,
} = require('../controller/indexController.js');

const { isLoggedIn } = require('../middlewares/middleware.js');

// API Routes only (no EJS rendering anymore)
router.post('/api/register', registerController);
router.post('/api/login', loginController);
router.post('/api/logout', logoutController);
router.get('/api/profile', isLoggedIn, profileController);

module.exports = router;
