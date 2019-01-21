import defaultState from '../defaultState';

import { State, Schema, Employee, EntityCollection } from '../types';

interface DbEmployee extends Employee {
    password: string;
}

interface Database extends Schema {
    employees: EntityCollection<DbEmployee>;
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
        allIds: [1]
    },
    roles: defaultState.roles,
    shifts: defaultState.shifts,
    scheduledShifts: defaultState.scheduledShifts,
    scheduleWeeks: defaultState.scheduleWeeks,
    availabilities: defaultState.availabilities,
    timeOffRequests: defaultState.timeOffRequests,
    shiftSwapRequests: defaultState.shiftSwapRequests,
    availabilityChangeRequests: defaultState.availabilityChangeRequests,
    events: defaultState.events,
    notifications: defaultState.notifications,
};

export const updateDbFromStoreState = (state: State) => {
    database.app = { ...state.app };


    let employees = {};
    Object.values(state.employees.byId).forEach((employee) => {
        employees[employee.id] = {
            ...employee,
            password: 'bananas'
        };
    });
    database.employees = {
        byId: employees,
        allIds: [ ...state.employees.allIds ]
    };

    database.roles = { ...state.roles };
    database.shifts = { ...state.shifts };
    database.scheduledShifts = { ...state.scheduledShifts };
    database.scheduleWeeks = { ...state.scheduleWeeks };
    database.availabilities = { ...state.availabilities };
    database.timeOffRequests = { ...state.timeOffRequests };
    database.shiftSwapRequests = { ...state.shiftSwapRequests };
    database.availabilityChangeRequests = { ...state.availabilityChangeRequests };
    database.events = { ...state.events };
    database.notifications = { ...state.notifications };
};

export default database;