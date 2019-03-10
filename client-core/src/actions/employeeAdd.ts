import store from '../store';
import network from '../network';

import changeErrorMessage from '../reducers/changeErrorMessage';

import {Employee, EntityCollection, Reducer} from '../types';
import {EmployeesResponse} from "../types/serverResponses";

import mockAddEmployee from '../mockServerActions/addEmployee';

export default function addEmployee(
    firstName: Employee['firstName'],
    lastName: Employee['lastName'],
    roles: Employee['roles'],
    availability: Employee['availability'],
    success?: Function
) {
   try {
       let response = mockAddEmployee({firstName, lastName, roles, availability});
       if (response.success) {
           store.dispatch(addEmployeeSuccess, response.employees);
           success();
       }
       else {
           store.dispatch(changeErrorMessage, response.errorMessage);
       }
   } catch(e) {
       store.dispatch(changeErrorMessage, JSON.stringify(e));
   }
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