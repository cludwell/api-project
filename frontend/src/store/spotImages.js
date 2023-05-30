import { csrfFetch } from './csrf';

export const CREATE_SPOTIMAGE = 'spotimage/CREATE'

export const createSpotImage = image =>{
    return {
        type: CREATE_SPOTIMAGE,
        image
    }
}

//spot image thunks
export const createSpotImageBackEnd = (spotId, imageData) => async dispatch => {
    // const { preview, urls, url } = imageData
    // const formData = new FormData();
    // formData.append("preview", preview);
    // formData.append("url", url)
    // formData.append("spotId", spotId)

    // if (urls && urls.length !== 0) {
    //     for (var i = 0; i < urls.length; i++) {
    //       formData.append("urls", urls[i]);
    //     }
    //   }

    //   // for single file
    // if (url) formData.append("url", url);

    const res = await csrfFetch(`/api/spots/${spotId}/images`,
        {"method": "POST",
        "headers": { "Content-Type": "multipart/form-data" },
        "body": imageData });
    if (res.ok) {
        const image = await res.json();
        dispatch(createSpotImage(image));
        return image;
    }
};

const initialState = {}
//spot image reducer
export default function spotImageReducer (state = initialState, action) {
    switch (action.type) {
        case CREATE_SPOTIMAGE:
            const newState = { ...state}
        return newState.spotImages[action.imageData.id] = action.imageData
        default:
        return state;
    }
}
