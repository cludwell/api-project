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

// router.use([setTokenCookie, restoreUser])

//get all reviews by spot id
// router.get('/:spotId', async (req, res, next) =>{
//     let Reviews = []
//     let spotReviews = await Review.findAll({
//         where: {spotId: req.params.spotId}
//     })
//     let spot = await Spot.findByPk(req.params.spotId)
//     if (!spot) {
//         let error =  {
//             "message": "Spot couldn't be found",
//             "statusCode": 404
//         }
//         res.status(404).json(error)
//     }

//     for (let review of spotReviews) {
//         let payload = {}
//         let user = await User.findOne({
//             where: {id: review['userId']},
//             attributes: ['id', 'firstName', 'lastName']
//         })
//         let reviewImages = await ReviewImage.findAll({
//             where: {reviewId: review.id},
//             attributes: ['id', 'url']
//         })
//         for (let key in review.dataValues) payload[key] = review[key]
//         payload.User = user
//         payload.ReviewImages = reviewImages
//         Reviews.push(payload)
//     }

//     res.status(200).json({Reviews: Reviews})
// })

//Delete a Review
router.delete('/:reviewId', restoreUser, async (req, res) => {
    let reviewToDelete = await Review.findByPk(req.params.reviewId)
    if(!reviewToDelete) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    if (req.user.id !== reviewToDelete.userId) {
        res.status(403).json({
            "message": "Unauthorized user cannot delete this review",
            "statusCode": 403
          })
    }
    await reviewToDelete.destroy()
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

//Edit a Review
router.put('/:reviewId', restoreUser, async (req, res) => {
    let reviewInstance = await Review.findByPk(req.params.reviewId)
    let {review, stars} = req.body
    let errors = {}
    if (!stars || stars < 1 || stars > 5) errors.stars = 'Stars must be an integer from 1 to 5'
    if (!review) errors.review = "Review text is required"
    if (errors.review || errors.stars) {
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            errors
        })
    }
    reviewInstance.set({review, stars})
    await reviewInstance.save()
    res.status(200).json(reviewInstance)
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', restoreUser, async (req, res) => {
    let review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.status(404).json(    {
            "title": "Couldn't find a Review with the specified id",
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    let existingReviewImages = await ReviewImage.findAll({
        where: {reviewId: review.id}
    })
    if (existingReviewImages.length > 9) {
        res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    }
    let newImage = ReviewImage.create({
        url: req.body.url,
        reviewId: review.id
    })
    let payload = {
        id: review.id,
        url: req.body.url
    }
    res.status(200).json(payload)
})

//Get all Reviews of the Current User
router.get('/current', restoreUser, async (req, res) => {

    let reviews = await Review.findAll({
        where: {userId: req.user.id}
    })
    let reviewAnswer = []
    for (let review of reviews) {
        let reviewPayload = {}
        let spot = await Spot.findOne({
            where: {id: review.spotId},
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        })
        let preview = await SpotImage.findOne({
            where: {spotId: spot.id},
            attributes: ['url']
        })
        let reviewImages = await ReviewImage.findAll({
            where: {reviewId: review.id},
            attributes: ['id', 'url']
        })
        for(let key in review.dataValues) reviewPayload[key] = review[key]
        // for (let key in spot.dataValues) reviewPayload.Spot[key] = spot[key]
        // Spot.previewImage = preview
        spot.set({previewImage: 'urlstring'})
        let {id, firstName, lastName} = req.user
        reviewPayload.User = {id, firstName, lastName}
        reviewPayload.Spot = spot
        reviewPayload.ReviewImages = reviewImages
        reviewAnswer.push(reviewPayload)
    }
    if (!reviews.length) {
        res.status(404).json({
            message: 'No reviews found',
            statusCode: 404
        })
    }
    res.status(200).json({Review: reviewAnswer})
})

router.use((err, _req, _res, next) => {
    const error = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

module.exports = router;
