export const POPULATE_SPOTS = 'spots/POPULATE'

export const populateSpots = (state, action) =>{
    return {
        type: POPULATE_SPOTS,
        payload: state.Spots
    }
}

//spots thunks
export const initalSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots', {"method": "GET"});
    const spotData = await response.json();
    dispatch(populateSpots(spotData));
    return spotData;
};

//spots reducer
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case POPULATE_SPOTS:
            const newState = {...state, ...action.state.Spots}
        return newState;
        default:
        return state;
    }
}

export default spotsReducer
