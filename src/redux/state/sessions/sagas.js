import { takeEvery, call, put } from 'redux-saga/effects';
import client, { endpoints } from '../../../api';
import { fetchSessionsFail, FETCH_SESSIONS, fetchSessionsSuccess } from './index';
import Session from '../../../models/Session';

export function* fetchSessionsSaga(params) {
    console.log("la2")
    try {
        let response = yield call(endpoints.sessions.getAll);
        let sessionsMap = new Map();
        for(let key in response.data) {
            sessionsMap[key] = new Session(response.data[key]);
        }
        yield put(fetchSessionsSuccess(sessionsMap));
    } catch (error) {
        yield put(fetchSessionsFail("Impossible de retrouver la liste des sessions :("));
    }
}

export function* fetchSessionsWatcher() {
    yield takeEvery(FETCH_SESSIONS, fetchSessionsSaga);
}