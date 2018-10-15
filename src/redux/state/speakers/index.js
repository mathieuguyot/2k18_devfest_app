// Initial state
const initialState = {
}

// Action types
export const FETCH_SPEAKERS = 'speakers/FETCH_SPEAKERS';
export const FETCH_SPEAKERS_SUCCESS = 'speakers/FETCH_USER_SUCCESS';
export const FETCH_SPEAKERS_FAIL = 'speakers/FETCH_USER_FAIL';

// Actions 
export const fetchSpeakers = () => ({
    type: FETCH_SPEAKERS
});

export const fetchSpeakersSuccess = speakers => ({
    type: FETCH_SPEAKERS_SUCCESS,
    payload: { speakers: speakers }
});

export const fetchSpeakersFail = errorMessage => ({
    type: FETCH_SPEAKERS_FAIL,
    payload: {errorMessage: errorMessage}
});

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SPEAKERS:
            return {
                ...state
            };

        case FETCH_SPEAKERS_SUCCESS:
            return {
                ...state
            };

        case FETCH_SPEAKERS_FAIL:
            return {
                ...state
            };

        default:
            return state;
    }
}