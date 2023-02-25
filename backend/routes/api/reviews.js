const express = require('express')
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check, Result } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    let review = await Review.findByPk(req.params.reviewId)
    let existingReviewImages = await ReviewImage.findAll({
        where: {reviewId: review.id}
    })
    if (!review) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    } else if (existingReviewImages.length > 9) {
        res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    } else if (review.userId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    } else {
        let newImage = ReviewImage.create({
            url: req.body.url,
            reviewId: review.id
        })
        let payload = {
            id: review.id,
            url: req.body.url
        }
        res.status(200).json(payload)
    }
})

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    let reviewToDelete = await Review.findByPk(req.params.reviewId)
    if(!reviewToDelete) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    } else if (req.user.id !== reviewToDelete.userId) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    } else {
        await reviewToDelete.destroy()
        res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
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
    } else if (!reviewInstance) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    } else if (reviewInstance.userId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    } else {
        reviewInstance.set({review, stars})
        await reviewInstance.save()
        res.status(200).json(reviewInstance)
    }
})

//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {

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
        let spotPOJO = {}
        for (let key in spot.dataValues) spotPOJO[key] = spot[key]
        spotPOJO.previewImage = preview ? JSON.stringify(preview.url).split('"')[1]
        : 'No preview available'
        let {id, firstName, lastName} = req.user
        reviewPayload.User = {id, firstName, lastName}
        reviewPayload.Spot = spotPOJO
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


module.exports = router;
