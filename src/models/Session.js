export default class Session {

    constructor(sessionJsonData) {
        this.sessionId = sessionJsonData.id;
        this.short_title = sessionJsonData.titleMobile;
        this.full_title = sessionJsonData.title;
        this.sessionImagePath = sessionJsonData.image;
        this.tags = sessionJsonData.tags;
        this.description = sessionJsonData.description;
        this.sessionType = sessionJsonData.type;
        this.category = sessionJsonData.category;
        this.language = sessionJsonData.language;
        this.complexity = sessionJsonData.complexity;
        this.place = sessionJsonData.track.place;
    }

}