import store from '../store';
import network from '../network';

import changeErrorMessage from '../reducers/changeErrorMessage';

import {Employee, EntityCollection, Reducer} from '../types';
import {EmployeesResponse} from "../types/serverResponses";

export default function addEmployee(
    firstName: Employee['firstName'],
    lastName: Employee['lastName'],
    roles: Employee['roles'],
    availability: Employee['availability'],
    success?: Function
) {
    network.post('/employees/add', { firstName, lastName, roles, availability })
        .then((response) => {
            let empResponse = response as EmployeesResponse;

            if(empResponse.success) {
                store.dispatch(addEmployeeSuccess, empResponse.employees);
                success();
            }
            else {
                store.dispatch(changeErrorMessage, empResponse.errorMessage);
            }
        })
        .catch((error) => {
            store.dispatch(changeErrorMessage, JSON.stringify(error));
        });
}

const addEmployeeSuccess: Reducer = (prevState, employees: EntityCollection<Employee>) => ({
    ...prevState,
    app: {
        ...prevState.app,
        errorMessage: '',
    },
    employees: {
        ...employees
    }
});