import {ROLE_EMPLOYEE} from "./roles";

export default {
    userEmployeeId: 0,
    employees: {
        1: {
            id: 1,
            firstName: 'Levi',
            lastName: 'Meahan',
            roles: [ ROLE_EMPLOYEE ]
        },
    },
    employeeIds: [ 1 ],
    roles: [
        {
            id: 1,
            name: 'Employee',
        }
    ],
    roleIds: [ 1 ],
};