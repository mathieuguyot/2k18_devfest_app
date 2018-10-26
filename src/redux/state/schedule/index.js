import Schedule from '../../../models/Schedule';

// Initial state
const initialState = {
  days: undefined,
  loaded: false,
  scheduleJsonStr: '', // Only used for rehydratation
  errorMessage: ''
};

// Action types
export const FETCH_SCHEDULE = 'schedule/FETCH_SCHEDULE';
export const FETCH_SCHEDULE_SUCCESS = 'schedule/FETCH_SCHEDULE_SUCCESS';
export const FETCH_SCHEDULE_FAIL = 'schedule/FETCH_SCHEDULE_FAIL';
export const REHYDRATE_SCHEDULE = 'schedule/REHYDRATE_SCHEDULE';

// Actions
export const fetchSchedule = () => ({
  type: FETCH_SCHEDULE
});

export const fetchScheduleSuccess = (schedule, scheduleJsonStr) => ({
  type: FETCH_SCHEDULE_SUCCESS,
  payload: {
    schedule,
    scheduleJsonStr
  }
});

export const fetchScheduleFail = errorMessage => ({
  type: FETCH_SCHEDULE_FAIL,
  payload: { errorMessage: errorMessage }
});

export const rehydrateSchedule = timeSlotJsonStr => ({
  type: REHYDRATE_SCHEDULE,
  payload: { timeSlotJsonStr: timeSlotJsonStr }
});

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return {
        ...state,
        days: undefined,
        loaded: false,
        scheduleJsonStr: '',
        errorMessage: ''
      };

    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        days: action.payload.schedule,
        loaded: true,
        scheduleJsonStr: action.payload.timeSlotJsonStr
      };

    case FETCH_SCHEDULE_FAIL:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };

    case REHYDRATE_SCHEDULE:
      return {
        ...state,
        days: new Schedule(action.payload.schedule)
      };

    default:
      return state;
  }
}
