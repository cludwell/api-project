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


Backend routes include

//Get all of the Current User's Bookings
proxy/api/bookingscurrent

//Edit a Booking
proxy/api/bookings:bookingId

//Delete a Booking
proxy/api/bookings:bookingId

//Delete a Review Image
proxy/api/review-images:imageId

//Add an Image to a Review based on the Review's id
proxy/api/reviews:reviewId/images

//Delete a Review
proxy/api/reviews:reviewId

//Edit a Review
proxy/api/reviews/:reviewId

//Get all Reviews of the Current User
proxy/api/reviews/current


//Get the Current User
proxy/api/session/

//Login
proxy/api/session/

//Logout
proxy/api/session/

//Restore User
proxy/api/session/

//Signup
proxy/api/users/

//Delete a Spot Image
proxy/api/spot-images/:imageId

//Get all Bookings for a Spot based on the Spot's id
proxy/api/spots/:spotId/bookings

//Create a Booking from a Spot based on the Spot's id
proxy/api/spots/:spotId/bookings

//Create a Review for a Spot based on the Spot's id
proxy/api/spots/:spotId/reviews

//Get all Reviews by a Spot's id
proxy/api/spots/:spotId/reviews

//Add an Image to a Spot based on the Spot's id
proxy/api/spots/:spotId/images

//Get all Spots owned by the Current User
proxy/api/spots/current

//Edit a Spot
proxy/api/spots/:spotId

//Delete a Spot
proxy/api/spots/:spotId

//Create a Spot
proxy/api/spots/

//Get details of a Spot from an id
proxy/api/spots/:id

//Get all Spots
proxy/api/spots/

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


Feature Checklist follows


Mod 5 AirBnB Feature Checklist

You will be assessed on the completion of the "Acceptance Criteria" list in every feature. Your goal is to complete 100% of all the "Acceptance Criteria" checklists below.

The "User Stories" list in every feature is a list of business needs or user expectations of the feature. They are written in the typical language of defining user expectations of a software development product.
Feature: Landing Page - List of All Spots
User Stories

    As a site visitor or authenticated user, I want to see a list of spots offered for rent with a thumbnail image, location, and price.

Acceptance Criteria

    On the landing page of the site, I should see a tile list of all the spots.
    Each spot tile in the tile list should have a thumbnail image, the city, and the state of the spot.
    Each spot tile in the tile list should have a tooltip with the the name of the spot as the tooltip's text.
    Each spot tile in the tile list should have a star rating of "New" (if there are no review for that spot) or the average star rating of the spot as a decimal.
    Each spot tile in the tile list should have the price for the spot followed by the label "night".
    Clicking any part of the spot tile should navigate to that spot's detail page.

Feature: View Spot Details
User Stories

    As a site visitor or authenticated user, I want to see a minimum of 1 image (preview image) on the spot's details page with:
        The location, with the country
        1-5 spot images
        The host's name
        A description
        The price
    NOTE: Ratings and reviews will be covered in a separate feature.

Acceptance Criteria

    On the spot's detail page, the following information should be present: a Heading <spot name>, Location: <city>, <state>, <country>, Images (1 large image and 4 small images), Text: Hosted by <first name>, <last name>, Paragraph: <description>, and the callout information box on the right, below the images.
    The callout information box on the right of the spot's detail page should state the price for the spot followed by the label "night", and have a "Reserve" button.
    When the "Reserve" button on the spot's detail page is clicked, it should open an alert with the text "Feature coming soon".

Feature: View Rating and Reviews
User Stories

    As a site visitor or authenticated user, when viewing the home page, I want to see the rating of each spot (average rounded to 1 decimal place).
    As a site visitor or authenticated user, when viewing a spot's details, I want to see the reviews posted for that spot. Starting with the most recent.
    As an authenticated user, if there are no reviews yet, I should see a prompt encouraging me to leave the first review.
    As a site visitor or authenticated user, I want to see the average rating for the spot rounded to the nearest single decimal place, followed by the number of reviews posted for that spot.

Acceptance Criteria

    When viewing the home page, each spot tile in the tile list must show the average star rating for that spot immediately below the thumbnail of the tile and to the right of the spot's name. The average star rating should have a star icon followed by the average star rating of all the reviews for that spot as a decimal (e.g. 3.0 or 4.89, NOT 3 or 5).
    When viewing a spot's detail page, the review summary info should be in two different places, the callout information box and the heading before the list of reviews. The review summary info should show the average star rating of all the reviews for that spot and the review count for that spot.
    The average star rating in the spot's detail page should have a star icon followed by the average star rating of all the reviews for that spot as a decimal (e.g. 3.0 or 4.89, NOT 3 or 5).
    If there are no reviews for the spot, the text, "New", should be next to the star icon instead.
    The review count on the spot's detail page should be an integer representing the total number of reviews for that spot followed by the text "Reviews" (e.g. "4 Reviews").
    If the review count is 1, it should show "1 Review" (not "1 Reviews").
    There should be a centered dot (·) between the star rating and the review count
    If the review count is zero (there are no reviews yet for this spot), it should not show the centered dot or the review count (only the average star rating should be displayed)
    When viewing the spot's detail page, show a list of the reviews for the spot below the spot's information with the newest reviews at the top, and the oldest reviews at the bottom.
    Each review in the review list must include: The reviewer's first name, the month and the year that the review was posted (e.g. December 2022), and the review comment text.
    If no reviews have been posted yet and the current user is logged-in and is NOT the owner of the spot, replace the reviews list with the text "Be the first to post a review!"

Feature: Create a New Spot
User Stories

    As an authenticated user, I want to create a spot to include in the listings.
    As an authenticated user, if I make a mistake while creating a spot, I want useful error messages (a.k.a. validation).
    As an authenticated user, when I successfully create a spot, I want to see its details immediately.

Acceptance Criteria

    There should be a "Create a New Spot" button in the navigation bar to the left of the User Menu button for logged-in users.
    Upon clicking the "Create a New Spot" button, the user should be navigated to a blank form to gather the data for a new spot (see wireframe).
    On the new spot form, there should be: a title at the top with the text "Create a New Spot".
    The first section should include: a heading of "Where's your place located?", a caption of "Guests will only get your exact address once they booked a reservation.", and text inputs with labels and placeholders for "Country", "Street Address", "City", and "State" ("Latitude" and "Longitude" inputs are optional for MVP)
    The second section should include: a heading of "Describe your place to guests", a caption of "Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.", and a text area with a placeholder of "Please write at least 30 characters".
    The third section should include: a heading of "Create a title for your spot", a caption of "Catch guests' attention with a spot title that highlights what makes your place special.", and a text input with a placeholder of "Name of your spot".
    The fourth section should include: a heading of "Set a base price for your spot", a caption of "Competitive pricing can help your listing stand out and rank higher in search results.", and a number input with a placeholder of "Price per night (USD)".
    The fifth section should include: a heading of "Liven up your spot with photos", a caption of "Submit a link to at least one photo to publish your spot.", and five text inputs where the first input has a placeholder of "Preview Image URL" and the rest of the inputs have a placeholder of "Image URL".
    The submit button should have the text of "Create Spot".
    Validation messages must show at the top of the form or under each field with an error if the user tries to submit an incomplete form. Examples: a Required Field: " is required" (e.g. "Price per night is required", etc.), a Description Min Length: "Description needs 30 or more characters". Out of the five image URL inputs, only the first Image URL input (the Preview Image URL) is required.
    When a spot is successfully created, the user should automatically be navigated to the new spot's detail page.
    Navigating away and back to the create spot form form resets any errors and clears all data entered, so it displays in the default state (no errors, empty inputs, button disabled).

Feature: Post a Review
User Stories

    As an authenticated user, when viewing a spot's details, I want to leave a review about that spot.
    As an authenticated user, when posting a review, I want to set a star rating from 1 to 5.
    As an authenticated user, when posting a review, if I forgot to enter text or a rating for the message, I want to see a friendly error.

Acceptance Criteria

    If the current user is logged-in and they are viewing a spot's detail page for a spot that they HAVE NOT posted a review yet, a "Post Your Review" button shows between the rating/reviews heading and the list of reviews.
    If the current user is logged-in and they are viewing a spot's detail page for a spot that they are an owner of, the "Post Your Review" button should be hidden.
    If the current user is logged-in and they are viewing a spot's detail page for a spot that they HAVE posted a review for, the "Post Your Review" button should be hidden.
    If the current user is NOT logged-in and they are viewing a spot's detail page for a spot, the "Post Your Review" button should be hidden.
    Clicking "Post Your Review", opens a modal popup window containing the new review form.
    On the new review form, there should be a title at the top with the text "How was your stay?".
    There should be a comment text area with a placeholder of "Leave your review here...".
    There should be a star rating input ranging from 1 to 5 stars followed by a label of "Stars".
    The submit button should have the text of "Submit Your Review".
    The "Submit Your Review" button is disabled when there are fewer than 10 characters in the comment text area and when the star rating input has no stars selected.
    If a server error occurs, show it below the title. (But that shouldn't happen under normal circumstances).
    When the review is successfully created, the newly created review should show up at the bottom of the reviews list.
    When the review is successfully created, the average star rating and review summary info should be updated in both places.
    Closing the model resets any errors and clears all data entered. Once it reopens, it must be in the default state (no errors, empty inputs, button disabled).

Feature: Manage Spots
User Stories

    As an authenticated user, I want to be able to view the spots I have posted in one place.
    As an authenticated user, I want to be able to update a spot I posted.
    As an authenticated user, I want to be able to delete a spot I posted.
    As an authenticated user, if I have not posted any spots, I want to see a friendly message.

Acceptance Criteria

    When opening the user drop down menu and selecting "Manage Spots", it should navigate the user to the spot management page which shows the the list of all the spots created by the user.
    The spot management page should contain a heading with the text "Manage Spots".
    If no spots have been posted yet by the user, show a "Create a New Spot" link, which links to the new spot form page, instead of the spot list.
    The spot management page should contain a spot tile list similar to the one in the landing page (thumbnail image, location, rating, price).
    Each spot in the spot tile list on the spot management page should contain an additional two buttons, "Update" and "Delete" buttons, below the city and state.
    Clicking any part of the spot tile should navigate to that spot's detail page.

Feature: Update a Spot
User Stories

    As an authenticated user, I want to update a spot I created.
    NOTE:
        The image update on a spot is not required for MVP.

Acceptance Criteria

    Clicking "Update" on one of the spot tiles on the spot management page navigates the user to the update spot form which looks like the same as the create a new spot form, but pre-populated with the values stored in the database for the spot that was clicked, the title changed to "Update your Spot", and with a submit button text of "Update your Spot". Image URL inputs on the update spot form are optional for MVP.
    When the update form submission is successful, the user is navigated to the updated spot's details page.
    The updated spot's detail page should display the updated information. No refresh should be necessary.

Feature: Delete a Spot
User Stories

    As an authenticated user, I want to delete a spot I created.
    As an authenticated user, I want to be prompted to confirm deleting a spot before it happens.

Acceptance Criteria

    Clicking "Delete" on one of the spot tiles on the spot management page opens a confirmation modal popup that should contain: a Title: "Confirm Delete", a Message: "Are you sure you want to remove this spot?", a Red button: "Yes (Delete Spot)", and a Dark grey button: "No (Keep Spot)".
    After a spot is deleted, it should be removed from the spot list in the spot management page and in the landing page. No refresh should be necessary.

Feature: Delete a Review
User Stories

    As an authenticated user, I want to be able to delete a review I posted.

Acceptance Criteria

    On a review that the logged-in user has posted, there should be a "Delete" button below the review's comment.
    On a review that the logged-in user did NOT post, the "Delete" button should be hidden.
    Clicking the "Delete" button on a review will open a confirmation modal popup window that should contain: a Title: "Confirm Delete", a Message: "Are you sure you want to delete this review?", a Red button: "Yes (Delete Review)", and a Dark grey button: "No (Keep Review)".
    Clicking the "Delete" button on a review should not delete the review. Clicking the "Yes (Delete Review)" button in the confirmation modal should delete the review.
    After a review is deleted, it should be removed from the review list in the review management page and in the spot's detail page. No refresh should be necessary.
