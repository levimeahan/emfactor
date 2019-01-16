"use strict";
exports.__esModule = true;
var roles_1 = require("./roles");
var defaultState = {
    app: {
        userEmployeeId: 1,
        errorMessage: ''
    },
    employees: {
        byId: {
            1: {
                id: 1,
                firstName: 'Levi',
                lastName: 'Meahan',
                roles: [roles_1.ROLE_EMPLOYEE]
            }
        },
        allIds: [1]
    },
    roles: {
        byId: {
            1: {
                id: 1,
                name: 'Employee',
                subRoles: []
            }
        },
        allIds: [1]
    },
    shifts: {
        byId: {},
        allIds: []
    },
    scheduledShifts: {
        byId: {},
        allIds: []
    },
    availabilities: {
        byId: {},
        allIds: []
    },
    timeOffRequests: {
        byId: {},
        allIds: []
    },
    shiftSwapRequests: {
        byId: {},
        allIds: []
    },
    availabilityChangeRequests: {
        byId: {},
        allIds: []
    },
    events: {
        byId: {},
        allIds: []
    },
    notifications: {
        byId: {},
        allIds: []
    }
};
exports["default"] = defaultState;
