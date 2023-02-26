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
    let reviewImage = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewImage || !review) {
        res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    let review = await Review.findOne({
        where: {
            userId: req.user.id,
            id: reviewImage.reviewId
        }
    })
    if (review.userId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
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

module.exports = router;
