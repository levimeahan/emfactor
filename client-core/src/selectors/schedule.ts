import {EntityCollection, ScheduledShift, ScheduleWeek, State, UIScheduleShift, UIScheduleWeek} from "../types";
import {currentWeekStartTime, formatDate, formatMonth, formatWeekday} from "../utils/time";
import { fullName } from '../utils/employee';

/*** UTILS ***/

const spreadShiftsToDays = (shifts: UIScheduleShift[]) => {
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

const getUIScheduleShifts = (state: State, scheduledShiftIds: number[]) => {
    let shiftIdIndex = new Map();

    let uiScheduleShifts: UIScheduleShift[] = state.shifts.allIds.map((id, i) => {
        shiftIdIndex.set(id, i);

        return <UIScheduleShift>{
            ...state.shifts.byId[id],
            employeeId: null,
            employeeName: null,
        };
    });

    scheduledShiftIds.forEach((scheduledShiftId) => {
        let scheduledShift = state.scheduledShifts.byId[scheduledShiftId];

        let shiftKey = shiftIdIndex.get(scheduledShift.shiftId);
        if(shiftKey === undefined) {
            return;
        }

        uiScheduleShifts[shiftKey].employeeId = scheduledShift.employeeId;

        if(state.employees.byId.hasOwnProperty(scheduledShift.employeeId)) {
            uiScheduleShifts[shiftKey].employeeName = fullName(state.employees.byId[scheduledShift.employeeId]);
        }
    });

    return uiScheduleShifts;
};


const weekScheduledShiftIds = (state: State, weekId: number): number[] => (
    state.scheduledShifts.allIds.filter(
        id => state.scheduledShifts.byId[id].scheduleWeek === weekId
    )
);

const getUIScheduleWeek = (state: State, weekId: number): UIScheduleWeek => {
    let shifts = getUIScheduleShifts(state, weekScheduledShiftIds(state, weekId));
    let shiftsByDay = spreadShiftsToDays(shifts);

    let scheduleWeek = state.scheduleWeeks.byId[weekId];

    const day = (num) => {
        let time = scheduleWeek.startTimestamp + ((num - 1) * 86400000);

        return {
            weekday: formatWeekday(time),
            month: formatMonth(time, 'short'),
            date: formatDate(time),
            shifts: shiftsByDay[num]
        }
    };

    return {
        id: scheduleWeek.id,
        draft: scheduleWeek.draft,
        startTimestamp: scheduleWeek.startTimestamp,
        days: {
            1: day(1),
            2: day(2),
            3: day(3),
            4: day(4),
            5: day(5),
            6: day(6),
            7: day(7),
        },
        dayIds: [1, 2, 3, 4, 5, 6, 7]
    };
};

/*** SELECTORS ***/

export const currentScheduleWeek = (state: State): UIScheduleWeek|null => {
    let currentWeekTime = currentWeekStartTime();

    let newestWeekId = 0, newestWeekTime = 0;
    let currentWeekId = state.scheduleWeeks.allIds.find((id) => {
        let week = state.scheduleWeeks.byId[id];
        if(week.startTimestamp > newestWeekTime) {
            newestWeekId = id;
        }

        return week.startTimestamp === currentWeekTime;
    });

    if(!newestWeekId) {
        return null;
    }

    if(!currentWeekId) {
        currentWeekId = newestWeekId;
    }

    return getUIScheduleWeek(state, currentWeekId);
};

export const futureScheduleWeeks = (state: State): UIScheduleWeek[] => {
    let nextWeekStart = currentWeekStartTime() + (7 * 86400000);

    return state.scheduleWeeks.allIds
        .filter(id => state.scheduleWeeks.byId[id].startTimestamp >= nextWeekStart)
        .map(id => getUIScheduleWeek(state, id));
};

export const currentAndFutureScheduleWeeks = (state: State): UIScheduleWeek[] => (
    [currentScheduleWeek(state), ...futureScheduleWeeks(state)]
);
