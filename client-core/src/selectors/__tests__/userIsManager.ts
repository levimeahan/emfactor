import { userIsManager } from '../user';

import { State } from '../../types';
import defaultState from '../../defaultState';

const employeeTemplate = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    availability: {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: '',
        sat: '',
        sun: '',
    },
};

const roles = {
    employee: 1,
    manager: 2,
};

const setupState: State = {
    ...defaultState,
    app: {
        ...defaultState.app,
        userEmployeeId: 0,
    },
    employees: {
        byId: {
            1: {
                ...employeeTemplate,
                roles: [],
            },
            2: {
                ...employeeTemplate,
                roles: [roles.employee],
            },
            3: {
                ...employeeTemplate,
                roles: [roles.manager],
            },
            4: {
                ...employeeTemplate,
                roles: [roles.employee, roles.manager],
            },
            5: {
                ...employeeTemplate,
                roles: [roles.manager, roles.employee],
            },
        },
        allIds: [1, 2, 3, 4, 5]
    },
};

const stateWithEmpId = (id) => ({
    ...setupState,
    app: {
        ...setupState.app,
        userEmployeeId: id
    }
});

it('verifies user is not manager', () => {
    // Logged out
    expect(userIsManager(stateWithEmpId(0))).toBe(false);

    // no manager role
    expect(userIsManager(stateWithEmpId(1))).toBe(false);
    expect(userIsManager(stateWithEmpId(2))).toBe(false);

    // invalid user
    expect(userIsManager(stateWithEmpId(100))).toBe(false);
});

it('verifies user is manager', () => {
    expect(userIsManager(stateWithEmpId(3))).toBe(true);
    expect(userIsManager(stateWithEmpId(4))).toBe(true);
    expect(userIsManager(stateWithEmpId(5))).toBe(true);
});