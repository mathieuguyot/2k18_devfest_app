import { combineReducers } from 'redux';

import speakers from './speakers';
import sessions from './sessions';

const reducer = combineReducers({
    speakers,
    sessions
});

export default reducer;
