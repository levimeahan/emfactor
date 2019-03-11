import {ScheduledShift, State, UIScheduleShift, UIScheduleWeek} from "../types";
import {UIMergedDraftShift, UIScheduledShiftFromBaseId, UIScheduledShiftFromId} from "./schedule";

import { spreadShiftsToDays } from "../utils/shifts";
import {inRange} from "../utils/number";
import {formatDate, formatMonth, formatWeekday, getWeekStartTime} from "../utils/time";

const weekScheduledShiftIds = (state: State, weekId: number): number[] => (
    state.scheduledShifts.allIds.filter(
        id => state.scheduledShifts.byId[id].weekId === weekId
    )
);

const transformShiftsToWeek = (shifts: UIScheduleShift[], weekId, startTimestamp, draft): UIScheduleWeek => {
    let shiftsByDay = spreadShiftsToDays(shifts);

    const day = (num) => {
        let time = startTimestamp + ((num - 1) * 86400000);

        return {
            weekday: formatWeekday(time),
            month: formatMonth(time, 'short'),
            date: formatDate(time),
            shifts: shiftsByDay[num]
        }
    };

    return {
        id: weekId,
        draft: draft,
        startTimestamp: startTimestamp,
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

const getUIScheduleWeek = (state: State, weekId: number): UIScheduleWeek => {
    let scheduleWeek = state.scheduleWeeks.byId[weekId];

    const shifts = scheduleWeek.draft ?
        getDraftWeekShifts(state, weekId) : getFinalizedWeekShifts(state, weekId);

    return transformShiftsToWeek(shifts, scheduleWeek.id, scheduleWeek.startTimestamp, scheduleWeek.draft);
};

const getDraftWeekShifts = (state, weekId): UIScheduleShift[] => {
    let scheduledShiftIndex = new Map();

    weekScheduledShiftIds(state, weekId).forEach(id => {
        let shift = state.scheduledShifts.byId[id];
        scheduledShiftIndex.set(shift.baseShiftId, shift.id);
    });

    return state.shifts.allIds.map(id => {
        let shift = UIScheduledShiftFromBaseId(state, weekId, id);

        if(scheduledShiftIndex.has(id)) {
            shift = UIMergedDraftShift(state, shift, state.scheduledShifts.byId[scheduledShiftIndex.get(id)]);
        }

        return shift;
    });
};

const getFinalizedWeekShifts = (state, weekId): UIScheduleShift[] =>
    weekScheduledShiftIds(state, weekId)
        .map(id => UIScheduledShiftFromId(state, id));

/*** SELECTORS ***/

export const allShiftsWeek = (state: State): UIScheduleWeek|null => {
    let shifts = state.shifts.allIds.map(id => UIScheduledShiftFromBaseId(state, 0, id));

    return transformShiftsToWeek(shifts, 0, 0, null);
};

export const scheduleWeekByStartTime = (state: State, startTime: number): UIScheduleWeek|null => {
    let newestWeekId = 0, newestWeekTime = 0;
    let currentWeekId = state.scheduleWeeks.allIds.find((id) => {
        let week = state.scheduleWeeks.byId[id];
        if(week.startTimestamp > newestWeekTime) {
            newestWeekId = id;
        }

        return week.startTimestamp === startTime;
    });

    if(!newestWeekId) {
        return null;
    }

    if(!currentWeekId) {
        currentWeekId = newestWeekId;
    }

    return getUIScheduleWeek(state, currentWeekId);
};

export const scheduleWeekIdsInRange = (state: State, startTime: number, endTime: number = null): number[] => {
    let firstWeekStart = getWeekStartTime(startTime);
    let lastWeekStart = endTime ? getWeekStartTime(endTime) : null;

    const filterFn = endTime ?
        id => inRange(state.scheduleWeeks.byId[id].startTimestamp, firstWeekStart, lastWeekStart)
        :
        id => state.scheduleWeeks.byId[id].startTimestamp >= firstWeekStart;

    return state.scheduleWeeks.allIds.filter(filterFn);
};

export const scheduleWeekRange = (state: State, startTime: number, endTime: number = null): UIScheduleWeek[] => {
    return scheduleWeekIdsInRange(state, startTime, endTime)
        .map(id => getUIScheduleWeek(state, id));
};

export const currentScheduleWeek = (state: State): UIScheduleWeek|null => {
    let currentWeekTime = getWeekStartTime();

    return scheduleWeekByStartTime(state, currentWeekTime);
};

// All weeks beyond current week
export const futureScheduleWeeks = (state: State): UIScheduleWeek[] => {
    let nextWeekStart = getWeekStartTime() + (7 * 86400000);

    return scheduleWeekRange(state, nextWeekStart);
};

// App-relevant filters
export const assignableScheduleWeeks = (state: State): UIScheduleWeek[] => scheduleWeekRange(state, getWeekStartTime());

export const viewableScheduleWeeks = (state: State): UIScheduleWeek[] =>
    scheduleWeekIdsInRange(state, getWeekStartTime())
        .filter(id => state.scheduleWeeks.byId[id].draft === false)
        .map(id => getUIScheduleWeek(state, id));