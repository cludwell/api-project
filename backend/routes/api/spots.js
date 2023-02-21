const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const spot = require('../../db/models/spot');

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
        // spotEle.previewImage = url
        Spots.push(url)
    });

    const spotImageDate = await SpotImage.findAll({
    })


    res.status(200).json({Spots})
})

module.exports = router;
