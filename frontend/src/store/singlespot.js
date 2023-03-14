export const POPULATE_SINGLE = 'spot/POPULATE_SINGLE'

export const populateSingleSpot = singleSpot =>{
    return {
        type: POPULATE_SINGLE,
        singleSpot
    }
}

//single spot thunks
export const findSingleSpot = (spotId) => async dispatch => {
    const spotResponse = await fetch(`/api/spots/${spotId}`);
    // console.log('SINGLESPOT THUNK', spotResponse)
    if (spotResponse.ok) {
        const spotData = await spotResponse.json();
        dispatch(populateSingleSpot(spotData));
        return spotData;
    }
};

const initialState = {}

//single spot reducer
export default function singleSpotReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_SINGLE:
            const updateSingleSpot = {...state, ...action.singleSpot}
            // console.log('HERE IN REDUCER', updateSingleSpot)
        return updateSingleSpot;
        default:
        return state;
    }
}
