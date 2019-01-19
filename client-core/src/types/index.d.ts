/* SERVER ENTITY TYPES */
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    roles: number[];
}

export interface Role {
    id: number;
    name: string;
    subRoles: number[];
}

declare enum Day {
    Mon = 1, Tue, Wed, Thu, Fri, Sat, Sun
}

export interface Shift {
    id: number;
    dayOfTheWeek: Day;
    name: string;
    startTime: number;
    endTime: number;
    allowedRoles: number[];
}

export interface ScheduleWeek {
    id: number;
    startTimestamp: number;
    draft: boolean;
}

export interface ScheduledShift {
    id: number;
    shiftId: number;
    employeeId: number;
    scheduleWeek: number;
}

export interface Availability {
    id: number;
    employeeId: number;
    final: boolean;
    dayHours: {
        mon: number[],
        tue: number[],
        wed: number[],
        thu: number[],
        fri: number[],
        sat: number[],
        sun: number[],
    },
}

export interface TimeOffRequest {
    id: number;
    employeeId: number;
    startDate: number;
    endDate: number;
    reason: string,
    approved: boolean;
    finalized: boolean;
    finalizedBy: number;
    finalizedTime: number;
}

export interface ShiftSwapRequest {
    id: number;
    requestingEmployeeId: number;
    replacementEmployeeId: number;
    givenShift: number;
    takenShift: number;
    approved: boolean;
    finalized: boolean;
    finalizedBy: number;
    finalizedTime: number;
}

export interface AvailabilityChangeRequest {
    id: number;
    employeeId: number;
    newAvailability: number;
    approved: boolean;
    finalized: boolean;
    finalizedBy: number;
    finalizedTime: number;
}

export interface Event {
    id: number;
    creatorId: number;
    createdTime: number;
    name: string;
    startTime: number;
    endTime: number;
    relevantRoles: number[];
    description: string;
}

export interface Notification {
    id: number;
    employeeId: number;
    relatedEntityType: string;
    relatedEntityId: number;
    timeSent: number;
    push: boolean;
    body: string;
}

/* CLIENT-EXCLUSIVE TYPES */

/*
    A union type that bridges the key info from Shift and employee info from ScheduledShift together in a UI-usable
    package. Intended to be stored in a day's data so that day/date do not need to be stored here
 */
export interface ScheduleDayShift {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    employeeId: number;
    employeeName: string;
}

export interface ScheduleDay {
    name: string;
    date: string;
    shifts: ScheduleDayShift[];
}

export interface ScheduleDays {
    byId: {
        1: ScheduleDay,
        2: ScheduleDay,
        3: ScheduleDay,
        4: ScheduleDay,
        5: ScheduleDay,
        6: ScheduleDay,
        7: ScheduleDay,
    },
    allIds: [1, 2, 3, 4, 5, 6, 7]
}


/* MASTER INTERFACE */

export interface State {
    app: {
        userEmployeeId: number,
        errorMessage: string,
    },
    employees: {
        byId: {
            [key: number]: Employee
        },
        allIds: number[],
    },
    roles: {
        byId: {
            [key: number]: Role
        },
        allIds: number[],
    },
    shifts: {
        byId: {
            [key: number]: Shift
        },
        allIds: number[],
    },
    scheduledShifts: {
        byId: {
            [key: number]: ScheduledShift
        },
        allIds: number[],
    },
    scheduleWeeks: {
        byId: {
            [key: number]: ScheduleWeek
        },
        allIds: number[],
    },
    availabilities: {
        byId: {
            [key: number]: Availability
        },
        allIds: number[],
    },
    timeOffRequests: {
        byId: {
            [key: number]: TimeOffRequest
        },
        allIds: number[],
    },
    shiftSwapRequests: {
        byId: {
            [key: number]: ShiftSwapRequest
        },
        allIds: number[],
    },
    availabilityChangeRequests: {
        byId: {
            [key: number]: AvailabilityChangeRequest
        },
        allIds: number[],
    },
    events: {
        byId: {
            [key: number]: Event
        },
        allIds: number[],
    },
    notifications: {
        byId: {
            [key: number]: Notification
        },
        allIds: number[],
    }
}
