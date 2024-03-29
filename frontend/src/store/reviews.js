import { csrfFetch } from "./csrf";

export const POPULATE_REVIEWS = 'reviews/POPULATE';
export const DELETE_REVIEW = 'reviews/DELETE';
export const POST_REVIEW = 'reviews/POST';

export const populateReviews = reviewData => {
    return {
        type: POPULATE_REVIEWS,
        reviewData
    }
};
export const deleteReview = reviewId => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
};
export const postReview = reviewData => {
    return {
        type: POST_REVIEW,
        reviewData
    }
};

//review thunks
export const findSpotReviews = spotId => async dispatch => {
    const reviewResponse = await fetch(`/api/spots/${spotId}/reviews`);
    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        dispatch(populateReviews(reviewData));
        return reviewData;
    }
};
export const deleteReviewById = reviewId => async dispatch => {
    const reviewResponse = await csrfFetch(`/api/reviews/${reviewId}`,
    {"method": "DELETE"})

    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        dispatch(deleteReview(reviewId))
        return reviewData
    }
};
export const postReviewById = (reviewData) => async dispatch => {
    const reviewResponse = await csrfFetch(`/api/spots/${reviewData.spotId}/reviews`, {"method": "POST", "body": JSON.stringify(reviewData)})

    if (reviewResponse.ok) {
        const review = await reviewResponse.json()
        dispatch(postReview(review))
        return review
    } else {
        return reviewResponse
    }
};

const initialState = [];

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_REVIEWS:
            const newState = { ...state, reviews: action.reviewData.Reviews };
            newState.reviews = [action.reviewData.Reviews]
            return action.reviewData.Reviews;
        case DELETE_REVIEW:
            const withReview = [ ...state]
            const withoutReview = withReview.filter(ele => ele.id !== action.reviewId)
            return withoutReview
        case POST_REVIEW:
            const beforeReview = [ ...state ]
            const reviewIncluded = beforeReview.push(action.reviewData)
            return reviewIncluded
        default:
            return state;
    }
};
