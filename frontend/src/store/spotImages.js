import { csrfFetch } from './csrf';

export const CREATE_SPOTIMAGE = 'spotimage/CREATE'

export const createSpotImage = reviewData =>{
    return {
        type: CREATE_SPOTIMAGE,
        reviewData
    }
}

//spot image thunks
export const createSpotImageBackEnd = (spotId, imageData) => async dispatch => {
    console.log(spotId, 'WHERE IS THE ID')
    const spotImageResponse = await csrfFetch(`/api/spots/${spotId}/images`, {"method": "POST", "body": JSON.stringify(imageData)});
    if (spotImageResponse.ok) {
        const imageData = await spotImageResponse.json();
        console.log('SPOT IMAGE THUNK', imageData)
        dispatch(createSpotImage(imageData));
        return imageData;
    }
};

const initialState = {}
//spot image reducer
export default function spotImageReducer (state = initialState, action) {
    switch (action.type) {
        case CREATE_SPOTIMAGE:
            const newState = { ...state}
            console.log('SPOT IMAGE REDUCER', action.imageData)
        return newState.spotImages[action.imageData.id] = action.imageData
        default:
        return state;
    }
}
