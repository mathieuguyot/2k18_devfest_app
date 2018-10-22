import TimeSlot from "./TimeSlot";

// Immutable container of timeSlots
export default class TimeSlotContainer {

    // This constructor may fail regarding of the json data provided
    // Catch any construction of a new time slot container
    constructor(timeSlotsJsonData) {
        this._timeSlotMap = new Map();
        // First, iterate on each day
        for(let dayKey in timeSlotsJsonData) {
            let dayData = timeSlotsJsonData[dayKey];
            let day = dayData.date;
            let timeSlots = dayData.timeslots;
            // Then, iterate on each time slot of the day
            for(let timeSlotKey in timeSlots) {
                let sessions = timeSlots[timeSlotKey].sessions;
                let startTime = timeSlots[timeSlotKey].startTime;
                let endTime = timeSlots[timeSlotKey].endTime;
                //Finally, iterate on each session of the timeslot
                for(let sessionId of sessions) {
                    let hour = timeSlots[timeSlotKey].startTime
                    this._timeSlotMap.set(
                        String(sessionId), 
                        new TimeSlot(day, startTime, endTime)
                    );
                }
            }
        }
    }

    getTimeSlot(sessionId) {
        return this._timeSlotMap.get(String(sessionId));
    }
    
}