'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {spotId: 1,
      userId: 4,
      startDate: '2023-11-17 20:00:00',
      endDate: '2023-11-19 12:00:00',
      },
      {spotId: 1,
      userId: 5,
      startDate: '2023-10-17 20:00:00',
      endDate: '2023-10-19 12:00:00',
      },
      {spotId: 1,
      userId: 6,
      startDate: '2023-12-17 20:00:00',
      endDate: '2023-12-19 12:00:00',
      },
      {spotId: 1,
      userId: 3,
      startDate: '2023-11-10 20:00:00',
      endDate: '2023-11-12 12:00:00',
      },
      {spotId: 1,
      userId: 7,
      startDate: '2023-11-03 20:00:00',
      endDate: '2023-11-05 12:00:00',
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
