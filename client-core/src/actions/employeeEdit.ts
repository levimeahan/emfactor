import store from '../store';
import network from '../network';

import changeErrorMessage from '../reducers/changeErrorMessage';

import {Employee, EntityCollection, Reducer} from '../types';
import {EmployeesResponse} from "../types/serverResponses";

export default function editEmployee(
    id: number,
    firstName: Employee['firstName'],
    lastName: Employee['lastName'],
    roles: Employee['roles'],
    availability: Employee['availability'],
    onSuccess?: Function
) {
    store.dispatch(editEmployeeSuccess, id, { firstName, lastName, roles, availability });
    if(onSuccess) {
        onSuccess();
    }
}

const editEmployeeSuccess: Reducer = (prevState, employeeId: number, changedData: Partial<Employee>) => ({
    ...prevState,
    employees: {
        ...prevState.employees,
        byId: {
            ...prevState.employees.byId,
            [employeeId]: {
                ...prevState.employees.byId[employeeId],
                ...changedData
            }
        },
    }
});