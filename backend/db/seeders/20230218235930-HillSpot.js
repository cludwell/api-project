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
      description: "Tell you hwhat, we've got an air mattress",
      price: 100.00,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
