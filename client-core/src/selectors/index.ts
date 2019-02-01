import {State, Shift, UIScheduleWeek, UIScheduleShift} from '../types';

import {
    userLoggedIn,
    userIsManager
} from './user';

import {
    currentScheduleWeek
} from './schedule';

export const employeeArray = (state: State) => (
    state.employees.allIds.map(id => state.employees.byId[id])
);

export {
    userLoggedIn,
    userIsManager,
    currentScheduleWeek
}