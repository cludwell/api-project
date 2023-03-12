export const POPULATE_SPOTS = 'spots/POPULATE'

export const populateSpots = (state, action) =>{
    return {
        type: POPULATE_SPOTS,
        payload: state.Spots
    }
}

//spots thunks
export const initialSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots', {"method": "GET"});
    
    const spotData = await response.json();
    dispatch(populateSpots(spotData));
    return spotData;
};

//spots reducer
export default function spotsReducer(state = {}, action) {
    console.log('hitting reducer')
    switch (action.type) {
        case POPULATE_SPOTS:
            const newState = {...state}
            action.payload.forEach(s=> newState.allSpots[s.id] = s)
        return newState;
        default:
        return state;
    }
}
