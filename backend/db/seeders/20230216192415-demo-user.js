'use strict';
const bcrypt = require('bcryptjs')
let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        // user 1
        email: 'bobby@user.io',
        username: 'thatsmypurse',
        firstName: 'Bobby',
        lastName: 'Hill',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        // user 2
        email: 'hank@user.io',
        username: 'PropaneHank',
        firstName: 'Hank',
        lastName: 'Hill',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        // user3
        email: 'peggy@user.io',
        username: 'PeggyEnEspanol',
        firstName: 'Peggy',
        lastName: 'Hill',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        // user4
        email: 'bill@user.io',
        username: 'InfiniteWalrus',
        firstName: 'Bill',
        lastName: 'Dauterive',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        // user5
        email: 'johnredcorn@user.io',
        username: 'RedCorn',
        firstName: 'John',
        lastName: 'Redcorn',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        // user6
        email: 'luanne@user.io',
        username: 'HairArtiste',
        firstName: 'Luanne',
        lastName: 'Platter',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        // user7
        email: 'bountyhunter@user.io',
        username: 'TruthOutThere',
        firstName: 'Dale',
        lastName: 'Gribble',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        // user8
        email: 'demo@user.io',
        username: 'demo',
        firstName: 'demo',
        lastName: 'user',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        // user9
        email: 'employer@user.io',
        username: 'employer',
        firstName: 'future',
        lastName: 'boss',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['thatsmypurse', 'PropaneHank', 'PeggyEnEspanol', 'InfiniteWalrus', 'RedCorn', 'HairArtiste', 'TruthOutThere',] }
    }, {});
  }
};
