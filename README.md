scarebnb is a spoof of airbnb with a theme of haunted locations. The airbnb  logo has looked like a planchette to me, the part of a ouija board that the players guide. Keeping the theme while also trying to be work appropriate was quite a challenge, as there were many haunted locations that I wanted to include but the backstories were just to grisly.

Technologies used include,
-csrf
-express js
-React js
-Redux
In addition to various other npm packages

To launch the app locally, cd into the authenticate-me directory. Create two terminals. Cd one into the back end folder and enter npm start in the terminal. The other should cd into the frontend directory, enter npm start into that terminal as well. The app should now open in your default internet browser.

Showcase:
![homepage]
[homepage]: ./images/homepage.png



The database scheme looks like this

![project-schema]
[project-schema]: ./images/airbnb_dbdiagram.png

The shape of the redux store is located in the ./storeshape.js file.

The majority of the store looks like this

const store = {
  session: {},
  spots: {
    allSpots: {
      [spotId]: {
        spotData,
      },
    },
    currentUser: {
      [spotId]: {
        spotData,
      },
    },
    singleSpot: {
      spotData,
      SpotImages: [imagesData],
      Owner: {
        ownerData,
      },
    },
  },
}

Many thanks to these authors and sources
https://www.cntraveler.com/gallery/the-most-haunted-places-in-america
https://www.nbcnews.com/business/markets/10-most-haunted-houses-us-flna1c6589514

And to the businesses and customers who help foster a curiosity in the spooky!
