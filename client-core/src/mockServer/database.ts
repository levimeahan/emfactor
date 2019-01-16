import defaultState from '../defaultState';

import { State, Employee } from '../types';

interface DbEmployee extends Employee {
    password: string;
}

interface Database extends State {
    employees: {
        byId: {
            [key: number]: DbEmployee
        },
        allIds: number[],
    },
}


const database: Database = {
    app: defaultState.app,
    employees: {
        byId: {
            1: {
                ...defaultState.employees.byId[1],
                password: 'bananas',
            }
        },
        allIds: []
    },
    roles: defaultState.roles,
    shifts: defaultState.shifts,
    scheduledShifts: defaultState.scheduledShifts,
    availabilities: defaultState.availabilities,
    timeOffRequests: defaultState.timeOffRequests,
    shiftSwapRequests: defaultState.shiftSwapRequests,
    availabilityChangeRequests: defaultState.availabilityChangeRequests,
    events: defaultState.events,
    notifications: defaultState.notifications,
};

export default database;