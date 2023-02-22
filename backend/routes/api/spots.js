const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const spot = require('../../db/models/spot');
const user = require('../../db/models/user');

//post a spot
router.post('/', async (req, res, next) => {

    let newSpot = await Spot.create({
        id: user.id,
        ...req.body
    })
    res.status(200).json(newSpot)
})


//look up spot by id
router.get('/:id', async (req, res, next) => {

    let spot = await Spot.findByPk(req.params.id)
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
    let {page, size} = req.query, pagination = {};let where = {}

    size = !size || parseInt(size) <= 0 || parseInt(size) > 20 ? size = 20
    : parseInt(size)

    page = !page || parseInt(page) <= 0 ? page = 0
    : parseInt(page) > 10 ? 10
    : parseInt(page)

    if (page >=1 && size >= 1){
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    //accepting query parameters
    if (req.query.minPrice >= 0) {
        where.price = { [Op.gte]: req.query.minPrice }
    }
    if (req.query.maxPrice >= 0) {
        where.price = { [Op.lte]: req.query.maxPrice }
    }
    if (req.query.minLat) {
        where.lat = { [Op.gte]: req.query.minLat }
    }
    if (req.query.maxLat) {
        where.lat = { [Op.lte]: req.query.maxLat }
    }
    if (req.query.minLng) {
        where.lng = { [Op.gte]: req.query.maxPrice }
    }
    if (req.query.maxLng) {
        where.lng = { [Op.lte]: req.query.maxPrice }
    }
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
        let reviewTotal = spotsReviews.reduce((acc,next, ind, arr) => acc + next["stars"], 0)
        for (let key in spot.dataValues) payload[key] = spot[key]
        payload.avgRating = reviewTotal / spotsReviews.length
        payload.previewImage = previewImageData.url
        Spots.push(payload)
    }
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
