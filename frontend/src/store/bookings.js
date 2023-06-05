import { csrfFetch } from "./csrf"

export const POPULATE_BOOKINGS = 'bookings/POPULATE_BOOKINGS'

export const populateBookings = bookings => {
    return {
        type: POPULATE_BOOKINGS,
        bookings
    }
}

export const bookingsBySpotId = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const bookings = await response.json()
        dispatch(populateBookings(bookings))
        return bookings
    }
}
const initialState = {
    allBookings: {}
}
export default function bookingsReducer (state = initialState, action) {
    switch (action.type) {
        case POPULATE_BOOKINGS:
            console.log('in the bookings reducer', action)
            return {...state, allBookings: action.bookings }
        default:
            return state;
    }
}
