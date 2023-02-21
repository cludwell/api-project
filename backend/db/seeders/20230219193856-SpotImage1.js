'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
options.tableName = 'SpotImages';
return queryInterface.bulkInsert(options, [
  {spotId: 1,
  url: 'authenticate-me/spotimages/spot1-review1.webp',
  preview: true
  },
  {spotId: 1,
  url: 'authenticate-me/spotimages/spot1-review2.webp',
  preview: true
  },
  {spotId: 2,
  url: 'authenticate-me/spotimages/spot2-review1.webp',
  preview: true
  },
  {spotId: 2,
  url: 'authenticate-me/spotimages/spot2-image2.webp',
  preview: true
  },
]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'authenticate-me/spotimages/spot1-review1.webp',
        'authenticate-me/spotimages/spot1-review2.webp',
        'authenticate-me/spotimages/spot2-review1.webp',
        'authenticate-me/spotimages/spot2-image2.webp',
    ]}
    }, {});
  }
};
