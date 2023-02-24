'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA
/** @type {import('sequelize-cli').Migration} */

options.tableName = 'Users'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'firstName', {
      type: Sequelize.STRING(50),
      allowNull: false,
    })
    await queryInterface.addColumn(options, 'lastName', {
      type: Sequelize.STRING(50),
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.removeColumn(options, 'firstName')
    await queryInterface.removeColumn(options, 'lastName')
  }
};
