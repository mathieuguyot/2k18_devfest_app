import Session from "./Session";

// Immutable container of sessions
export default class SessionContainer {

    // This constructor may fail regarding of the json data provided
    // Catch any construction of a new session container
    constructor(sessionsJsonData) {
        this._sessionsMap = new Map();
        for(let key in sessionsJsonData) {
            this._sessionsMap.set(
                String(key),
                new Session(sessionsJsonData[key])
            );
        }
    }

    getSessionsKeys() {
        return Array.from(this._sessionsMap.keys());
    }

    getSession(key) {
        return this._sessionsMap.get(String(key));
    }

}
