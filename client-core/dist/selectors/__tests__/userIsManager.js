var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { userIsManager } from '../user';
import defaultState from '../../defaultState';
import { ROLE_EMPLOYEE, ROLE_MANAGER } from "../../roles";
var employeeTemplate = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
};
var setupState = __assign({}, defaultState, { app: __assign({}, defaultState.app, { userEmployeeId: 0 }), employees: {
        byId: {
            1: __assign({}, employeeTemplate, { roles: [] }),
            2: __assign({}, employeeTemplate, { roles: [ROLE_EMPLOYEE] }),
            3: __assign({}, employeeTemplate, { roles: [ROLE_MANAGER] }),
            4: __assign({}, employeeTemplate, { roles: [ROLE_EMPLOYEE, ROLE_MANAGER] }),
            5: __assign({}, employeeTemplate, { roles: [ROLE_MANAGER, ROLE_EMPLOYEE] }),
        },
        allIds: [1, 2, 3, 4, 5]
    } });
var stateWithEmpId = function (id) { return (__assign({}, setupState, { app: __assign({}, setupState.app, { userEmployeeId: id }) })); };
it('verifies user is not manager', function () {
    // Logged out
    expect(userIsManager(stateWithEmpId(0))).toBe(false);
    // no manager role
    expect(userIsManager(stateWithEmpId(1))).toBe(false);
    expect(userIsManager(stateWithEmpId(2))).toBe(false);
    // invalid user
    expect(userIsManager(stateWithEmpId(100))).toBe(false);
});
it('verifies user is manager', function () {
    expect(userIsManager(stateWithEmpId(3))).toBe(true);
    expect(userIsManager(stateWithEmpId(4))).toBe(true);
    expect(userIsManager(stateWithEmpId(5))).toBe(true);
});
