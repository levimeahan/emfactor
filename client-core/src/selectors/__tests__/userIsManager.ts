import { userIsManager } from '../user';

import { State } from '../../types';
import defaultState from '../../defaultState';
import {ROLE_EMPLOYEE, ROLE_MANAGER} from "../../roles";

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
                roles: [ROLE_EMPLOYEE],
            },
            3: {
                ...employeeTemplate,
                roles: [ROLE_MANAGER],
            },
            4: {
                ...employeeTemplate,
                roles: [ROLE_EMPLOYEE, ROLE_MANAGER],
            },
            5: {
                ...employeeTemplate,
                roles: [ROLE_MANAGER, ROLE_EMPLOYEE],
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