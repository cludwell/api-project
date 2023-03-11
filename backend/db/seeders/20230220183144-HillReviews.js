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
      review: "Amazing piece of history, on site camping was available. Nature was absolutely stunning.",
      stars: 5
      },
      {spotId: 1,
      userId: 5,
      review: "Incredible place that felt like walking through history. Cant wait to return and continue to explore",
      stars: 4
      },
      {spotId: 2,
      userId: 6,
      review: "Beautiful historic location",
      stars: 4.5
      },
      {spotId: 2,
      userId: 6,
      review: "Good location, easy to find, great parking. Bed was very comfortable. Would stay again.",
      stars: 4
      },
      {spotId: 3,
      userId: 3,
      review: "We stayed for three nights and found the spot to be a calm and cozy space to recharge after running around doing touristy stuff. Owner even left a bottle of wine for us!",
      stars: 4
      },
      {spotId: 4,
      userId: 3,
      review: "The service here is great. Really appreciate the staff. Location is the best. Lounge, restaurant and bar are all awesome. It's a very old hotel in a busy area. So be prepared for noise and less modern surroundings. That said, the hotel is surprisingly comfortable and a cool place to stay.",
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
