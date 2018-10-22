import createSagaMiddleware from 'redux-saga';
import { call, all } from 'redux-saga/effects';

import { fetchSpeakersWatcher } from '../state/speakers/sagas';
import { fetchSessionsWatcher } from '../state/sessions/sagas';
import { fetchScheduleWatcher } from '../state/schedule/sagas';

const saga = createSagaMiddleware();

function* rootSaga() {
  yield all([
      call(fetchSessionsWatcher),
      call(fetchSpeakersWatcher),
      call(fetchScheduleWatcher)
  ]);
}

export function startWatchers() {
  saga.run(rootSaga);
}

export default saga;
