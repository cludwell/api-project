'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Spots';
   return queryInterface.bulkInsert(options, [
    { ownerId: 2,
      address: 'Bodie Rd & Bypass Rd',
      city: 'Bodie',
      state: 'CA',
      country: 'USA',
      lat: 38.212878919209814,
      lng: -119.0125814893744,
      name: 'Bodie California Ghost Town',
      description: `Bodie State Historic Park is a genuine California gold-mining ghost town. Visitors can walk down the deserted streets of a town that once had a population of nearly 10,000 people. The town is named for Waterman S. Body (William Bodey), who had discovered small amounts of gold in hills north of Mono Lake. In 1875, a mine cave-in revealed pay dirt, which led to purchase of the mine by the Standard Company in 1877. People flocked to Bodie and transformed it from a town of a few dozen to a boomtown.

      Only a small part of the town survives, preserved in a state of "arrested decay." Interiors remain as they were left and stocked with goods. Designated as a National Historic Site and a State Historic Park in 1962, the remains of Bodie are being preserved in a state of "arrested decay". Today this once thriving mining camp is visited by tourists, howling winds and an occasional ghost. Given it's history it's no surprise there's many reports of supernatural activity here`,
      price: 8.00,
    },
    { ownerId: 2,
      address: '9518 Cahaba Road',
      city: 'Orrville',
      state: 'AL',
      country: 'USA',
      lat: 32.31767431272856,
      lng: -87.10112190980753,
      name: 'Old Cahawba Archaeological Park & Ghost Town',
      description: `Cahawba was once Alabama's state capital (1819-1826) and a thriving antebellum river town. It became a ghost town shortly after the Civil War. Today it is an important archaeological site and a place of picturesque ruins.

      Nature has reclaimed much of Old Cahawba, but historians and archaeologists from the Alabama Historical Commission are working hard to uncover Cahawba's historic past and to create a full time interpretive park.Given it's history it's no surprise there's many reports of supernatural activity here`,
      price: 10.00,
    },
    { ownerId: 5,
      address: '75 Prospect Ave',
      city: 'Eureka Springs',
      state: 'AK',
      country: 'USA',
      lat: 36.40823147330142,
      lng:  -93.73744045736635,
      name: 'Crescent Hotel & Spa',
      description: `Perched high above the Victorian Village of Eureka Springs, Arkansas is the 1886 Crescent Hotel & Spa, a palatial structure and landmark hotel known widely in the Ozark Mountains as the "symbol of hospitality" for the State of Arkansas and brought to life year round. An Icon for Eureka Springs lodging, guests enjoy the resort activities, hot tub, swimming pool, New Moon Spa & Salon, Crystal Dining Room, SkyBar Gourmet Pizza, resort host and bellman service, and 15 acres of manicured gardens with hiking, biking, and walking trails that loop through the city and pass the city dog park, skate park, and city playground.`,
      price: 348.00,
    },
    { ownerId: 5,
      address: '100 N San Francisco St',
      city: 'Flagstaff',
      state: 'AZ',
      country: 'USA',
      lat: 35.19838108975732,
      lng:  -79.9293639978948,
      name: 'Hotel Monte Vista',
      description: `Guests staying at the Hotel Monte Vista are afforded the opportunity to explore all the wonders and beauty that Northern Arizona has to offer and come back to relax and enjoy the abundance of delicious food and fantastic entertainment and shopping right outside the doors of our historic community hotel.`,
      price: 115.00,
    },
    { ownerId: 6,
      address: '135 Church St',
      city: 'Charleston',
      state: 'SC',
      country: 'USA',
      lat: 32.77833854613232,
      lng:  -79.92951956441799,
      name: 'Dock St Theatre',
      description: `One of the oldest theaters in America, this site in downtown Charleston has racked up a lot of tumult and history over the years. After a fire burned down the original theater, the Planters Inn was built on the spot; it was converted back to a theater in the 1930s. The most flamboyant ghost here is Nettie Dickerson, who, legend has it, was struck by lightning while standing on the balcony of the hotel. Her shadow has been reported gliding along the second floor of the theater, dressed in a red gown. Also in otherworldly attendance: Junius Brutus Booth, a renowned 19th-century actor (and the father of Lincoln assassin John Wilkes) who used to frequent the inn. `,
      price: 44.00,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Bodie California Ghost Town', 'Old Cahawba Archaeological Park & Ghost Town', 'Crescent Hotel & Spa', 'Hotel Monte Vista',] }
    }, {});
  }
};
