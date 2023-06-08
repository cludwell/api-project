import { csrfFetch } from "./csrf"

export const POPULATE_BOOKINGS = 'bookings/POPULATE_BOOKINGS'
export const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
export const USER_BOOKINGS = 'bookings/USER_BOOKINGS'

export const populateBookings = bookings => {
    return {
        type: POPULATE_BOOKINGS,
        bookings
    }
}
export const createBooking = bookingData => {
    return {
        type: CREATE_BOOKING,
        bookingData
    }
}
export const userBookings = bookingData => {
    return {
        type: USER_BOOKINGS,
        bookingData
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
export const createBookingRequest = bookingData => async dispatch => {
    const response = await csrfFetch(`/api/spots/${bookingData.spotId}/bookings`,
    {"method": "POST", "body": JSON.stringify(bookingData)})
    if (response.ok) {
        const booking = await response.json()
        dispatch(createBooking(booking))
        return booking
    }
}
export const userBookingsRequest = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {
        const bookingData = await response.json()
        dispatch(userBookings(bookingData))
        return bookingData
    }
}
const initialState = {
    allBookings: {},
    userBookings: []
}
export default function bookingsReducer (state = initialState, action) {
    switch (action.type) {
        case POPULATE_BOOKINGS:
            return {...state, allBookings: action.bookings }
        case CREATE_BOOKING:
            return {...state, userBookings: action.bookingData}
        case USER_BOOKINGS:
            return {...state, userBookings: action.bookingData}
        default:
            return state;
    }
}
