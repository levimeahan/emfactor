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
                startHour: 0,
                endHour: 8,
                name: 'Sunrise / Reg 1',
                roleId: 1,
            },
            2: {
                id: 2,
                day: 1,
                startHour: 0,
                endHour: 8,
                name: 'Sunrise / Reg 2',
                roleId: 1,
            },

            3: {
                id: 3,
                day: 1,
                startHour: 8,
                endHour: 16,
                name: 'Day / Reg 1',
                roleId: 1,
            },
            4: {
                id: 4,
                day: 1,
                startHour: 8,
                endHour: 16,
                name: 'Day / Reg 2',
                roleId: 1,
            },


            5: {
                id: 5,
                day: 3,
                startHour: 16,
                endHour: 24,
                name: 'Swing / Reg 1',
                roleId: 1,
            },
            6: {
                id: 6,
                day: 4,
                startHour: 16,
                endHour: 24,
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
                draft: true,
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