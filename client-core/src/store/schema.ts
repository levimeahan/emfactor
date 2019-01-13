
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

enum Day {
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

export interface ScheduledShift {
    id: number;
    shiftId: number;
    employeeId: number;
    draft: boolean;
}

export interface Availability {
    id: number;
    employeeId: number;
    final: boolean;
    dayHours: {
        1: number[],
        2: number[],
        3: number[],
        4: number[],
        5: number[],
        6: number[],
        7: number[],
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
