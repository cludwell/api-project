const express = require('express')
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req,res) => {
    let spotQuery= await Spot.findByPk(req.params.spotId)
    if (!spotQuery || !req.params.spotId) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id === spotQuery.ownerId) {
        let bookings = await Booking.findAll({
            where: {spotId: spotQuery.id}
        })
        let bookingPayload = [];
        for (let book of bookings) {
            let bookedUser = await User.findByPk(book.userId)
            let bookData = {}
            bookData.User = bookedUser
            for (let key in book.dataValues) bookData[key] = book[key]
            bookingPayload.push(bookData)
        }
        res.status(200).json({Bookings: bookingPayload})
    } else if (req.user.id !== spotQuery.ownerId) {
        let bookings = await Booking.findAll({
            where: {spotId: spotQuery.id},
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.status(200).json({Bookings: bookings})
    }
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    let {startDate, endDate} = req.body
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    let parsedStart = Date.parse(startDate), parsedEnd = Date.parse(endDate)
    if (parsedEnd <= parsedStart) {
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
    }
    let bookings = await Booking.findAll({
        where: {spotId: spot.id},
        attributes: ['startDate', 'endDate']
    })

    let errors = {}
    let bookingsArray = bookings.map(ele => [Date.parse(ele.startDate), Date.parse(ele.endDate)])
        .sort((a,b) => a[0] - b[0])

    let startingConflicts = bookingsArray.filter(ele=> (ele[0] <= parsedStart && parsedStart <= ele[1]))
    let endingConflicts = bookingsArray.filter(ele=> (ele[0] <= parsedEnd && parsedEnd <= ele[1]))

    if (startingConflicts.length) {
        errors.startDate = "Start date conflicts with an existing booking"
    }
    if (endingConflicts.length) {
        errors.endDate = "End date conflicts with an existing booking"
    }
    if (startingConflicts.length || endingConflicts.length) {
        res.status(403).json({
            "title": "Booking conflict",
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            errors
        })
    } else {
        let newBooking = await Booking.create({
            startDate,
            endDate,
            userId: req.user.id,
            spotId: spot.id
        })
        res.status(200).json(newBooking)
    }
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    let {stars, review} = req.body, errors = {}

    if (!spot) res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    if (!stars || stars < 0 || stars > 5) errors.stars ="Stars must be an integer from 1 to 5"
    if (!review) errors.review = "Review text is required"
    if (Object.keys(errors).length) {
        res.status(400).json(    {
            "message": "Validation error",
            "statusCode": 400,
             errors
          })
    }
    let userReviewed = await Review.findOne({
        where: {userId: req.user.id, spotId: spot.id}
    })
    if(userReviewed) {
        res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
          })
    } else {
        let spotReview = Review.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            review,
            stars
        })
        let reviews = await Review.findAll()
        res.json({
            "id": reviews.length,
            "userId": req.user.id,
            "spotId": req.params.spotId,
            "review": review,
            "stars": stars,
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString()
        })
    }
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    let spotReviews = await Review.findAll({
        where: {spotId: req.params.spotId}
    })
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    let spotReviewPayload = []
    for (let review of spotReviews) {
        let reviewPayload = {}
        let userId = review.userId
        let user = await User.findOne({
            where: {id: review.userId},
            attributes: ['id', 'firstName', 'lastName']
        })
        let reviewImages = await ReviewImage.findAll({
            where: {reviewId: review["id"]},
            attributes: ['id', 'url']
        })
        for (let key in review.dataValues) reviewPayload[key] = review[key]
        reviewPayload.User = user
        reviewPayload.ReviewImages = reviewImages
        spotReviewPayload.push(reviewPayload)
    }
    res.status(200).json(spotReviewPayload)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId)
    let {url, preview} = req.body
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404,
        })
    }
    if (spot.ownerId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    let spotImage = await SpotImage.create({
        spotId: req.params.spotId, url, preview
    })

    let payload = {
        id: spotImage.id,
        url: url,
        preview: preview
    }
    res.status(200).json(payload)
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    let mySpots = await Spot.findAll({
        where: {ownerId: req.user.id}
    })
    let Spots = []

    for (let spot of mySpots) {
        let spotReviews = await Review.findAll({
            where: {spotId: spot["id"]}
        })
        let previewImageData = await SpotImage.findOne({
            where: {spotId: spot["id"]},
            attributes: ['url']
        })
        let payload = {}, url = {}
        // for (let key in previewImageData) url[key] = previewImageData[key]
        for (let key in spot.dataValues) payload[key] = spot[key]
        let reviewTotal = spotReviews.reduce((acc,next) => acc + next["stars"], 0)
        payload.avgRating = reviewTotal / spotReviews.length
        payload.previewImage = previewImageData ? JSON.stringify(previewImageData.url).split('"')[1]
        : 'No preview available'
        Spots.push(payload)
    }
    res.status(200).json({Spots: Spots})
})

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)
    let {address, city, state, country, lat, lng, name, description, price} = req.body
    let errors = {}

    if (!spot) {
        res.status(404).json({message: "Spot cannot be found", statusCode: 404})
    }
    if (spot.ownerId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    if (!address) errors.address ='Street address is required'
    if (!city) errors.city = 'City is required'
    if (!state) errors.state = 'State is required'
    if (!country) errors.country = 'Country is required'
    if (!lat) errors.lat = 'Latitude is not valid'
    if (!lng) errors.lng = 'Longitude is not valid'
    if (!name) errors.name ='Name must be less than 50 characters'
    if (!description) errors.description = 'Description is required'
    if (!price) errors.price = 'Price per day is required'
    console.log(Object.keys(errors))

    if (Object.keys(errors).length) {
        res.status(404).json({
            "message": "Body Validation Error",
            "statusCode": 404,
            errors
        })
    }

    spot.set({address, city, state, country, lat, lng, name, description, price})

    await spot.save()
    res.status(200).json(spot)
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }
    if (spot.ownerId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    await spot.destroy({where: {id: req.params.spotId}});
    res.status(200).json({message: 'Successfully deleted', statusCode: 200});
})

//Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
    if (!req.user) res.status(400).json({message: 'Please sign in to post a spot'})
    const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body

    const errors = {}
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = 'City is required';
    if (!state) errors.state = 'State is required';
    if (!country) errors.country = 'Country is required';
    if (!lat) errors.lat = 'Latitude is not valid';
    if (!lng) errors.lng = 'Longitude is not valid';
    if (!name || name.length > 50) errors.name = 'Name must be less than 50 characters';
    if (!description) errors.description = 'Description is required';
    if (!price) errors.price = 'Price per day is required';

    if (Object.keys(errors).length > 0){
        res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            errors
        })
    } else {
        let newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.status(201).json(newSpot)
    }
})

//Get details of a Spot from an id
router.get('/:id', async (req, res, next) => {

    let spot = await Spot.findByPk(req.params.id)
    if (!spot) res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    })
    let spotImagesData = await SpotImage.findAll({
        where: {spotId: req.params.id},
        attributes: ['id', 'url', 'preview']
    })
    let spotOwner = await User.findOne({
        where: {id: spot.ownerId},
        attributes: ['id', 'firstName', 'lastName']
    })
    let spotReviews = await Review.findAll({
        where: {spotId: req.params.id},
    })
    let payload = {}
    let reviewTotal = spotReviews.reduce((acc,next, ind, arr) => acc + next["stars"], 0)
    for (let key in spot.dataValues) payload[key] = spot[key]
    payload.numReviews = spotReviews.length
    payload.avgStarRating = reviewTotal / spotReviews.length
    payload.SpotImages = spotImagesData
    payload.Owner = spotOwner

    res.status(200).json(payload)
})

//Get all Spots
router.get('/', async (req, res, next) => {
    let {page, size, minPrice, maxPrice, minLat, maxLat, minLng, maxLng} = req.query
    let where = {}, errors = {}, pagination = {}

    size = !size || parseInt(size) > 20 ? size = 20
    : parseInt(size)

    page = !page ? page = 0
    : parseInt(page) > 10 ? 10
    : parseInt(page)

    if (size < 0) errors.size = "Size must be greater than or equal to 0"
    if(page < 0) errors.page = "Page must be greater than or equal to 0"
    if (page >=1 && size >= 1){
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    //accepting query parameters
    if (minPrice >= 0) where.price = { [Op.gte]: minPrice }
    if (minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0"

    if (maxPrice >= 0) where.price = { [Op.lte]: maxPrice }
    if (maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0"

    if (minLat <= 90 || minLat >= 90 ) where.lat = { [Op.gte]: minLat }
    if (minLat > 90 || minLat < -90 || maxLat <= minLat) errors.minLat = "Minimum latitude is invalid"

    if (maxLat <= 90|| maxLat >= -90) where.lat = { [Op.lte]: maxLat }
    if (maxLat > 90 || maxLat < -90 || maxLat <= minLat) errors.maxLat = "Maximum latitude is invalid"

    if (minLng <= 180 || minLng >= -180) where.lng = { [Op.gte]: maxPrice }
    if (minLng > 180 || minLng < -180 || minLng >= maxLng) errors.minLng = "Minimum longitude is invalid"

    if (maxLng <= 180 || maxLng <= -180) where.lng = { [Op.lte]: maxPrice }
    if (maxLng > 180 || maxLng < -180 || maxLng <= minLng) errors.maxLng = "Minimum longitude is invalid"

    let Spots = []
    const spotsData = await Spot.findAll( {
        where,
        ...pagination
    })

    //lazy loading associated model data
    for (let spot of spotsData) {
        let spotsReviews = await Review.findAll({
            where: {spotId: spot["id"]}
        })
        let previewImageData = await SpotImage.findOne({
            where: {spotId: spot["id"], preview: true},
            attributes: ['url']
        })
        let payload = {}
        let reviewTotal = spotsReviews.reduce((acc,next) => acc + next["stars"], 0)
        for (let key in spot.dataValues) payload[key] = spot[key]
        payload.avgRating = reviewTotal / spotsReviews.length
        payload.previewImage = previewImageData ? JSON.stringify(previewImageData.url).split('"')[1]
        : 'No preview available'
        Spots.push(payload)
    }

    if (Object.keys(errors).length > 0) res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        errors
    })
    //
    res.status(200).json({Spots: Spots, page: page + 1, size})
})


module.exports = router;
