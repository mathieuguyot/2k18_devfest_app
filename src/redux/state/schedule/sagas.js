import { takeEvery, call, put } from 'redux-saga/effects';
import { endpoints } from '../../../api/index';
import Schedule from '../../../models/Schedule';
import {
  FETCH_SCHEDULE,
  fetchScheduleSuccess,
  fetchScheduleFail
} from './index';

export function* fetchScheduleSaga(params) {
  try {
    let response = yield call(endpoints.schedule.getAll);
    let schedule = new Schedule(response.data);
    console.log('Schedule loaded');
    yield put(fetchScheduleSuccess(schedule));
  } catch (error) {
    console.log(error);
    yield put(
      fetchScheduleFail('Impossible de retrouver le planning des sessions')
    );
  }
}

export function* fetchScheduleWatcher() {
  yield takeEvery(FETCH_SCHEDULE, fetchScheduleSaga);
}
