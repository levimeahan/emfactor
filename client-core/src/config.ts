import { Day, DayNumber, Permissions } from './types';

export const Days: { [key: string]: DayNumber } = {
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    sun: 7,
};

export const DaysByNum: { [key: number]: Day } = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    7: 'sun',
};

export const permissions: Permissions = {
    viewEmployees: {
        label: "View Full Employee info"
    },
    addEmployees: {
        label: 'Add New Employees',
    },
    editEmployees: {
        label: 'Edit Employees',
    },
    manageShifts: {
        label: "Create/Edit Shifts"
    },
    manageSchedules: {
        label: 'Create/Edit Weekly Schedules',
    },
    managePolicies: {
        label: 'Create/Edit Policies',
    },
    viewAllGuides: {
        label: 'View Guides for all roles',
    },
    manageAllGuides: {
        label: 'Create/Edit Guides for all roles',
    },
    manageLowerGuides: {
        label: 'Create/Edit Guides for lower roles',
    },
    viewTimeOffRequests: {
        label: "View time off requests",
    },
    finalizeTimeOffRequests: {
        label: "Approve/Decline time off requests"
    },
    viewAvailabilityRequests: {
        label: "View availability change requests",
    },
    finalizeAvailabilityRequests: {
        label: "Approve/Decline availability change requests"
    },
};