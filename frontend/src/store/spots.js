export const POPULATE_SPOTS = 'spots/POPULATE'
export const CREATE_SPOT = 'spots/CREATE'

export const populateSpots = spotData =>{
    return {
        type: POPULATE_SPOTS,
        spotData
    }
}
export const createSpot = spotData =>{
    return {
        type: CREATE_SPOT,
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
export const createSpotBackEnd = (spotData) => async dispatch => {
    const response = await fetch('/api/spots', {"method": "POST"});

    if (response.ok) {
        const spotData = await response.json();
        dispatch(createSpot(spotData));
        console.log('THUNK', spotData)
        return spotData;
    }
};

const initialState = {}

//spots reducer
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_SPOTS:
            const newState = {allSpots: {}, ...state }
            action.spotData.Spots.forEach(s=> newState.allSpots[s.id] = s)
        return newState;
        case CREATE_SPOT:
            const beforeNewSpot = { ...state }
            beforeNewSpot.allSpots[action.spotData.id] = action.spotData
        return beforeNewSpot
        default:
        return state;
    }
}
