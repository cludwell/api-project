const express = require('express')

const { User, Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

// router.use(
//     // configs the app to use the cookies
//   csrf({
//     cookie: true
//   })
// );

// router.use((req, res, next)=> {
//     res.cookie('XSRF-TOKEN', req.csrfToken())
// })

// router.use([setTokenCookie, restoreUser])

//get all spots of the current user
router.get('current', [restoreUser, requireAuth], async (req, res) => {
    let mySpots = await Spot.findAll({
        where: {ownerId: req.user.id}
    })
    let Spots = []
    for (let spot of mySpots) {
    let spotReviews = await Review.findAll({
        where: {spotId: spot["id"]}
    })
    let previewImageData = await SpotImage.findOne({
        where: {spotId: spot["id"]}
    })
    let payload = {}
    let reviewTotal = spotReviews.reduce((acc,next) => acc + next["stars"], 0)
    for (let key in spot.dataValues) payload[key] = spot[key]
    payload.numReviews = spotReviews.length
    payload.avgStarRating = reviewTotal / spotReviews.length
    payload.SpotImages = spotImagesData

    }
    res.status(200).json({Spots: Spots})
})

//post a spot
router.post('/', [restoreUser, requireAuth], async (req, res, next) => {
    if (!req.user) res.status(400).json({message: 'Please sign in to post a spot'})
    const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body

    const errors = []
    if (!address) errors.push("Street address is required")
    if (!city) errors.push('City is required')
    if (!state) errors.push('State is required')
    if (!country) errors.push('Country is required')
    if (!lat) errors.push('Latitude is not valid')
    if (!lng) errors.push('Longitude is not valid')
    if (!name || name.length > 50) errors.push('Name must be less than 50 characters')
    if (!description) errors.push('Description is required')
    if (!price) errors.push('Price per day is required')

    if (errors.length > 0) res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        errors
    })

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
})


//look up spot by id
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

//get a list of all spots
router.get('/', async (req, res, next) => {
    let {page, size, minPrice, maxPrice, minLat, maxLat, minLng, maxLng} = req.query
    let where = {}, errors = [], pagination = {}

    size = !size || parseInt(size) > 20 ? size = 20
    : parseInt(size)

    page = !page ? page = 0
    : parseInt(page) > 10 ? 10
    : parseInt(page)

    if (size < 0) errors.push("Size must be greater than or equal to 0",)
    if(page < 0) errors.push("Page must be greater than or equal to 0",)
    if (page >=1 && size >= 1){
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    //accepting query parameters
    if (minPrice >= 0) where.price = { [Op.gte]: minPrice }
    if (minPrice < 0) errors.push("Minimum price must be greater than or equal to 0")

    if (maxPrice >= 0) where.price = { [Op.lte]: maxPrice }
    if (maxPrice < 0) errors.push("Maximum price must be greater than or equal to 0")

    if (minLat <= 180 || minLat >= 180 ) where.lat = { [Op.gte]: minLat }
    if (minLat > 180 || minLat < -180 || maxLat <= minLat) errors.push("Minimum latitude is invalid")

    if (maxLat <= 180 || maxLat >= -180) where.lat = { [Op.lte]: maxLat }
    if (maxLat > 180 || maxLat < -180 || maxLat <= minLat) errors.push("Maximum latitude is invalid")

    if (minLng <= 180 || minLng >= -180) where.lng = { [Op.gte]: maxPrice }
    if (minLng > 180 || minLng < -180 || minLng >= maxLng) errors.push("Minimum longitude is invalid")

    if (maxLng <= 180 || maxLng <= -180) where.lng = { [Op.lte]: maxPrice }
    if (maxLng > 180 || maxLng < -180 || maxLng <= minLng) errors.push("Minimum longitude is invalid")


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
            where: {spotId: spot["id"]}
        })
        let payload = {}
        let reviewTotal = spotsReviews.reduce((acc,next) => acc + next["stars"], 0)
        for (let key in spot.dataValues) payload[key] = spot[key]
        payload.avgRating = reviewTotal / spotsReviews.length
        payload.previewImage = previewImageData.url
        Spots.push(payload)
    }

    if (errors.length > 0) res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        errors
    })
    res.status(200).json({Spots: Spots, page: page + 1, size})
})

router.use((err, _req, _res, next) => {
    const error = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

module.exports = router;
