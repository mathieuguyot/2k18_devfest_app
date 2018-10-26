import { takeEvery, call, put } from 'redux-saga/effects';
import client, { endpoints } from "../../../api/index";
import TimeSlotContainer from "../../../models/TimeSlotContainer";
import { FETCH_SCHEDULE, fetchScheduleSuccess, fetchScheduleFail } from "./index";

export function* fetchScheduleSaga(params) {
    try {
        let response = yield call(endpoints.schedule.getAll);
        let timeSlotContainer = new TimeSlotContainer(response.data);
        console.log("Schedule loaded");
        yield put(fetchScheduleSuccess(timeSlotContainer, response.data));
    } catch (error) {
        console.log(error);
        yield put(fetchScheduleFail("Impossible de retrouver le planning des sessions"));
    }
}

export function* fetchScheduleWatcher() {
    yield takeEvery(FETCH_SCHEDULE, fetchScheduleSaga)
}