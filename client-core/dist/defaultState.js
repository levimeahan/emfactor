import { ROLE_EMPLOYEE } from "./roles";
var defaultState = {
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
                roles: [ROLE_EMPLOYEE]
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
