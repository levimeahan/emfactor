
import { EmployeesResponse } from "../types/serverResponses";


export default function employees(urlSegments, data) {
    if(urlSegments.length < 1) {
        throw new Error('No page specified!');
    }

    switch(urlSegments[0]) {
        case 'add':
            return addEmployee(data);
        default:
            throw new Error(`Invalid page: /employees/${urlSegments[0]}`);
    }
}


interface AddEmployeeData {
    firstName: string,
    lastName: string,
    isManager: boolean
}

function addEmployee(data: AddEmployeeData): EmployeesResponse {
    let response: EmployeesResponse = {
        success: false,
        errorMessage: '',
        employees: null,
    };



    return response;
}