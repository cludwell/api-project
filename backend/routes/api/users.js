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




// Sign up
router.post('/', async (req, res) => {
    const errors = {}
    const { email, password, username, firstName, lastName } = req.body;

    if (!email) errors.email = 'Invalid email'
    if (!username) errors.username = 'Username is required'
    if (!firstName) errors.firstName = 'First Name is required'
    if (!lastName) errors.lastName ='Last Name is required'
    if (!password) errors.password = 'Password is required'

    if (Object.keys(errors).length) {
      res.status(400).json({
        "message": "Validation error",
        "statusCode": 400,
        errors
      })
    }
    // condition for if user email exists
    const userEmail = await User.findOne({
      where: {email: email}
    })
    const userUsername = await User.findOne({
      where: {username: username}
    })


    if (userEmail) {
      let error = {
        title: 'User already exists with the specified email',
        message: "User already exists",
        statusCode: 403,
        errors: {
          email: 'User with that email already exists'
          }
        }
        res.status(403).json(error)
      }

      //condition for if user username exists
      if (userUsername) {
        let error = {
          title: 'User already exists with the specified username',
          message: "User already exists",
          statusCode: 403,
          errors: {
            username: 'User with that username already exists'
          }
        }
        res.status(403).json(error)
      }

      const user = await User.signup({ email, username, password, firstName, lastName});
      let token = await setTokenCookie(res, user);

      res.json({
        id: user.id,
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        token: token});
      }
      );


module.exports = router;
