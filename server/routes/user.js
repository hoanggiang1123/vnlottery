const express = require('express');
const router = express.Router();

const { post_signup, post_signin } = require('../controllers/user')

const { runValidation } = require('../validator')

const { userSignUpValidation, userSignInValidation } = require('../validator/user')

router.post('/signup', userSignUpValidation, runValidation, post_signup);

router.post('/signin', userSignInValidation, runValidation, post_signin);

module.exports = router;
