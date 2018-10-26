import SpeakerContainer from "../../../models/SpeakerContainer";

// Initial state
const initialState = {
    speakerContainer: undefined,
    speakersLoaded: false,
    speakersJsonStr: "", // Only used for rehydratation
    errorMessage:  "",
}

// Action types
export const FETCH_SPEAKERS = 'speakers/FETCH_SPEAKERS';
export const FETCH_SPEAKERS_SUCCESS = 'speakers/FETCH_USER_SUCCESS';
export const FETCH_SPEAKERS_FAIL = 'speakers/FETCH_USER_FAIL';
export const REHYDRATE_SPEAKERS= "speakers/REHYDRATE_SPEAKERS";

// Actions 
export const fetchSpeakers = () => ({
    type: FETCH_SPEAKERS
});

export const fetchSpeakersSuccess = (speakerContainer, speakersJsonStr) => ({
    type: FETCH_SPEAKERS_SUCCESS,
    payload: { 
        speakerContainer: speakerContainer, 
        speakersJsonStr: speakersJsonStr 
    }
});

export const fetchSpeakersFail = errorMessage => ({
    type: FETCH_SPEAKERS_FAIL,
    payload: { errorMessage: errorMessage }
});

export const rehydrateSpeakers = (speakersJsonStr) => ({
    type: REHYDRATE_SPEAKERS,
    payload: {speakersJsonStr: speakersJsonStr}
});

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SPEAKERS:
            return {
                ...state,
                speakersLoaded: false,
                errorMessage: "",
                speakersJsonStr: "",
                speakerContainer: undefined,
            };

        case FETCH_SPEAKERS_SUCCESS:
            return {
                ...state,
                speakerContainer: action.payload.speakerContainer,
                speakersJsonStr: action.payload.speakersJsonStr,
                speakersLoaded: true
            };

        case FETCH_SPEAKERS_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
            };

        case REHYDRATE_SPEAKERS:
            return {
                ...state,
                speakerContainer: new SpeakerContainer(action.payload.speakersJsonStr)
            };   

        default:
            return state;
    }   
}