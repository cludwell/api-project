export const POPULATE_REVIEWS = 'reviews/POPULATE'

export const populateReviews = reviewData =>{
    return {
        type: POPULATE_REVIEWS,
        reviewData
    }
}

//review thunks
export const findSpotReviews = (spotId) => async dispatch => {
    const reviewResponse = await fetch(`/api/spots/${spotId}`);
    console.log('SINGLESPOT THUNK', reviewResponse)
    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        dispatch(populateReviews(reviewData));
        return reviewData;
    }
};

const initialState = {}

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_REVIEWS:
            const newState = {allSpots: {}, ...state }
            action.reviewData.Spots.forEach(s=> newState.allSpots[s.id] = s)
        return newState;
        default:
        return state;
    }
}
