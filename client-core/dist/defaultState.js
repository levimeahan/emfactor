import { ROLE_EMPLOYEE, ROLE_MANAGER } from "./roles";
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
        byId: {
            1: {
                id: 1,
                day: 1,
                startTime: 0,
                endTime: 8,
                name: 'Sunrise / Reg 1',
                allowedRoles: [],
            },
            2: {
                id: 2,
                day: 1,
                startTime: 0,
                endTime: 8,
                name: 'Sunrise / Reg 2',
                allowedRoles: [],
            },
            3: {
                id: 3,
                day: 1,
                startTime: 8,
                endTime: 16,
                name: 'Day / Reg 1',
                allowedRoles: [],
            },
            4: {
                id: 4,
                day: 1,
                startTime: 8,
                endTime: 16,
                name: 'Day / Reg 2',
                allowedRoles: [],
            },
            5: {
                id: 5,
                day: 3,
                startTime: 16,
                endTime: 24,
                name: 'Swing / Reg 1',
                allowedRoles: [],
            },
            6: {
                id: 6,
                day: 4,
                startTime: 16,
                endTime: 24,
                name: 'Swing / Reg 2',
                allowedRoles: [],
            }
        },
        allIds: [1, 2, 3, 4, 5, 6],
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
