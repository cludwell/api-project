const express = require("express");
const { Spot, SpotImage, Booking, User } = require("../../db/models");
const router = express.Router();
const { Op } = require("sequelize");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const { requireAuth } = require("../../utils/auth");

//Get all of the Current User's Bookings
router.get("/current", async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
  });
  const bookingPayload = [];
  for (const book of bookings) {
    const spot = await Spot.findOne({
      where: { id: book.spotId },
      attributes: { exclude: ["description", "createdAt", "updatedAt"] },
    });
    const bookdata = {},
      spotData = {};
    for (let key in book.dataValues) bookdata[key] = book[key];
    for (let key in spot.dataValues) spotData[key] = spot[key];

    const previewImageData = await SpotImage.findAll({
      where: { spotId: spot["id"] },
      attributes: ["url"],
    });
    const owner = await User.findOne({
      where: { id: spot.ownerId },
    });
    bookdata.Spot = spotData;
    bookdata.Spot.previewImage = previewImageData
      ? previewImageData[0].url
      : "No preview available";
    bookdata.SpotImages = previewImageData;
    bookdata.Owner = owner;
    bookingPayload.push(bookdata);
  }
  if (!req.user.id) {
    return res.status(404).json({
      message: "The requested resource could not be found",
      statusCode: 404,
    });
  }

  return res.json({ Bookings: bookingPayload });
});

//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const bookingQuery = await Booking.findByPk(req.params.bookingId);
  const parsedStart = Date.parse(startDate),
    parsedEnd = Date.parse(endDate);
  if (!bookingQuery) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  if (bookingQuery.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  if (parsedEnd < new Date() || parsedStart < new Date()) {
    return res.status(403).json({
      message: "Past bookings can't be modified",
      statusCode: 403,
    });
  }
  const spot = await Spot.findOne({
    where: { id: bookingQuery.spotId },
  });
  if (parsedEnd <= parsedStart) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  const bookings = await Booking.findAll({
    where: { spotId: spot.id, id: { [Op.ne]: req.params.bookingId } },
    attributes: ["startDate", "endDate"],
  });
  const errors = {};

  bookings.forEach((ele) => {
    // start date conflicts
    if (ele[0] <= parsedStart && parsedStart <= ele[1]) {
      errors.startDate = "Start date conflicts with an existing booking";
    }
    // end date conflicts
    if (ele[0] <= parsedEnd && parsedEnd <= ele[1]) {
      errors.endDate = "End date conflicts with an existing booking";
    }
    // falls within another booking's dates conflicts
    if (parsedStart <= ele[0] && ele[1] <= parsedEnd) {
      errors.startDate = "Start date conflicts with an existing booking";
      errors.endDate = "End date conflicts with an existing booking";
    }
  });

  if (Object.values(errors).length) {
    return res.status(403).json({
      title: "Booking conflict",
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors,
    });
  } else {
    let bookingEdit = bookingQuery.set({
      startDate: startDate,
      endDate: endDate,
    });
    await bookingEdit.save();
    return res.status(200).json(bookingEdit);
  }
});

//Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  let booking = await Booking.findByPk(req.params.bookingId);
  if (!booking) {
    res
      .status(404)
      .json({ message: "Booking couldn't be found", statusCode: 404 });
  }
  if (booking.userId !== req.user.id) {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else if (Date.parse(booking.startDate) < new Date()) {
    res.status(403).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  } else {
    await booking.destroy({
      where: { id: req.params.bookingId, userId: req.user.id },
    });
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
