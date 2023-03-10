const express = require('express')

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, Result } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {sequelize, Op} = require('sequelize');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {userId: req.user.id}
    })
    let bookingPayload = []
    for (let book of bookings) {
        let spot = await Spot.findOne({
            where: {id: book.spotId},
            attributes: {exclude: ['description', 'createdAt', 'updatedAt']}
        })
        let bookdata = {}, spotData = {}
        for (let key in book.dataValues) bookdata[key] = book[key]
        for (let key in spot.dataValues) spotData[key] = spot[key]

        let previewImageData = await SpotImage.findOne({
            where: {spotId: spot["id"]},
            attributes: ['url']
        })
        bookdata.Spot = spotData
        bookdata.Spot.previewImage = previewImageData ? previewImageData.url
        : 'No preview available'
        bookingPayload.push(bookdata)
    }
    if (!req.user.id || !bookings.length) {
        return res.status(404).json({
            "message": "The requested resource could not be found",
            "statusCode": 404
        })
    }
    res.status(200).json({Bookings: bookingPayload})
})

//Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    let {startDate, endDate} = req.body
    let bookingQuery = await Booking.findByPk(req.params.bookingId)
    let parsedStart = Date.parse(startDate), parsedEnd = Date.parse(endDate)
    if (!bookingQuery) {
        return res.status(404).json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
    }
    if (bookingQuery.userId !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    if (parsedEnd < new Date() || parsedStart < new Date()) {
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }
    let spot = await Spot.findOne({
        where: {id: bookingQuery.spotId}
    })
    if (parsedEnd <= parsedStart) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
          })
    }
    let bookings = await Booking.findAll({
        where: {spotId: spot.id, id: { [Op.ne]: req.params.bookingId}},
        attributes: ['startDate', 'endDate']
    })
    let  errors = {}
    let bookingsArray = bookings.map(ele => [Date.parse(ele.startDate), Date.parse(ele.endDate)])
        .sort((a,b) => a[0] - b[0])
    let startingConflicts = bookingsArray.filter(ele=> (ele[0] <= parsedStart && parsedStart <= ele[1]))
    let endingConflicts = bookingsArray.filter(ele=> (ele[0] <= parsedEnd && parsedEnd <= ele[1]))
    let fallsWithin = bookingsArray.filter(ele=> (parsedStart <= ele[0] && ele[1] <= parsedEnd))
    if (fallsWithin.length) {
        errors.startDate = "Start date conflicts with an existing booking"
        errors.endDate = "End date conflicts with an existing booking"
    }
    if (startingConflicts.length) {
        errors.startDate = "Start date conflicts with an existing booking"
    }
    if (endingConflicts.length) {
        errors.endDate = "End date conflicts with an existing booking"
    }


    if (startingConflicts.length || endingConflicts.length || fallsWithin.length ) {
        return res.status(403).json({
            "title": "Booking conflict",
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            errors
        })
    } else {
        let bookingEdit = bookingQuery.set({
            "startDate": startDate,
            "endDate": endDate
        })
        await bookingEdit.save()
        return res.status(200).json(bookingEdit)
    }
})

//Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        res.status(404).json({message: "Booking couldn't be found", statusCode: 404})
    }
    if (booking.userId !== req.user.id) {
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    } else if (Date.parse(booking.startDate) < new Date()) {
        res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    } else {
        await booking.destroy({where: {id: req.params.bookingId, userId: req.user.id}});
        res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
          });
    }
})

module.exports = router;
