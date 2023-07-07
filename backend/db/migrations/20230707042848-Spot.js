'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

options.tableName = 'Spots'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'categories', {
      type: Sequelize.STRING(255),
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.removeColumn(options, 'categories')
  }
};
