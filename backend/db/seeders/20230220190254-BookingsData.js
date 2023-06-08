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
      cost: 38
      },
      {spotId: 1,
      userId: 5,
      startDate: '2023-10-17 20:00:00',
      endDate: '2023-10-19 12:00:00',
      cost: 38
      },
      {spotId: 1,
      userId: 6,
      startDate: '2023-12-17 20:00:00',
      endDate: '2023-12-19 12:00:00',
      cost: 38
      },
      {spotId: 1,
      userId: 3,
      startDate: '2023-11-10 20:00:00',
      endDate: '2023-11-12 12:00:00',
      cost: 38
      },
      {spotId: 1,
      userId: 7,
      startDate: '2023-11-03 20:00:00',
      endDate: '2023-11-05 12:00:00',
      cost: 38
      },
      // bookings so employers see calendar blocked off
      // demouser
      {spotId: 1,
      userId: 8,
      startDate: '2023-06-25 20:00:00',
      endDate: '2023-06-30 12:00:00',
      cost: 64
      },
      {spotId: 2,
      userId: 8,
      startDate: '2023-06-20 20:00:00',
      endDate: '2023-06-25 12:00:00',
      cost: 81
      },
      {spotId: 7,
      userId: 8,
      startDate: '2023-06-15 20:00:00',
      endDate: '2023-06-20 12:00:00',
      cost: 757
      },
      //user who isnt demo
      {spotId: 3,
      userId: 9,
      startDate: '2023-06-20 20:00:00',
      endDate: '2023-06-22 12:00:00',
      cost: 70
      },
      {spotId: 4,
      userId: 9,
      startDate: '2023-06-22 20:00:00',
      endDate: '2023-06-24 12:00:00',
      cost: 273
      },
      {spotId: 5,
      userId: 9,
      startDate: '2023-06-24 20:00:00',
      endDate: '2023-06-26 12:00:00',
      cost: 120
      },
      {spotId: 6,
      userId: 9,
      startDate: '2023-06-26 20:00:00',
      endDate: '2023-06-28 12:00:00',
      cost: 349
      },
      // bookings so employers see calendar blocked off
      {spotId: 1,
        userId: 1,
        startDate: '2023-07-25 20:00:00',
        endDate: '2023-07-30 12:00:00',
        cost: 64
        },
        {spotId: 2,
        userId: 1,
        startDate: '2023-07-20 20:00:00',
        endDate: '2023-07-25 12:00:00',
        cost: 81
        },
        {spotId: 7,
          userId: 1,
          startDate: '2023-07-15 20:00:00',
          endDate: '2023-07-20 12:00:00',
          cost: 757
          },
      //user who isnt demo
      {spotId: 3,
      userId: 9,
      startDate: '2023-07-20 20:00:00',
      endDate: '2023-07-22 12:00:00',
      cost: 70
      },
      {spotId: 4,
      userId: 9,
      startDate: '2023-07-22 20:00:00',
      endDate: '2023-07-24 12:00:00',
      cost: 273
      },
      {spotId: 5,
      userId: 9,
      startDate: '2023-07-24 20:00:00',
      endDate: '2023-07-26 12:00:00',
      cost: 120
      },
      {spotId: 6,
      userId: 9,
      startDate: '2023-07-26 20:00:00',
      endDate: '2023-07-28 12:00:00',
      cost: 349
      },
      // bookings so employers see calendar blocked off
      {spotId: 1,
        userId: 1,
        startDate: '2023-08-25 20:00:00',
        endDate: '2023-08-30 12:00:00',
        cost: 64
        },
        {spotId: 2,
        userId: 1,
        startDate: '2023-08-20 20:00:00',
        endDate: '2023-08-25 12:00:00',
        cost: 81
        },
        {spotId: 7,
          userId: 1,
          startDate: '2023-08-15 20:00:00',
          endDate: '2023-08-20 12:00:00',
          cost: 757
          },
      //user who isnt demo
      {spotId: 3,
      userId: 9,
      startDate: '2023-08-20 20:00:00',
      endDate: '2023-08-22 12:00:00',
      cost: 70
      },
      {spotId: 4,
      userId: 9,
      startDate: '2023-08-22 20:00:00',
      endDate: '2023-08-24 12:00:00',
      cost: 273
      },
      {spotId: 5,
      userId: 9,
      startDate: '2023-08-24 20:00:00',
      endDate: '2023-08-26 12:00:00',
      cost: 120
      },
      {spotId: 6,
      userId: 9,
      startDate: '2023-08-26 20:00:00',
      endDate: '2023-08-28 12:00:00',
      cost: 349
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
