import { csrfFetch } from './csrf';

export const POPULATE_SPOTS = 'spots/POPULATE'
export const CREATE_SPOT = 'spots/CREATE'
export const DELETE_SPOT = 'spots/DELETE'
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
export const deleteSpot = spotId => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}
//spots thunks
export const initialSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const spotData = await response.json();
        dispatch(populateSpots(spotData));
        return spotData;
    }
};
export const createSpotBackEnd = (spotData) => async dispatch => {
    const response = await csrfFetch('/api/spots',
    {"method": "POST", "body": JSON.stringify(spotData)});
    const clone = response.clone()
    if (response.ok) {
        const spotData = await response.json();
        dispatch(createSpot(spotData));
        // console.log('RESPONSE')
        return clone;
    }
};
export const deleteSpotById = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`,
    {"method": "DELETE"})
    if (response.ok) {
        const confirmation = await response.json();
        dispatch(deleteSpot(spotId));
        console.log('DELETE DISPATCH')
        return confirmation
    }
}

const initialState = {}

//spots reducer
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_SPOTS:
            const newState = {allSpots: {}, ...state }
            action.spotData.Spots.forEach(s=> newState.allSpots[s.id] = s)
        return newState;
        case CREATE_SPOT:
            const withNewSpot = { ...state }
            withNewSpot.allSpots[action.spotData.id] = action.spotData
        return withNewSpot;
        case DELETE_SPOT:
            const withoutDeleted = { ...state }
            delete withoutDeleted[action.spotId]
        return withoutDeleted;
        default:
        return state;
    }
}
