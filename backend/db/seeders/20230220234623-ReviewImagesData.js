'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {reviewId: 1,
      url: 'https://i.imgur.com/eDILaiO.jpg',
      },
      {reviewId: 2,
      url: 'https://i.imgur.com/ZPQUcxs.jpg',
      },
      {reviewId: 3,
      url: 'https://i.imgur.com/X7uaodG.jpg',
      },
      {reviewId: 4,
      url: 'https://i.imgur.com/IFI4m0H.jpg',
      },
      {reviewId: 5,
      url: 'https://i.imgur.com/5WwHYGC.jpg',
      },
      {reviewId: 6,
      url: 'https://i.imgur.com/AgGa6gS.jpg',
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
