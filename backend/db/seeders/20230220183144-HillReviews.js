'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {spotId: 1,
      userId: 4,
      review: "Good location, easy to find, great parking. Bed was very comfortable. Would stay again.",
      stars: 5
      },
      {spotId: 1,
      userId: 5,
      review: "Furniture was extremely comfortable, and the place was very clean. My compliments to the previous airbnb users that stayed there. Amazing restaurants within walking distance.",
      stars: 4
      },
      {spotId: 1,
      userId: 6,
      review: "Hip and blossoming area, I loved the location and am lookig forward to visiting again.",
      stars: 4.5
      },
      {spotId: 1,
      userId: 7,
      review: "Good location, easy to find, great parking. Bed was very comfortable. Would stay again.",
      stars: 4
      },
      {spotId: 1,
      userId: 3,
      review: "We stayed for three nights and found the spot to be a calm and cozy space to recharge after running around doing touristy stuff. Owner even left a bottle of wine for us!",
      stars: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
