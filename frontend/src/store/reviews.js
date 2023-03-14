export const POPULATE_REVIEWS = 'reviews/POPULATE'

export const populateReviews = reviewData =>{
    return {
        type: POPULATE_REVIEWS,
        reviewData
    }
}

//review thunks
export const findSpotReviews = (spotId) => async dispatch => {
    const reviewResponse = await fetch(`/api/spots/${spotId}/reviews`);
    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        // console.log('REVIEW THUNK', reviewData)
        dispatch(populateReviews(reviewData));
        return reviewData;
    }
};

const initialState = []

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_REVIEWS:
            // const newState = { ...state, reviews: action.reviewData.Reviews };
            // newState.reviews = [action.reviewData.Reviews]
            // console.log('REVIEW REDUCER', newState)
        return action.reviewData.Reviews;
        default:
        return state;
    }
}
