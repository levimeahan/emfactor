import {UIScheduleShift} from "../types";

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