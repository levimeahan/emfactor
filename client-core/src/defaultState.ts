import { State } from './types';

const eightToSixteen = '0'.repeat(8) + '1'.repeat(8) + '0'.repeat(8);
const notAvailable = '0'.repeat(23);

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
                availability: {
                    mon: eightToSixteen,
                    tue: eightToSixteen,
                    wed: eightToSixteen,
                    thu: eightToSixteen,
                    fri: eightToSixteen,
                    sat: notAvailable,
                    sun: notAvailable,
                },
                roles: [1, 2]
            },
        },
        allIds: [1],
    },
    roles: {
        byId: {
            1: {
                id: 1,
                name: 'Employee',
                permissions: [],
                subRoles: []
            },
            2: {
                id: 2,
                name: 'Manager',
                permissions: ['employees', 'schedule'],
                subRoles: [1],
            },
        },
        allIds: [1, 2],
    },
    shifts: {
        byId: {
            1: {
                id: 1,
                day: 1,
                startTime: 0,
                endTime: 8,
                name: 'Sunrise / Reg 1',
                allowedRoles: [1],
            },
            2: {
                id: 2,
                day: 1,
                startTime: 0,
                endTime: 8,
                name: 'Sunrise / Reg 2',
                allowedRoles: [1],
            },

            3: {
                id: 3,
                day: 1,
                startTime: 8,
                endTime: 16,
                name: 'Day / Reg 1',
                allowedRoles: [1],
            },
            4: {
                id: 4,
                day: 1,
                startTime: 8,
                endTime: 16,
                name: 'Day / Reg 2',
                allowedRoles: [1],
            },


            5: {
                id: 5,
                day: 3,
                startTime: 16,
                endTime: 24,
                name: 'Swing / Reg 1',
                allowedRoles: [1],
            },
            6: {
                id: 6,
                day: 4,
                startTime: 16,
                endTime: 24,
                name: 'Swing / Reg 2',
                allowedRoles: [1],
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
    timeOffRequests: {
        byId: {},
        allIds: [],
    },
    shiftSwapRequests: {
        byId: {},
        allIds: [],
    },
    policies: {
        byId: {},
        allIds: [],
    },
    guides: {
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