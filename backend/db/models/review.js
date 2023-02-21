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
        constraint: false})
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        constraint: false})
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {model: 'Spots'},
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'},
      onDelete: 'CASCADE'
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
