const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


//sign in
router.post('/login', async (req, res, next) => {

  const { credential, password } = req.body
  const userLogin = await User.login({credential, password})

  const credentialError = {
  title: 'Validation error',
  message: 'Validation error',
  statusCode: 400,
  errors: {}
}

  if (!password) credentialError.errors.password = 'Password is required'
  if (!credential) credentialError.errors.credential = 'Email or username is required'

  if(!credential || !password) {
    res.status(400).json(credentialError)
  }
  if (!userLogin && credential && password) {
    const error = new Error('Invalid credentials')
    error.message = 'Invalid credentials'
    error.statusCode = 401
    res.status(401).json(error)
  }

  res.status(200).json(userLogin)
})

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const errors = {}
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName});
    let token = await setTokenCookie(res, user);

    // if (!firstName) errors.firstName = 'First Name is required'
    // if (!lastName) errors.lastName ='Last Name is required'

    // //conditionfor if user email exists
    // const userEmail = await User.findOne({
    //   where: {email: email}
    // })
    // const userUsername = await User.findOne({
    //   where: {username: username}
    // })

    // if (userEmail && !errors && !userUsername) {
    //   let error = new Error('User already exists with the specified email')
    //   error.message = "User already exists"
    //   error.statusCode = 403
    //   error.errors = {
    //     email: 'User with that email already exists'
    //   }
    //   res.json(error)
    // }

    // //condition for if user username exists

    // if (userUsername && !errors && !userEmail) {
    //   let error = new Error('User already exists with the specified username')
    //   error.message = "User already exists"
    //   error.statusCode = 403
    //   error.errors = {
    //     username: 'User with that username already exists'
    //   }
    // }

    // if (errors && userEmail || userUsername) {

    //   res.status(400).json()
    // }
    res.json({
      email: email,
      password: password,
      username: username,
      firstName: firstName,
      lastName: lastName,
      token: token});
  }
);


module.exports = router;
