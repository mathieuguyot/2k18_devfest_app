import { takeEvery, call, put } from 'redux-saga/effects';
import client, { endpoints } from '../../../api';
import { fetchSessionsFail, FETCH_SESSIONS, fetchSessionsSuccess } from './index';
import SessionContainer from '../../../models/SessionContainer';

export function* fetchSessionsSaga(params) {
    try {
        let response = yield call(endpoints.sessions.getAll);
        let sessionContainer = new SessionContainer(response.data);
        console.log("sessions loaded");
        yield put(fetchSessionsSuccess(sessionContainer));
    } catch (error) {
        console.log(error);
        yield put(fetchSessionsFail("Impossible de retrouver la liste des sessions :("));
    }
}

export function* fetchSessionsWatcher() {
    yield takeEvery(FETCH_SESSIONS, fetchSessionsSaga);
}