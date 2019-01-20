import {ROLE_EMPLOYEE, ROLE_MANAGER} from "./roles";
import { State } from './types';

const defaultState: State = {
    app: {
        userEmployeeId: 1,
        errorMessage: '',
    },
    employees: {
        byId: {
            1: {
                id: 1,
                firstName: 'Levi',
                lastName: 'Meahan',
                roles: [ROLE_EMPLOYEE, ROLE_MANAGER]
            },
        },
        allIds: [1],
    },
    roles: {
        byId: {
            1: {
                id: 1,
                name: 'Employee',
                subRoles: []
            }
        },
        allIds: [1],
    },
    shifts: {
        byId: {},
        allIds: [],
    },
    scheduledShifts: {
        byId: {},
        allIds: [],
    },
    scheduleWeeks: {
        byId: {},
        allIds: [],
    },
    availabilities: {
        byId: {},
        allIds: [],
    },
    timeOffRequests: {
        byId: {},
        allIds: [],
    },
    shiftSwapRequests: {
        byId: {},
        allIds: [],
    },
    availabilityChangeRequests: {
        byId: {},
        allIds: [],
    },
    events: {
        byId: {},
        allIds: [],
    },
    notifications: {
        byId: {},
        allIds: [],
    }
};

export default defaultState;