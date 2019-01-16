"use strict";
exports.__esModule = true;
var database_1 = require("./database");
var validate_js_1 = require("validate.js");
function default_1(data) {
    var errors = validate_js_1.validate(data, {
        employeeId: {
            presence: true
        },
        password: {
            presence: true
        }
    });
    if (errors) {
        return {
            loginOk: false,
            errorMessage: JSON.stringify(errors)
        };
    }
    if (!database_1["default"].employees.byId.hasOwnProperty(data.employeeId)) {
        return {
            loginOk: false,
            errorMessage: "Invalid employee!"
        };
    }
    var employee = database_1["default"].employees.byId[data.employeeId];
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
            roles: employee.roles
        }
    };
}
exports["default"] = default_1;
