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
router.get('/current', restoreUser, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {userId: req.user.id}
    })
    let bookingPayload = []
    for (let book of bookings) {
        let spot = await Spot.findOne({
            where: {id: book.spotId}
        })
        let bookdata = {}
        for (let key in book.dataValues) bookdata[key] = book[key]
        bookdata.Spot = spot
        bookingPayload.push(bookdata)
    }
    if (!req.user.id || !bookings.length) {
        res.status(404).json({
            "message": "The requested resource could not be found",
            "statusCode": 404
        })
    }
    res.status(200).json({Bookings: bookingPayload})
})

//Edit a Booking
router.put('/:bookingId', restoreUser, async (req, res) => {

})

//Delete a Booking
router.delete('/:bookingId', restoreUser, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        res.status(404).json({message: "Booking couldn't be found", statusCode: 404})
    }

    await booking.destroy({where: {id: req.params.bookingId}});
    res.status(200).json({message: 'Successfully Deleted', statusCode: 200});
})

router.use((err, _req, _res, next) => {

    err.title = "Resource Not Found";
    err.message = "Resource NotFound";
    err.statusCode = 404;
    err.status = 404
    next(err);
});

module.exports = router;
