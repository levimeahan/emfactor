type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
    };

export type EntityCollection<T> = {
    byId: {
        [key: number]: T
    },
    allIds: number[],
};

export type Day = 'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun';
export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Availability {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
}

/* SERVER ENTITY TYPES */
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    availability: Availability;
    roles: number[];
}

export interface Role {
    id: number;
    name: string;
    permissions: string[];
    subRoles: number[];
}

export interface Shift {
    id: number;
    day: DayNumber;
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

export interface Policy {
    id: number;
    name: string;
    content: string;
}

export interface Guide {
    id: number;
    name: string;
    roles: number[];
}

export interface AvailabilityChangeRequest {
    id: number;
    employeeId: number;
    newHours: Availability;
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

interface Permission {
    label: string;
}

export interface Permissions {
    employees: Permission;
    schedule: Permission;
    policies: Permission;
}

/*
    A union type that bridges the key info from Shift and employee info from ScheduledShift together in a UI-usable
    package.
 */
export interface UIScheduleShift {
    id: number;
    name: string;
    day: number;
    startTime: number;
    endTime: number;
    employeeId: number;
    employeeName: string;
    allowedRoles: number[];
}

export interface UIScheduleDay {
    weekday: string;
    month: string;
    date: string;
    shifts: UIScheduleShift[];
}

export interface UIScheduleWeek {
    id: number;
    startTimestamp: number;
    draft: boolean;
    days: {
        1: UIScheduleDay,
        2: UIScheduleDay,
        3: UIScheduleDay,
        4: UIScheduleDay,
        5: UIScheduleDay,
        6: UIScheduleDay,
        7: UIScheduleDay,
    },
    dayIds: [1, 2, 3, 4, 5, 6, 7]
}


/* MASTER INTERFACE */

interface Schema {
    app: {
        userEmployeeId: number,
        errorMessage: string,
    };
    employees: EntityCollection<Employee>;
    roles: EntityCollection<Role>;
    shifts: EntityCollection<Shift>;
    scheduledShifts: EntityCollection<ScheduledShift>;
    scheduleWeeks: EntityCollection<ScheduleWeek>;
    timeOffRequests: EntityCollection<TimeOffRequest>;
    shiftSwapRequests: EntityCollection<ShiftSwapRequest>;
    availabilityChangeRequests: EntityCollection<AvailabilityChangeRequest>;
    policies: EntityCollection<Policy>;
    guides: EntityCollection<Guide>;
    events: EntityCollection<Event>;
    notifications: EntityCollection<Notification>;
}

export type State = DeepReadonly<Schema>;

export type Reducer = (prevState: State, ...rest) => State;
