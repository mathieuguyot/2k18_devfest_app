import createSagaMiddleware from 'redux-saga';

import { fetchSpeakersWatcher } from '../state/speakers/sagas';

const saga = createSagaMiddleware();

export function startWatchers() {
  saga.run(fetchSpeakersWatcher);
}

export default saga;
