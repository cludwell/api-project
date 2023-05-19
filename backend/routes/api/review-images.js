const express = require('express')

const { Review, ReviewImage } = require('../../db/models');
const { check, Result } = require('express-validator');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { restoreUser } = require('../../utils/auth')

router.use(cookieParser())
//Delete a Review Image
router.delete('/:imageId', restoreUser, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    if (!reviewImage) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    const review = await Review.findOne({
        where: {
            id: reviewImage.reviewId
        }
    })
    if (review.userId !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    if (!review) {
    return res.status(404).json({
        message: "Resource doesnt exist",
        statusCode: 404
    })
    } else if (review.userId !== req.user.id) {
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
