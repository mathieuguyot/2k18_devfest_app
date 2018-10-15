import reducer from './state/reducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import saga, { startWatchers } from './middlewares/saga';

const middlewares = [saga];

export default function(state = {}) {
    const store = createStore(
        reducer,
        state,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    // Start saga watchers
    startWatchers();

    return store;
}