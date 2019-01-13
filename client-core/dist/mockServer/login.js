import database from "./database";
import validate from "validate.js";
export default function (data) {
    var errors = validate(data, {
        employeeId: {
            presence: true,
        },
        password: {
            presence: true,
        },
    });
    if (errors) {
        return {
            loginOk: false,
            errorMessage: JSON.stringify(errors),
        };
    }
    if (!database.employees.byId.hasOwnProperty(data.employeeId)) {
        return {
            loginOk: false,
            errorMessage: "Invalid employee!"
        };
    }
    var employee = database.employees.byId[data.employeeId];
    if (employee.password !== data.password) {
        return {
            loginOk: false,
            errorMessage: 'Invalid password!'
        };
    }
    return {
        loginOk: true,
        errorMessage: '',
        employee: {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            roles: employee.roles,
        }
    };
}
