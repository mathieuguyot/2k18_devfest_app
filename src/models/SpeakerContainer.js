import Speaker from "./Speaker";

// Immutable container of speakers
export default class SpeakerContainer {

    // This constructor may fail regarding of the json data provided
    // Catch any construction of a new speaker container
    constructor(speakersJsonData) {
        this._speakersMap = new Map();
        for(let key in speakersJsonData) {
            this._speakersMap.set(
                String(key), 
                new Speaker(speakersJsonData[key])
            );
        }
    }

    getSpeakersKeys() {
        return Array.from(this._speakersMap.keys()); 
    }

    getSpeaker(key) {
        return this._speakersMap.get(String(key));
    }

}