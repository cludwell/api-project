import { csrfFetch } from './csrf';

export const POPULATE_SPOTS = 'spots/POPULATE'
export const CREATE_SPOT = 'spots/CREATE'
export const DELETE_SPOT = 'spots/DELETE'
export const UPDATE_SPOT = 'spots/UPDATE'
export const GET_CURRENT ='spots/CURRENT'
//spot actions
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
export const updateSpot = spotData => {
    return {
        type: UPDATE_SPOT,
        spotData
    }
}
export const userSpots = current => {
    return {
        type: GET_CURRENT,
        current
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
        return clone;
    }
};
export const deleteSpotById = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`,
    {"method": "DELETE"})
    if (response.ok) {
        const confirmation = await response.json();
        dispatch(deleteSpot(spotId));
        // console.log('DELETE DISPATCH', spotId)
        return confirmation
    }
}
export const updateSpotData = spotData => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotData.id}`,
    {"method": "PUT", "body": JSON.stringify(spotData)})
    const clone = response.clone()
    if (response.ok) {
        const confirmation = await response.json();
        // console.log('HITTING THE THUNK', confirmation)
        dispatch(updateSpot(confirmation))
        return clone
    }
}
export const getCurrentUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`)
    if (response.ok) {
        const current = await response.json();
        dispatch(userSpots(current))
        return current
    }
}
const initialState = {}

//spots reducer
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_SPOTS:
            const newState = {allSpots: {}, ...state }
            console.log('FINDING ERRORS', action.spotData)
            action.spotData.Spots.forEach(s=> newState.allSpots[s.id] = s)
        return newState;
        case CREATE_SPOT:
            const withNewSpot = { ...state }
            withNewSpot.allSpots[action.spotData.id] = action.spotData
        return withNewSpot;
        case DELETE_SPOT:
            console.log('ACTION.SPOTID', action.spotId)
            const withoutDeleted = { ...state }
            console.log('DELETING IN REDUCER', state)
            delete withoutDeleted.allSpots[action.spotId]
        return withoutDeleted;
        case UPDATE_SPOT:
            const updateState = { ...state }
            // console.log('IN THE UPDATE REDUCER', action.spotData)
            // console.log(updateState)
            updateState.allSpots[action.spotData.id] = {...action.spotData}
            // console.log('IS THE UPDATE KEYING TO CORRECT PLACE', updateState.allSpots[action.spotData.id], action.spotData)
            return updateState;
        case GET_CURRENT:
            return {...state, currentUser: action.current.Spots}
        default:
        return state;
    }
}
