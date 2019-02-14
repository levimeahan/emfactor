import { DayNumber, Permissions } from './types';

export const Days: { [key: string]: DayNumber } = {
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    sun: 7,
};

export const DaysByNum = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    7: 'sun',
};

export const permissions: Permissions = {
    employees: {
        label: 'Add/Edit Employees',
    },
    schedule: {
        label: 'Create/Edit/Assign Schedule',
    },
    policies: {
        label: 'Create/Edit Policies',
    },
};