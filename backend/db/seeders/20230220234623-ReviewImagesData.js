'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {reviewId: 1,
      url: 'authenticate-me/spotimages/spot1.webp',
      },
      {reviewId: 1,
      url: 'authenticate-me/spotimages/spot1-image2.webp',
      },
      {reviewId: 2,
      url: 'authenticate-me/spotimages/spot2.webp',
      },
      {reviewId: 2,
      url: 'authenticate-me/spotimages/spot2-image2.webp',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
      'authenticate-me/spotimages/spot1.webp',
      'authenticate-me/spotimages/spot1-image2.webp',
      'authenticate-me/spotimages/spot2.webp',
      'authenticate-me/spotimages/spot2-image2.webp'
    ]}
    }, {});
  }
};
