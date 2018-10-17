// Model that represents a speaker
export default class Speaker {
    
    constructor(speakerJsonData) {
        this.speakerId = speakerJsonData.id;
        this.name = speakerJsonData.name;
        this.company = speakerJsonData.company;
        this.companyPhotoPath = speakerJsonData.companyLogo;
        this.country = speakerJsonData.country;
        this.speakerPhotoPath = speakerJsonData.photoUrl;
        this.bio = speakerJsonData.bio;
    }

}