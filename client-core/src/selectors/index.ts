import {State, Shift, UIScheduleWeek} from '../types';

import {
    userLoggedIn,
    userIsManager
} from './user';

export const employeeArray = (state: State) => (
    state.employees.allIds.map(id => state.employees.byId[id])
);

export const shiftsByDay = (state: State) => {
    let shiftsByDay = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    };

    Object.values(state.shifts.byId).forEach((shift: Shift) => {
        shiftsByDay[shift.day].push(shift)
    });

    return shiftsByDay;
};

export const currentSchedule = (state: State): UIScheduleWeek => {
    let shifts = shiftsByDay(state);

    return {
        id: 1,
        draft: false,
        startTimestamp: 0,
        days: {
            1: {
                name: 'Monday',
                date: 'Feb 4',
                shifts: shifts[1],
            },
            2: {
                name: 'Tuesday',
                date: 'Feb 5',
                shifts: shifts[2],
            },
            3: {
                name: 'Wednesday',
                date: 'Feb 6',
                shifts: shifts[3],
            },
            4: {
                name: 'Thursday',
                date: 'Feb 7',
                shifts: shifts[4],
            },
            5: {
                name: 'Friday',
                date: 'Feb 8',
                shifts: shifts[5],
            },
            6: {
                name: 'Saturday',
                date: 'Feb 9',
                shifts: shifts[6],
            },
            7: {
                name: 'Sunday',
                date: 'Feb 10',
                shifts: shifts[7],
            },
        },
        dayIds: [1, 2, 3, 4, 5, 6, 7]
    };
};


export {
    userLoggedIn,
    userIsManager
}