import { validate } from "validate.js";
export default function employees(urlSegments, data) {
}
function addEmployee(data) {
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
    response.errorMessage = 'Not finished yet!';
    return response;
}
