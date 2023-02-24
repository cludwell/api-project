const { validationResult, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Validation error";
    next(err);
  }
  next();
};

// const validateSpotCreation = [
//   check('address')
//     .exists({checkFalsy: true})
//     .withMessage("Street address is required"),
//   check('city')
//     .exists({checkFalsy: true})
//     .withMessage('City is required'),
//   check('state')
//     .exists({checkFalsy: true})
//     .withMessage('State is required'),
//   check('country')
//     .exists({checkFalsy: true})
//     .withMessage('Country is required'),
//   check('lat')
//     .exists({checkFalsy: true})
//     .
// ]
module.exports = {
  handleValidationErrors
};
