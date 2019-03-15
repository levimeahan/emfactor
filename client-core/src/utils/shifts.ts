import {UIScheduleShift} from "../types";
import moment from 'moment';

export const spreadShiftsToDays = (shifts: UIScheduleShift[]) => {
    let shiftsByDay = {
        1: <UIScheduleShift[]>[],
        2: <UIScheduleShift[]>[],
        3: <UIScheduleShift[]>[],
        4: <UIScheduleShift[]>[],
        5: <UIScheduleShift[]>[],
        6: <UIScheduleShift[]>[],
        7: <UIScheduleShift[]>[],
    };

    shifts.forEach((shift) => {
        shiftsByDay[shift.day].push(shift)
    });

    return shiftsByDay;
};

export const calcShiftTimestamps = (weekStartTimestamp, day, startHour, endHour) => ({
    start: shiftStartTime(weekStartTimestamp, day, startHour),
    end: shiftEndTime(weekStartTimestamp, day, endHour),
});

export const shiftStartTime = (weekStartTimestamp, day, startHour) =>
    moment(weekStartTimestamp)
        .add({ days: day - 1, hours: startHour })
        .valueOf();

export const shiftEndTime = (weekStartTimestamp, day, endHour) =>
    moment(weekStartTimestamp)
        .add({ days: day - 1, hours: endHour - 1, minutes: 59 })
        .valueOf();


