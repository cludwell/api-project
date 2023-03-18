'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
options.tableName = 'SpotImages';
return queryInterface.bulkInsert(options, [
  {spotId: 1,
  url: 'https://i.imgur.com/w1iSd6f.jpg',
  preview: true
  },
  {spotId: 1,
  url: 'https://i.imgur.com/0F8IWOa.jpg',
  preview: true
  },
  {spotId: 1,
  url: 'https://i.imgur.com/XSoxchI.jpg',
  preview: true
  },
  {spotId: 1,
  url: 'https://i.imgur.com/1KGnM7X.jpg',
  preview: true
  },
  {spotId: 1,
  url: 'https://i.imgur.com/lEjFir5.jpg',
  preview: true
  },
  {spotId: 2,
  url: 'https://i.imgur.com/yqrH7eO.jpg',
  preview: true
  },
  {spotId: 2,
  url: 'https://i.imgur.com/6yeA9kQ.jpg',
  preview: true
  },
  {spotId: 2,
  url: 'https://i.imgur.com/55E4WqI.jpg',
  preview: true
  },
  {spotId: 2,
  url: 'https://i.imgur.com/fQvMRGd.jpg',
  preview: true
  },
  {spotId: 3,
  url: 'https://i.imgur.com/9WH4MYQ.jpg',
  preview: true
  },
  {spotId: 3,
  url: 'https://i.imgur.com/mw7gBfm.jpg',
  preview: true
  },
  {spotId: 3,
  url: 'https://i.imgur.com/rFILXlK.jpg',
  preview: true
  },
  {spotId: 3,
  url: 'https://i.imgur.com/OGAH0v4.jpg',
  preview: true
  },
  {spotId: 4,
  url: 'https://i.imgur.com/dWpZnPx.jpg',
  preview: true
  },
  {spotId: 4,
  url: 'https://i.imgur.com/sU4i9fF.jpg',
  preview: true
  },
  {spotId: 4,
  url: 'https://i.imgur.com/hlC2faH.jpg',
  preview: true
  },
  {spotId: 4,
  url: 'https://i.imgur.com/TsKe4Gk.jpg',
  preview: true
  },
  {spotId: 4,
  url: 'https://i.imgur.com/SlV6orF.jpg',
  preview: true
  },
  {spotId: 5,
  url: 'https://i.imgur.com/rShVoE4.jpg',
  preview: true
  },
  {spotId: 5,
  url: 'https://i.imgur.com/agLWxG4.jpg',
  preview: true
  },
  {spotId: 5,
  url: 'https://i.imgur.com/aEcjBTb.jpg',
  preview: true
  },
  {spotId: 5,
  url: 'https://i.imgur.com/OkO5Sh2.jpg',
  preview: true
  },
  {spotId: 6,
  url: 'https://i.imgur.com/vlZXLmP.jpg',
  preview: true
  },
  {spotId: 6,
  url: 'https://i.imgur.com/robWL1T.jpg',
  preview: true
  },
  {spotId: 6,
  url: 'https://i.imgur.com/6e80evr.jpg',
  preview: true
  },
  {spotId: 6,
  url: 'https://i.imgur.com/Fu4Kt5t.jpg',
  preview: true
  },
  {spotId: 6,
  url: 'https://i.imgur.com/nSsh0Bq.jpg',
  preview: true
  },
]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://i.imgur.com/w1iSd6f.jpg',
        'https://i.imgur.com/0F8IWOa.jpg',
        'https://i.imgur.com/XSoxchI.jpg',
        'https://i.imgur.com/1KGnM7X.jpg',
        'https://i.imgur.com/lEjFir5.jpg',
        'https://i.imgur.com/yqrH7eO.jpg',
        'https://i.imgur.com/6yeA9kQ.jpg',
        'https://i.imgur.com/55E4WqI.jpg',
        'https://i.imgur.com/fQvMRGd.jpg',
        'https://i.imgur.com/9WH4MYQ.jpg',
        'https://i.imgur.com/mw7gBfm.jpg',
        'https://i.imgur.com/rFILXlK.jpg',
        'https://i.imgur.com/OGAH0v4.jpg',
        'https://i.imgur.com/dWpZnPx.jpg',
        'https://i.imgur.com/sU4i9fF.jpg',
        'https://i.imgur.com/hlC2faH.jpg',
        'https://i.imgur.com/TsKe4Gk.jpg',
        'https://i.imgur.com/SlV6orF.jpg',
        'https://i.imgur.com/rShVoE4.jpg',
        'https://i.imgur.com/agLWxG4.jpg',
        'https://i.imgur.com/aEcjBTb.jpg',
        'https://i.imgur.com/OkO5Sh2.jpg',
        'https://i.imgur.com/vlZXLmP.jpg',
        'https://i.imgur.com/robWL1T.jpg',
        'https://i.imgur.com/6e80evr.jpg',
        'https://i.imgur.com/Fu4Kt5t.jpg',
        'https://i.imgur.com/nSsh0Bq.jpg',
    ]}
    }, {});
  }
};
