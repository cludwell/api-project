const express = require('express')

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

// router.use([setTokenCookie, restoreUser])

//get all reviews by spot id
router.get('/:spotId', async (req, res, next) =>{
    let Reviews = []
    let spotReviews = await Review.findAll({
        where: {spotId: req.params.spotId}
    })
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let error = {
            'Error Response': "Couldn't find a Spot with the specified id",
            'Status Code': 404,
            'Headers': { 'Content-Type': 'application/json'},
            'Body': {
                "message": "Spot couldn't be found",
                "statusCode": 404
            }
        }
        res.json(error)
    }
    for (let review of spotReviews) {
        let payload = {}
        let user = await User.findOne({
            where: {id: review['userId']},
            attributes: ['id', 'firstName', 'lastName']
        })
        let reviewImages = await ReviewImage.findAll({
            where: {reviewId: review.id},
            attributes: ['id', 'url']
        })
        for (let key in review.dataValues) payload[key] = review[key]
        payload.User = user
        payload.ReviewImages = reviewImages
        Reviews.push(payload)
    }

    res.status(200).json({Reviews: Reviews})
})

router.use((err, _req, _res, next) => {
    const error = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

module.exports = router;
