// Initial state
const initialState = {
    sessionsMap: undefined,
    sessionsLoaded: false,
    errorMessage: "",
}

// Action types
export const FETCH_SESSIONS = "sessions/FETCH_SESSIONS";
export const FETCH_SESSIONS_SUCCESS = "sessions/FETCH_SESSIONS_SUCCESS";
export const FETCH_SESSIONS_FAIL = "sessions/FETCH_SESSION_FAIL";

// Actions
export const fetchSessions = () => ({
    type: FETCH_SESSIONS
});

export const fetchSessionsSuccess = sessionsMap => ({
    type: FETCH_SESSIONS_SUCCESS,
    payload: { sessionsMap: sessionsMap }
});

export const fetchSessionsFail = errorMessage => ({
    type: FETCH_SESSIONS_FAIL,
    payload: { errorMessage: errorMessage }
});

// Reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SESSIONS:
            return {
                ...state,
                sessionsLoaded: false,
                errorMessage: "",
                sessionsMap: undefined,
            };
        
        case FETCH_SESSIONS_SUCCESS: 
            console.log(sessionsMap);
            return {
                ...state,
                sessionsMap: action.payload.sessionsMap,
                sessionsLoaded: true,
            }

        case FETCH_SESSIONS_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };
            
        default:
            return state;
    }
}