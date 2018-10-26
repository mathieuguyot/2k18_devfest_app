import TimeSlot from './TimeSlot';

// Model that represents a TimeSlot
export default class ScheduleDay {
  constructor(date, readableDate, tracks, timeslots) {
    this.date = date;
    this.readableDate = readableDate;
    this.tracks = tracks;
    this.timeslots = timeslots.map(
      t => new TimeSlot(t.startTime, t.endTime, t.sessions)
    );
  }
}
