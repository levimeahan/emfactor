import {Permissions, Role, State} from './types';

import { getWeekStartTime } from './utils/time';

import { permissions } from "./config";

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
                permissions: Object.keys(permissions) as (keyof Permissions)[],
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
                roleId: 1,
            },
            2: {
                id: 2,
                day: 1,
                startTime: 0,
                endTime: 8,
                name: 'Sunrise / Reg 2',
                roleId: 1,
            },

            3: {
                id: 3,
                day: 1,
                startTime: 8,
                endTime: 16,
                name: 'Day / Reg 1',
                roleId: 1,
            },
            4: {
                id: 4,
                day: 1,
                startTime: 8,
                endTime: 16,
                name: 'Day / Reg 2',
                roleId: 1,
            },


            5: {
                id: 5,
                day: 3,
                startTime: 16,
                endTime: 24,
                name: 'Swing / Reg 1',
                roleId: 1,
            },
            6: {
                id: 6,
                day: 4,
                startTime: 16,
                endTime: 24,
                name: 'Swing / Reg 2',
                roleId: 1,
            }
        },
        allIds: [1, 2, 3, 4, 5, 6],
    },
    scheduledShifts: {
        byId: {},
        allIds: [],
    },
    scheduleWeeks: {
        byId: {
            1: {
                id: 1,
                draft: false,
                startTimestamp: getWeekStartTime(),
            },
        },
        allIds: [1],
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
        byId: {
            1: {
                id: 1,
                name: 'Shoplifting',
                content: 'not allowed LOL what did you expect',
            },

            2: {
                id: 2,
                name: 'Refunds',
                content: 'Refunds are only allowed for undamaged items with receipt. Food/drink are nonrefundable.',
            },
        },
        allIds: [1, 2],
    },
    guides: {
        byId: {
            1: {
                id: 1,
                name: 'Cleaning Roller Grill',
                content: "Clean grills one at a time - move food items to the other grill so they are still available" +
                " for purchase. After moving food items, turn grill off and remove plastic food name rollers and " +
                "metal dividers. \r\n\r\n" +
                "Cleaning the dividers: Scrape any hardened material off with flat metal edge of grill brush, then " +
                "apply Super San to a folded Wipe-all and thoroughly wipe down the metal divider. Place dividers to " +
                "the side and proceed to cleaning grill itself.\r\n\r\n" +
                "Cleaning the grill: Acquire a plastic dish scrubber/sponge, wet it and apply soap. Scrub grill " +
                "thoroughly until covered with soap and debris is removed. Acquire a clean wet rag and wipe grill down" +
                "until all soap residue is gone. Turn grill back on, place plastic food name rollers, and then place" +
                "metal dividers using plastic name rollers as a size guide.",
                roles: [ 1 ],
            },
        },
        allIds: [ 1 ],
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