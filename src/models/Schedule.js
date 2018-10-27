import TimeSlot from './TimeSlot';
import ScheduleDay from './ScheduleDay';

// Immutable container of timeSlots
export default class Schedule {
  // This constructor may fail regarding of the json data provided
  // Catch any construction of a new time slot container
  constructor(scheduleJsonData) {
    this.days = scheduleJsonData.map(
      d => new ScheduleDay(d.date, d.dateReadable, d.tracks, d.timeslots)
    );
  }
}
