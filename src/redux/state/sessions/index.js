import SessionContainer from "../../../models/SessionContainer";

// Initial state
const initialState = {
    sessionContainer: undefined,
    sessionsLoaded: false,
    sessionJsonStr: "", // Only used for rehydratation
    errorMessage: "",
}

// Action types
export const FETCH_SESSIONS = "sessions/FETCH_SESSIONS";
export const FETCH_SESSIONS_SUCCESS = "sessions/FETCH_SESSIONS_SUCCESS";
export const FETCH_SESSIONS_FAIL = "sessions/FETCH_SESSION_FAIL";
export const REHYDRATE_SESSIONS = "sessions/REHYDRATE_SESSIONS";

// Actions
export const fetchSessions = () => ({
    type: FETCH_SESSIONS
});

export const fetchSessionsSuccess = (sessionContainer, sessionJsonStr) => ({
    type: FETCH_SESSIONS_SUCCESS,
    payload: { 
        sessionContainer: sessionContainer,
        sessionJsonStr: sessionJsonStr
    }
});

export const fetchSessionsFail = errorMessage => ({
    type: FETCH_SESSIONS_FAIL,
    payload: { errorMessage: errorMessage }
});

export const rehydrateSessions = (sessionJsonStr) => ({
    type: REHYDRATE_SESSIONS,
    payload: { sessionJsonStr: sessionJsonStr }
});

// Reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SESSIONS:
            return {
                ...state,
                sessionsLoaded: false,
                errorMessage: "",
                sessionJsonStr: "",
                sessionContainer: undefined,
            };
        
        case FETCH_SESSIONS_SUCCESS:
            return {
                ...state,
                sessionContainer: action.payload.sessionContainer,
                sessionJsonStr: action.payload.sessionJsonStr,
                sessionsLoaded: true,
            }

        case FETCH_SESSIONS_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };

        case REHYDRATE_SESSIONS:
            return {
                ...state,
                sessionContainer: new SessionContainer(action.payload.sessionJsonStr)
            };    

        default:
            return state;
    }
}