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

      Only a small part of the town survives, preserved in a state of "arrested decay." Interiors remain as they were left and stocked with goods. Designated as a National Historic Site and a State Historic Park in 1962, the remains of Bodie are being preserved in a state of "arrested decay". Today this once thriving mining camp is visited by tourists, howling winds and an occasional ghost. Given it's history it's no surprise there's many reports of supernatural activity here. There are stories of ghost sightings and music playing in the long shuttered bars of the town`,
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
      description: `Cahawba was once Alabama's state capital (1819-1826) and a thriving antebellum river town. It became a ghost town shortly after the Civil War. Today it is an important archaeological site and a place of picturesque ruins. The eerie empty buildings and cemeteries are popular destinations for ghost tours.

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
      description: `Perched high above the Victorian Village of Eureka Springs, Arkansas is the 1886 Crescent Hotel & Spa, a palatial structure and landmark hotel known widely in the Ozark Mountains as the "symbol of hospitality" for the State of Arkansas and brought to life year round. An Icon for Eureka Springs lodging, guests enjoy the resort activities, hot tub, swimming pool, New Moon Spa & Salon, Crystal Dining Room, SkyBar Gourmet Pizza, resort host and bellman service, and 15 acres of manicured gardens with hiking, biking, and walking trails that loop through the city and pass the city dog park, skate park, and city playground. The now-operating Crescent Hotel is said to be haunted by at least eight ghosts, ranging from a five-year-old girl to a bearded man wearing Victorian clothing.`,
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
      description: `Guests staying at the Hotel Monte Vista are afforded the opportunity to explore all the wonders and beauty that Northern Arizona has to offer and come back to relax and enjoy the abundance of delicious food and fantastic entertainment and shopping right outside the doors of our historic community hotel.

      Flagstaff's Hotel Monte Vista has its fair share of paranormal guests who have truly overstayed their welcome, including a long-term boarder who had a habit of hanging raw meat from the chandelier in Room 210; and two women who were thrown from the third floor and now attempt to asphyxiate male guests in their sleep. There's also reportedly an infant whose disturbing cries have sent staff members running upstairs from the basement. (Actor John Wayne even once had a paranormal encounter here.)`,
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
      description: `One of the oldest theaters in America, this site in downtown Charleston has racked up a lot of tumult and history over the years. After a fire burned down the original theater, the Planters Inn was built on the spot; it was converted back to a theater in the 1930s. The most flamboyant ghost here is Nettie Dickerson, who, legend has it, was struck by lightning while standing on the balcony of the hotel. Her shadow has been reported gliding along the second floor of the theater, dressed in a red gown. Also in otherworldly attendance: Junius Brutus Booth, a renowned 19th-century actor (and the father of Lincoln assassin John Wilkes) who used to frequent the inn.`,
      price: 44.00,
    },
    { ownerId: 6,
      address: '401 Baltimore St',
      city: 'Gettysburg',
      state: 'PA',
      country: 'USA',
      lat: 39.8261086812285,
      lng:  -77.23151869204263,
      name: 'Farnsworth House',
      description: `The famous Civil War battle at Gettysburg was one of the bloodiest in its four-year history. Farnsworth House, named for Brigadier General Elon J. Farnsworth, was home to Confederate sharpshooters during the conflict and acquired at least 100 bullet holes as a result.
      It later operated as a makeshift hospital, and currently functions as a 10-room bed and breakfast. Fourteen ghosts are rumored to haunt the premises, including a midwife called Mary who likes to comfort guests by sitting on their beds.`,
      price: 145.00,
    },
    { ownerId: 3,
      address: '525 S Winchester Blvd',
      city: 'San Jose',
      state: 'CA',
      country: 'USA',
      lat: 37.31851096053106,
      lng: -121.95099545739906,
      name: 'Winchester House',
      description: `It's as if original owner Sarah Winchester wanted her home to be haunted. The eccentric widow of William Winchester, founder of Winchester rifles, held nightly seances to gain guidance from spirits and her dead husband for the home's design. The end result? A maze-like structure that took 38 years to build and includes twisting and turning hallways, dead ends, secret panels, a window built into a floor, staircases leading to nowhere, doors that open to walls, upside-down columns and rooms built, then intentionally closed off  — all to ward off and confuse evil spirits.`,
      price: 45.00,
    },
    { ownerId: 7,
      address: '1126 Queens Hwy',
      city: 'Long Beach',
      state: 'CA',
      country: 'USA',
      lat: 33.75287643187356,
      lng: -118.19033423047264,
      name: 'RMS Queen Mary Hotel',
      description: `With such a varied and intriguing past it's not surprising that the Queen Mary has been voted one of the Top 10 Most Haunted Places in America by Time magazine.

      Get a detailed overview of the Queen Mary's most haunted areas and paranormal hotspots. Explore the ship inside and out and hear stories about the ship's most famous reported apparitions.
      Among the ghosts reportedly still hanging around is an engineer in the ship's engine room, a "lady in white," and various children located throughout the ship including the 1st Class Pool (the tour stops at the entrance doors to the swimming pool, but does not go inside the pool area due to ongoing restoration projects).
      Haunted Encounters is offered only during the day...but when the sun goes down, the spirits aboard the Queen Mary come out to play. Explore the legendary ship with a series of twilight tours and séances that explore the haunted past and paranormal activity that the Queen Mary is known for. We also offerTours at Night - including Dining With the Spirits, Paranormal Investigation and Paranormal Ship Walk.`,
      price: 134.00,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Bodie California Ghost Town',
        'Old Cahawba Archaeological Park & Ghost Town',
        'Crescent Hotel & Spa',
        'Hotel Monte Vista',
        'Dock St Theatre',
        'Farnsworth House',
        'Winchester House',
        'RMS Queen Mary Hotel',
      ] }
    }, {});
  }
};
