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

    // To fix this fucking weird api
    if (this.speakerPhotoPath && this.speakerPhotoPath[0] !== '/') {
      this.speakerPhotoPath = `/${this.speakerPhotoPath}`;
    }
    if (this.companyPhotoPath && this.companyPhotoPath[0] !== '/') {
      this.companyPhotoPath = `/${this.companyPhotoPath}`;
    }
  }
}
