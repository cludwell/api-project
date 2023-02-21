const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
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
router.get('/:id', async (req, res) => {
    let spot = await Spot.findByPk(req.params.id, {
        // include: [{model: SpotImage},
        //     {model: User}]
    })
    let spotImagesData = await SpotImage.findAll({
        where: {spotId: req.params.id}
    })
    let spotOwner = await User.findAll({
        where: {
            id: spot.ownerId
        }
    })
    // spot = JSON.stringify(spot)
    spot.SpotImages = spotImagesData
    spot.Owner = spotOwner
    res.status(200).json(spot)
})

//get a list of all spots
router.get('/', async (req, res, next) => {
    let {page, size} = req.query, pagination = {};

    let query = {
        where: {},
        // include:[],
        ...pagination
    }

    size = !size || parseInt(size) <= 0 ? size = 20
    : parseInt(size)

    page = !page || parseInt(page) <= 0 ? page = 1
    : parseInt(page)

    if (page >=1 && size >= 1){
      pagination.limit = size;
      pagination.offset = size * (page - 1)
    }

    let Spots = []
    const spotsData = await Spot.findAll()
    const payload = [];
    spotsData.forEach(spotEle => {
        let url = spotEle.getSpotImages({
            attributes: ['url']
        })

    });
// missing a way to lazy load the spotImage.url as previewImage
    const spotImageDate = await SpotImage.findAll({
    })


    res.status(200).json({Spots: spotsData})
})

module.exports = router;
