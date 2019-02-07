import { validate } from "validate.js";
import { EmployeesResponse } from "../types/serverResponses";

import store from '../store';

import getNextCollectionId from '../utils/getNextCollectionId';

interface AddEmployeeData {
    firstName: string,
    lastName: string,
    roles: number[],
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

    const tenToTwenty = '0'.repeat(9) + '1'.repeat(10) + '0'.repeat(5);
    const notAvailable = '0'.repeat(24);

    response.employees = {
        byId: {
            ...employees.byId,
            [empId]: {
                id: empId,
                firstName: data.firstName,
                lastName: data.lastName,
                availability: {
                    mon: tenToTwenty,
                    tue: notAvailable,
                    wed: tenToTwenty,
                    thu: notAvailable,
                    fri: tenToTwenty,
                    sat: notAvailable,
                    sun: tenToTwenty,
                },
                roles: data.roles,
            },
        },
        allIds: [ ...employees.allIds, empId ]
    };

    return response;
}