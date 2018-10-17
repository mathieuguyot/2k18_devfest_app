// Initial state
const initialState = {
    sessionContainer: undefined,
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

export const fetchSessionsSuccess = sessionContainer => ({
    type: FETCH_SESSIONS_SUCCESS,
    payload: { sessionContainer: sessionContainer }
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
                sessionContainer: undefined,
            };
        
        case FETCH_SESSIONS_SUCCESS:
            return {
                ...state,
                sessionContainer: action.payload.sessionContainer,
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