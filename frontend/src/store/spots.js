export const POPULATE_SPOTS = 'spots/POPULATE'

export const populateSpots = spotData =>{
    return {
        type: POPULATE_SPOTS,
        spotData
    }
}

//spots thunks
export const initialSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const spotData = await response.json();
        dispatch(populateSpots(spotData));
        // console.log('DATA', spotData)
        return spotData;
    }
};

const initialState = {

}
//spots reducer
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_SPOTS:
            const newState = {...state }
            // console.log('HERE IN REDUCER', action.spotData)
            action.spotData.Reviews.forEach(r=> newState.reviews.spot[r.id] = r)
            // console.log('NEW STATE', newState)
        return newState;
        default:
        return state;
    }
}
