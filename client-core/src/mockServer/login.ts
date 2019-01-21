import database from "./database";
import { validate } from "validate.js";

import { Employee } from "../types";
import { LoginResponse } from "../types/serverResponses";

export default function(urlSegments, data): LoginResponse {
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

    if(!database.employees.byId.hasOwnProperty(data.employeeId)) {
        return {
            loginOk: false,
            errorMessage: "Invalid employee!",
            employee: null,
        }
    }

    let employee = database.employees.byId[data.employeeId];

    if(employee.password !== data.password) {
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