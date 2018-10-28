import SessionContainer from "../../../models/SessionContainer";

// Initial state
const initialState = {
    sessionContainer: undefined,
    sessionsLoaded: false,
    sessionJsonStr: "", // Only used for rehydratation
    errorMessage: "",
    notes: []
}

// Action types
export const FETCH_SESSIONS = "sessions/FETCH_SESSIONS";
export const FETCH_SESSIONS_SUCCESS = "sessions/FETCH_SESSIONS_SUCCESS";
export const FETCH_SESSIONS_FAIL = "sessions/FETCH_SESSION_FAIL";
export const REHYDRATE_SESSIONS = "sessions/REHYDRATE_SESSIONS";
export const ADD_SESSION_NOTE = "sessions/ADD_SESSION_NOTE";

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

export const addSessionNote = (sessionId, txtNote, imgNote) => ({
    type: ADD_SESSION_NOTE,
    payload: {
        sessionId: sessionId,
        txtNote: txtNote,
        imgNote: imgNote
    }
})

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

        case ADD_SESSION_NOTE:
            notes = [...state.notes]
            let finded = false;
            for(let i = 0; i < notes.length; i++) {
                if(notes[i].sessionId == action.payload.sessionId) {
                    notes[i].txtNote = action.payload.txtNote;
                    notes[i].imgNote = action.payload.imgNote;
                    finded = true;
                    break;
                }
            }
            if(!finded) {
                notes.push({
                    sessionId: action.payload.sessionId,
                    txtNote: action.payload.txtNote,
                    imgNote: action.payload.imgNote,
                })
            }
            console.log(notes);
            return {
                ...state,
                notes: notes
            };

        default:
            return state;
    }
}