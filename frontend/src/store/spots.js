import { csrfFetch } from './csrf';

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
    console.log('were getting right here')
    const response = await csrfFetch('/api/spots',
    {"method": "POST", "body": JSON.stringify(spotData)});
    console.log(response)
    if (response.ok) {
        const spotData = await response.json();
        dispatch(createSpot(spotData));
        console.log('CREATE SPOT BACK END', spotData)
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
            console.log('SPOT REDUCER', action.spotData)
        return beforeNewSpot
        default:
        return state;
    }
}
