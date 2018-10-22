// Initial state
const initialState = {
    timeSlotContainer: undefined,
    timeSlotsLoaded: false,
    errorMessage: "",
}

// Action types
export const FETCH_SCHEDULE = "schedule/FETCH_SCHEDULE";
export const FETCH_SCHEDULE_SUCCESS = "schedule/FETCH_SCHEDULE_SUCCESS";
export const FETCH_SCHEDULE_FAIL = "schedule/FETCH_SCHEDULE_FAIL";

// Actions
export const fetchSchedule = () => ({
    type: FETCH_SCHEDULE
});

export const fetchScheduleSuccess = timeSlotContainer => ({
    type: FETCH_SCHEDULE_SUCCESS,
    payload: { timeSlotContainer: timeSlotContainer }
});

export const fetchScheduleFail = errorMessage => ({
    type: FETCH_SCHEDULE_FAIL,
    payload: { errorMessage: errorMessage }
});

// Reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SCHEDULE:
            return {
                ...state,
                timeSlotContainer: undefined,
                timeSlotsLoaded: false,
                errorMessage: "",
            };

        case FETCH_SCHEDULE_SUCCESS:
            return {
                ...state,
                timeSlotContainer: action.payload.timeSlotContainer,
                timeSlotsLoaded: true,
            };

        case FETCH_SCHEDULE_FAIL:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };
                        
        default:
            return state;
    }
};