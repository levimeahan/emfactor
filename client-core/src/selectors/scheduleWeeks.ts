import {State, UIScheduleWeek} from "../types";
import { getUIScheduleShifts } from "./schedule";

import { spreadShiftsToDays } from "../utils/shifts";
import {inRange} from "../utils/number";
import {formatDate, formatMonth, formatWeekday, getWeekStartTime} from "../utils/time";

const weekScheduledShiftIds = (state: State, weekId: number): number[] => (
    state.scheduledShifts.allIds.filter(
        id => state.scheduledShifts.byId[id].weekId === weekId
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

export const scheduleWeekRange = (state: State, startTime: number, endTime: number = null): UIScheduleWeek[] => {
    let firstWeekStart = getWeekStartTime(startTime);
    let lastWeekStart = endTime ? getWeekStartTime(endTime) : null;

    const filterFn = endTime ?
        id => inRange(state.scheduleWeeks.byId[id].startTimestamp, firstWeekStart, lastWeekStart)
        :
        id => state.scheduleWeeks.byId[id].startTimestamp >= firstWeekStart;

    return state.scheduleWeeks.allIds
        .filter(filterFn)
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

export const currentAndFutureScheduleWeeks = (state: State): UIScheduleWeek[] => (
    [currentScheduleWeek(state), ...futureScheduleWeeks(state)]
);