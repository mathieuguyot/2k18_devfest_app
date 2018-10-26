// Model that represents a TimeSlot
export default class TimeSlot {
  constructor(startTime, endTime, sessionIds) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.sessionIds = sessionIds.map(
      fuckingSingleElementArray => fuckingSingleElementArray[0]
    );
  }
}
