import database from "./database";
import validate from "validate.js";
import {Employee} from "../store/schema";

interface LoginResponse {
    loginOk: boolean;
    employee: Employee;
}

export default function(data) {
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
        }
    }

    if(!database.employees.byId.hasOwnProperty(data.employeeId)) {
        return {
            loginOk: false,
            errorMessage: "Invalid employee!"
        }
    }

    let employee = database.employees.byId[data.employeeId];

    if(employee.password !== data.password) {
        return {
            loginOk: false,
            errorMessage: 'Invalid password!'
        };
    }

    return {
        loginOk: true,
        errorMessage: '',
        employee: <Employee> {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            roles: employee.roles,
        }
    }
}