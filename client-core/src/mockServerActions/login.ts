import { validate } from "validate.js";

import store from '../store';
import { Employee } from "../types";
import { LoginResponse } from "../types/serverResponses";

export default function(data): LoginResponse {
    let errors = validate(data, {
        employeeId: {
            presence: true,
        },
        password: {
            presence: true,
        },
    });

    if(errors) {
        return {
            loginOk: false,
            errorMessage: JSON.stringify(errors),
            employee: null,
        }
    }

    const employees = store.getState().employees;

    if(!employees.byId.hasOwnProperty(data.employeeId)) {
        return {
            loginOk: false,
            errorMessage: "Invalid employee!",
            employee: null,
        }
    }

    let employee = employees.byId[data.employeeId];

    if(data.password !== 'bananas') {
        return {
            loginOk: false,
            errorMessage: 'Invalid password!',
            employee: null,
        };
    }

    return {
        loginOk: true,
        errorMessage: null,
        employee: <Employee> {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            roles: employee.roles,
        }
    }
}