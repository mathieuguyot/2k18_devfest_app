import TimeSlotContainer from "../../../models/TimeSlotContainer";

// Initial state
const initialState = {
    timeSlotContainer: undefined,
    timeSlotsLoaded: false,
    timeSlotJsonStr: "", // Only used for rehydratation
    errorMessage: "",
}

// Action types
export const FETCH_SCHEDULE = "schedule/FETCH_SCHEDULE";
export const FETCH_SCHEDULE_SUCCESS = "schedule/FETCH_SCHEDULE_SUCCESS";
export const FETCH_SCHEDULE_FAIL = "schedule/FETCH_SCHEDULE_FAIL";
export const REHYDRATE_SCHEDULE = "schedule/REHYDRATE_SCHEDULE";

// Actions
export const fetchSchedule = () => ({
    type: FETCH_SCHEDULE
});

export const fetchScheduleSuccess = (timeSlotContainer, timeSlotJsonStr) => ({
    type: FETCH_SCHEDULE_SUCCESS,
    payload: { 
        timeSlotContainer: timeSlotContainer,
        timeSlotJsonStr: timeSlotJsonStr
    }
});

export const fetchScheduleFail = errorMessage => ({
    type: FETCH_SCHEDULE_FAIL,
    payload: { errorMessage: errorMessage }
});

export const rehydrateSchedule = (timeSlotJsonStr) => ({
    type: REHYDRATE_SCHEDULE,
    payload: { timeSlotJsonStr: timeSlotJsonStr }
});

// Reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SCHEDULE:
            return {
                ...state,
                timeSlotContainer: undefined,
                timeSlotsLoaded: false,
                timeSlotJsonStr: "",
                errorMessage: "",
            };

        case FETCH_SCHEDULE_SUCCESS:
            return {
                ...state,
                timeSlotContainer: action.payload.timeSlotContainer,
                timeSlotsLoaded: true,
                timeSlotJsonStr: action.payload.timeSlotJsonStr,
            };

        case FETCH_SCHEDULE_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };
                
        case REHYDRATE_SCHEDULE:
            return {
                ...state,
                timeSlotContainer: new TimeSlotContainer(action.payload.timeSlotJsonStr)
            };
            
        default:
            return state;
    }
};