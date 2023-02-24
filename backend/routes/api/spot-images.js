const express = require('express')

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check, Result } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

router.delete('/:imageId', restoreUser, async (req, res) => {
    let spotimage = await SpotImage.findByPk(req.params.imageId)
    let spotTiedToImage = await Spot.findOne(spotimage.spotId)
    if (!spotimage) {
        res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    } else if (spotTiedToImage.ownerId !== req.user.id) {
        res.status(403).json({
            "message": "Unauthorized user cannot delete this spot image",
            "statusCode": 403
          })
    } else {
        await reviewImage.destroy()
        res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

router.use((err, _req, _res, next) => {
    err.title = "Resource Not Found";
    err.message = "Review Image couldn't be found";
    err.statusCode = 404;
    err.status = 404
    next(err);
  });

module.exports = router;
