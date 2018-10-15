// Initial state
const initialState = {
    speakersMap: undefined,
    speakersLoaded: false,
    errorMessage:  "",
}

// Action types
export const FETCH_SPEAKERS = 'speakers/FETCH_SPEAKERS';
export const FETCH_SPEAKERS_SUCCESS = 'speakers/FETCH_USER_SUCCESS';
export const FETCH_SPEAKERS_FAIL = 'speakers/FETCH_USER_FAIL';

// Actions 
export const fetchSpeakers = () => ({
    type: FETCH_SPEAKERS
});

export const fetchSpeakersSuccess = speakersMap => ({
    type: FETCH_SPEAKERS_SUCCESS,
    payload: { speakersMap: speakersMap }
});

export const fetchSpeakersFail = errorMessage => ({
    type: FETCH_SPEAKERS_FAIL,
    payload: { errorMessage: errorMessage }
});

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SPEAKERS:
            return {
                ...state,
                speakersLoaded: false,
                errorMessage: "",
                speakersMap: undefined,
            };

        case FETCH_SPEAKERS_SUCCESS:
            return {
                ...state,
                speakersMap: action.payload.speakersMap,
                speakersLoaded: true
            };

        case FETCH_SPEAKERS_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
            };

        default:
            return state;
    }   
}