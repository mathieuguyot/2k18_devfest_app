import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import saga, { startWatchers } from './middlewares/saga';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import speakers from './state/speakers';
import sessions from './state/sessions';
import schedule from './state/schedule';

const middlewares = [saga];

export default function(state = {}) {
    const speakersPersistConfig = {
        key: 'speakers',
        storage: storage
    };

    const sessionsPersistConfig = {
        key: 'sessions',
        storage: storage
    };

    const schedulePersistConfig = {
        key: 'schedule',
        storage: storage
    };

    const persistedReducer  = combineReducers({
        speakers: persistReducer(speakersPersistConfig, speakers),
        sessions: persistReducer(sessionsPersistConfig, sessions),
        schedule: persistReducer(schedulePersistConfig, schedule),
    });

    const store = createStore(
        persistedReducer,
        state,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    
    // Start saga watchers
    startWatchers();

    let persistor = persistStore(store);
    return { store, persistor };
}