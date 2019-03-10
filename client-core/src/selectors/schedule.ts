import {ScheduledShift, Shift, State, UIScheduleShift, UIScheduleWeek} from "../types";
import { fullName } from '../utils/employee';
import {calcShiftTimestamps} from "../utils/shifts";

export const scheduledShiftsFromIds = (state: State, scheduledShiftIds) =>
    scheduledShiftIds.map(id => state.scheduledShifts.byId[id]);

export const shiftsFromIds = (state: State, shiftIds) =>
    shiftIds.map(id => state.shifts.byId[id]);

export const UIScheduledShiftFromId = (state: State, scheduledShiftId: number): UIScheduleShift => {
    const shift = state.scheduledShifts.byId[scheduledShiftId];

    return {
        ...shift,
        employeeName: state.employees.byId.hasOwnProperty(shift.employeeId) ?
            fullName(state.employees.byId[shift.employeeId]) : '[Invalid Employee]'
    };
};

export const UIScheduledShiftFromBaseId = (state: State, weekId: number|null, shiftId: number): UIScheduleShift => {
    const shift = state.shifts.byId[shiftId];

    const timestamps = weekId ?
        calcShiftTimestamps(state.scheduleWeeks.byId[weekId].startTimestamp, shift.day, shift.startHour, shift.endHour)
        :
        null;

    return {
        ...shift,
        weekId: weekId,
        baseShiftId: shift.id,
        employeeId: null,
        employeeName: null,
        startTimestamp: timestamps ? timestamps.start : null,
        endTimestamp: timestamps ? timestamps.end : null,
    };
};

export const employeeShiftsByWeek = (state: State, employeeId: number, weekId: number): ScheduledShift[] =>
    state.scheduledShifts.allIds
        .filter(id => {
            let shift = state.scheduledShifts.byId[id];

            return shift.employeeId === employeeId && shift.weekId === weekId;
        })
        .map(id => state.scheduledShifts.byId[id]);