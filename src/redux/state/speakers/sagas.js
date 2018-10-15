import { takeEvery, call, put } from 'redux-saga/effects';
import client, { endpoints } from '../../../api';
import { FETCH_SPEAKERS, fetchSpeakersSuccess, fetchSpeakersFail } from './index';
import Speaker from '../../../models/Speaker';

export function* fetchSpeakersSaga(params) {
    console.log("la")
    try {
        let response = yield call(endpoints.speakers.getAll);
        let speakersMap = new Map();
        for(let key in response.data) {
            speakersMap[key] = new Speaker(response.data[key]);
        }
        yield put(fetchSpeakersSuccess(speakersMap));
    } catch (error) {
        yield put(fetchSpeakersFail("Impossible de retrouver la liste des présentateurs :("));
    }
}

export function* fetchSpeakersWatcher() {
    yield takeEvery(FETCH_SPEAKERS, fetchSpeakersSaga);
}