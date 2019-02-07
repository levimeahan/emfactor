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
    onSuccess?: Function
) {
    store.dispatch(editEmployeeSuccess, id, { firstName, lastName, roles });
    if(onSuccess) {
        onSuccess();
    }

    /*network.post('/employees/add', { firstName, lastName, roles })
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
        });*/
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