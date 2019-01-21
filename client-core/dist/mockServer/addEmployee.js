import { validate } from "validate.js";
import store from '../store';
import database, { updateDbFromStoreState } from './database';
import { ROLE_EMPLOYEE, ROLE_MANAGER } from "../roles";
export default function addEmployee(data) {
    var response = {
        success: false,
        errorMessage: '',
        employees: null,
    };
    var errors = validate(data, {
        firstName: {
            presence: { allowEmpty: false },
        },
        lastName: {
            presence: { allowEmpty: false },
        },
        isManager: {
            presence: true,
        },
    });
    if (errors) {
        response.errorMessage = JSON.stringify(errors);
        return response;
    }
    response.success = true;
    updateDbFromStoreState(store.getState());
    var empId;
    if (database.employees.allIds.length < 1) {
        empId = 1;
    }
    else {
        empId = database.employees.allIds.slice(-1)[0] + 1;
    }
    var roles = [ROLE_EMPLOYEE];
    if (data.isManager) {
        roles.push(ROLE_MANAGER);
    }
    database.employees.byId[empId] = {
        id: empId,
        firstName: data.firstName,
        lastName: data.lastName,
        password: 'bananas',
        roles: roles,
    };
    database.employees.allIds.push(empId);
    response.employees = database.employees;
    return response;
}
