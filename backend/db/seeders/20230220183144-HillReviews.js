'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {spotId: 1,
      userId: 4,
      review: "Amazing piece of history, on site camping was available. Nature was absolutely stunning.",
      stars: 5
      },
      {spotId: 1,
      userId: 5,
      review: "Incredible place that felt like walking through history. Cant wait to return and continue to explore",
      stars: 4
      },
      {spotId: 2,
      userId: 6,
      review: "Beautiful historic location",
      stars: 4.5
      },
      {spotId: 2,
      userId: 6,
      review: "Good location, easy to find, great parking. Bed was very comfortable. Would stay again.",
      stars: 4
      },
      {spotId: 3,
      userId: 3,
      review: "We stayed for three nights and found the spot to be a calm and cozy space to recharge after running around doing touristy stuff. Owner even left a bottle of wine for us!",
      stars: 4
      },
      {spotId: 4,
      userId: 1,
      review: "The service here is great. Really appreciate the staff. Location is the best. Lounge, restaurant and bar are all awesome. It's a very old hotel in a busy area. So be prepared for noise and less modern surroundings. That said, the hotel is surprisingly comfortable and a cool place to stay.",
      stars: 4
      },
      {spotId: 5,
      userId: 8,
      review: "Ok, first let's talk about the good- the room and the hotel itself are STUNNING! The location couldn't be more perfect if you're looking to have everything in walking distance and the hotel restaurants are great options. Now, let's talk about the not so good. Valet Parking seemed to be the only option for parking and there wasn't a valet in sight when we arrived at check in time on a Saturday. Thank God for one of the front desk workers helping us get our stuff inside because it was POURING rain and we were soaked. We decided to have dinner at the hotel restaurant the night of our arrival, but unfortunately a wedding reception they were hosting started getting a little rowdy and we could hear them all the way in the back of the restaurant. The staff was great, but that didn't lend to a great dining experience. For the room, while it was beautiful, we paid extra for a balcony room and got a view of a parking lot. Not thrilled I paid extra for that and definitely don't recommend it. Overall, we would stay again for all the positive reasons, but we will make different decisions on which room we choose and where we dine next time!",
      stars: 4
      },
      {spotId: 5,
      userId: 7,
      review: "Great front desk service!  We were here for dinner and the little man (my 1yr old) was fidgety.  Went downstairs to get some chips, but the coffee shop was closed. The front desk pair, Shashank and Mia, went out of their way to make sure I got what I needed.  She even paid for the chips out​ of her own pocket!  Great service!",
      stars: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
