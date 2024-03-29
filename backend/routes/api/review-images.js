const express = require("express");
const { Review, ReviewImage } = require("../../db/models");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const { restoreUser } = require("../../utils/auth");

//Delete a Review Image
router.delete("/:imageId", restoreUser, async (req, res) => {
  let reviewImage = await ReviewImage.findByPk(req.params.imageId);
  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }
  let review = await Review.findOne({
    where: {
      id: reviewImage.reviewId,
    },
  });
  if (review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  if (!review) {
    return res.status(404).json({
      message: "Resource doesnt exist",
      statusCode: 404,
    });
  } else if (review.userId !== req.user.id) {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    await reviewImage.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
