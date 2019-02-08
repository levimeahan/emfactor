import { validate } from "validate.js";
import { EmployeesResponse } from "../types/serverResponses";

import store from '../store';

import getNextCollectionId from '../utils/getNextCollectionId';
import {Employee} from "../types";

interface AddEmployeeData {
    firstName: Employee['firstName'],
    lastName: Employee['lastName'],
    roles: Employee['roles'],
    availability: Employee['availability'];
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
        roles: {
            presence: true,
        },
    });

    if(errors) {
        response.errorMessage = JSON.stringify(errors);
        return response;
    }

    response.success = true;

    const employees = { ...store.getState().employees };
    let empId = getNextCollectionId(employees);

    response.employees = {
        byId: {
            ...employees.byId,
            [empId]: {
                id: empId,
                firstName: data.firstName,
                lastName: data.lastName,
                availability: data.availability,
                roles: data.roles,
            },
        },
        allIds: [ ...employees.allIds, empId ]
    };

    return response;
}