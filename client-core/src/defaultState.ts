import moment from 'moment';

import {Permissions, State} from './types';

import { getWeekStartTime } from './utils/time';
import { shiftStartTime, shiftEndTime } from './utils/shifts';

import {permissions} from "./config";

const weekStartTime = getWeekStartTime();

const defaultState: State = {
    app: {
        userEmployeeId: 1,
        errorMessage: '',
    },
    employees: {
        byId: {
            1: {
                id: 1,
                firstName: "Levi",
                lastName: "Meahan",
                availability: {
                    mon: "000000001111111100000000",
                    tue: "000000001111111100000000",
                    wed: "000000001111111100000000",
                    thu: "000000001111111100000000",
                    fri: "000000001111111100000000",
                    sat: "00000000000000000000000",
                    sun: "00000000000000000000000"
                },
                roles: [1, 2]
            },
            2: {
                id: 2,
                firstName: "Isaac",
                lastName: "Asimov",
                availability: {
                    mon: "000000001111111100000000",
                    tue: "000000001111111100000000",
                    wed: "000000001111111100000000",
                    thu: "000000001111111100000000",
                    fri: "000000001111111100000000",
                    sat: "000000001111111100000000",
                    sun: "000000001111111100000000"
                },
                roles: [1]
            },
            3: {
                id: 3,
                firstName: "Ada",
                lastName: "Lovelace",
                availability: {
                    mon: "000000000000000011111111",
                    tue: "000000000000000011111111",
                    wed: "000000000000000011111111",
                    thu: "000000000000000011111111",
                    fri: "000000000000000011111111",
                    sat: "000000000000000011111111",
                    sun: "000000000000000011111111"
                },
                roles: [1, 2]
            }
        },
        allIds: [1, 2, 3]
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
                startHour: 8,
                endHour: 16,
                name: "Day / Cashier 2",
                roleId: 1
            },
            2: {id: 2, day: 1, startHour: 8, endHour: 16, name: "Day / Cashier 1", roleId: 0},
            3: {id: 3, day: 1, startHour: 16, endHour: 24, name: "Evening / Cashier", roleId: 1},
            4: {id: 4, day: 2, startHour: 8, endHour: 16, name: "Day / Cashier", roleId: 1}
        },
        allIds: [1, 2, 3, 4]
    },
    scheduledShifts: {
        byId: {
            1: {
                id: 1,
                baseShiftId: 2,
                employeeId: 1,
                weekId: 1,
                day: 1,
                name: "Day / Cashier 1",
                startHour: 8,
                endHour: 16,
                startTimestamp: shiftStartTime(weekStartTime, 1, 8),
                endTimestamp: shiftEndTime(weekStartTime, 1, 16),
                roleId: 0
            },
            2: {
                id: 2,
                baseShiftId: 1,
                employeeId: 2,
                weekId: 1,
                day: 1,
                name: "Day / Cashier 2",
                startHour: 8,
                endHour: 16,
                startTimestamp: shiftStartTime(weekStartTime, 1, 8),
                endTimestamp: shiftEndTime(weekStartTime, 1, 16),
                roleId: 1
            },
            3: {
                id: 3,
                baseShiftId: 4,
                employeeId: 1,
                weekId: 1,
                day: 2,
                name: "Day / Cashier",
                startHour: 8,
                endHour: 16,
                startTimestamp: shiftStartTime(weekStartTime, 2, 8),
                endTimestamp: shiftEndTime(weekStartTime, 2, 16),
                roleId: 1
            },
            4: {
                id: 4,
                baseShiftId: 3,
                employeeId: 3,
                weekId: 1,
                day: 1,
                name: "Evening / Cashier",
                startHour: 16,
                endHour: 24,
                startTimestamp: shiftStartTime(weekStartTime, 1, 16),
                endTimestamp: shiftEndTime(weekStartTime, 1, 24),
                roleId: 1
            }
        }, 
        allIds: [1, 2, 3, 4]
    },
    scheduleWeeks: {
        byId: {
            1: {
                id: 1,
                draft: false,
                startTimestamp: weekStartTime,
            },
            2: {
                id: 2,
                draft: true,
                startTimestamp: moment(weekStartTime).add({ days: 7 }).valueOf(),
            },
        },
        allIds: [1, 2],
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
                content: 'Make sure to make eye contact and greet every customer who enters the store. Be cautious of anyone' +
                'who avoids eye contact, especially if they are wearing clothing that obscures part or all of their ' +
                'head/face. Mentally note a description of the person, approximately what age/height/weight are they, what' +
                'clothes are they wearing, any distinguishing features? When there are no customers at the register, ' +
                'move to the sales floor and put yourself in a ' +
                'position where you can see a potential shoplifter - They often will be deterred from stealing anything ' +
                'if they know they are being watched. In the event a shoplifter does take an item and proceed for the ' +
                'store exit, do NOT try to stop them. Make sure you remember a good description of them and what they took,' +
                'then write it down along with the time the incident occurred, and leave it in the document drawer of ' +
                'your shift for a manager to review. Inform the next manager on duty of the incident.'
            },
            2: {
                id: 2,
                name: 'Refunds',
                content: 'Refunds are only allowed for undamaged and unopened items with receipt. Perishable ' +
                'Food/drink items are nonrefundable.',
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
                roles: [1],
            },
        },
        allIds: [1],
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