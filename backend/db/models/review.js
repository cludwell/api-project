'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,})
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,})
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {model: 'Spots'},
      onDelete: 'CASCADE',
      hooks: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'},
        onDelete: 'CASCADE',
        hooks: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
        isNumeric: true,
        isDecimal: true
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
