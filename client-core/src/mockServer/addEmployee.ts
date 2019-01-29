import { validate } from "validate.js";
import { EmployeesResponse } from "../types/serverResponses";

import store from '../store';

import database, { updateDbFromStoreState } from './database';
import getNextCollectionId from './getNextCollectionId';

import {ROLE_EMPLOYEE, ROLE_MANAGER} from "../roles";

interface AddEmployeeData {
    firstName: string,
    lastName: string,
    isManager: boolean
}

export default function addEmployee(data: AddEmployeeData): EmployeesResponse {
    let response: EmployeesResponse = {
        success: false,
        errorMessage: '',
        employees: null,
    };

    let errors = validate(data, {
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

    if(errors) {
        response.errorMessage = JSON.stringify(errors);
        return response;
    }

    response.success = true;

    updateDbFromStoreState(store.getState());

    let empId = getNextCollectionId(database.employees);

    let roles = [ ROLE_EMPLOYEE ];
    if(data.isManager) {
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