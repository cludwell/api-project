const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
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
// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
  );

module.exports = router;
