import { combineReducers } from 'redux';

import speakers from './speakers';
import sessions from './sessions';
import schedule from './schedule';

const reducer = combineReducers({
    speakers,
    sessions,
    schedule,
});

export default reducer;
