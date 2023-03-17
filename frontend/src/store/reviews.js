import { csrfFetch } from "./csrf";

export const POPULATE_REVIEWS = 'reviews/POPULATE'
export const DELETE_REVIEW = 'reviews/DELETE'
export
export const populateReviews = reviewData => {
    return {
        type: POPULATE_REVIEWS,
        reviewData
    }
}
export const deleteReview = reviewId => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}
//review thunks
export const findSpotReviews = spotId => async dispatch => {
    const reviewResponse = await fetch(`/api/spots/${spotId}/reviews`);
    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        // console.log('REVIEW THUNK', reviewData)
        dispatch(populateReviews(reviewData));
        return reviewData;
    }
};
export const deleteReviewById = reviewId => async dispatch => {
    const reviewResponse = await csrfFetch(`api/reviews/${reviewId}`)

    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        dispatch(deleteReview(reviewId))
        return reviewData
    }
}
const initialState = []

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_REVIEWS:
            const newState = { ...state, reviews: action.reviewData.Reviews };
            newState.reviews = [action.reviewData.Reviews]
            console.log('REVIEW REDUCER', newState)
        return action.reviewData.Reviews;
        case DELETE_REVIEW:
            const withReview = { ...state }
            const withoutReview = withReview.reviewData.Reviews.filter(ele => ele.id !== action.reviewId)
            withReview.reviewData.Reviews = {...withoutReview}
            return withReview
        default:
        return state;
    }
}
