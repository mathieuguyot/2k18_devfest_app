import { takeLatest, call, put } from 'redux-saga/effects';
import client, { endpoints } from '../../../api';
import { FETCH_SPEAKERS, fetchSpeakersSuccess, fetchSpeakersFail } from './index';

function* fetchSpeakersSaga(params) {
    try {
        let response = yield call(endpoints.speakers.getAll);
        console.log(response);
    } catch (error) {
        yield put(fetchSpeakersFail("Une erreur est survenue"))
    }
}

export function* fetchSpeakersWatcher() {
    yield takeLatest(FETCH_SPEAKERS, fetchSpeakersSaga);
}