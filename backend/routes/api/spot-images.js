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

//Delete a Spot Image
router.delete('/:imageId', restoreUser, async (req, res) => {
    let spotimage = await SpotImage.findByPk(req.params.imageId)
    if (!spotimage) {
      return res.status(404).json({
        "message": "Spot Image couldn't be found",
        "statusCode": 404
      })
    }
    let spotTiedToImage = await Spot.findOne({where : {id: spotimage.spotId, ownerId: req.user.id}})
    if (!spotTiedToImage) {
        return res.status(403).json({
          "message": "Forbidden",
          "statusCode": 403
        })
    } else {
        await spotimage.destroy()
        res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

module.exports = router;
