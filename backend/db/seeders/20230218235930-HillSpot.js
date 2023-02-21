'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Spots';
   return queryInterface.bulkInsert(options, [
    { ownerId: 2,
      address: '9138 Chatwood Dr',
      city: 'Arlen',
      state: 'Texas',
      country: 'USA',
      lat: 29.842853615148087,
      lng: -95.25500787046798,
      name: 'The Hill House',
      description: "Clean, homely property, with an amazing view and close to local attractions",
      price: 100.00,
    },
    { ownerId: 7,
      address: '9138 Chatwood Dr',
      city: 'Arch Cape',
      state: 'OR',
      country: 'USA',
      lat: 45.816622761488375,
      lng:  -123.96176846767008,
      name: 'The Getaway',
      description: "Beachside cabin safe from prying eyes, the perfect retreat.",
      price: 100.00,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['The Hill House', 'The Getaway',] }
    }, {});
  }
};
