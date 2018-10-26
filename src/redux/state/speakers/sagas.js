import { takeEvery, call, put } from 'redux-saga/effects';
import client, { endpoints } from '../../../api';
import { FETCH_SPEAKERS, fetchSpeakersSuccess, fetchSpeakersFail } from './index';
import SpeakerContainer from '../../../models/SpeakerContainer';

export function* fetchSpeakersSaga(params) {
    try {
        let response = yield call(endpoints.speakers.getAll);
        let speakerContainer = new SpeakerContainer(response.data);
        console.log("Speakers loaded");
        yield put(fetchSpeakersSuccess(speakerContainer, response.data));
    } catch (error) {
        console.log(error);
        yield put(fetchSpeakersFail("Impossible de retrouver la liste des présentateurs :("));
    }
}

export function* fetchSpeakersWatcher() {
    yield takeEvery(FETCH_SPEAKERS, fetchSpeakersSaga);
}