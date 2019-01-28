import { State, Shift } from '../types';

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


export {
    userLoggedIn,
    userIsManager
}