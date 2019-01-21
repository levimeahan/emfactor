import store from '../store';
import network from '../network';

import { Reducer } from '../types';
import { LoginResponse } from "../types/serverResponses";

import changeErrorMessage from '../reducers/changeErrorMessage';

export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);

    network.post('/login', { employeeId, password })
        .then((response) => {
            let loginResponse = response as LoginResponse;

            if(loginResponse.loginOk) {
                store.dispatch(loginSuccess, loginResponse.employee.id);
            }
            else {
                store.dispatch(changeErrorMessage, loginResponse.errorMessage);
            }
        })
        .catch((error) => {
            store.dispatch(changeErrorMessage, JSON.stringify(error));
        });
}

const loginSuccess: Reducer = (prevState, employeeId) => {
    return {
        ...prevState,
        app: {
            ...prevState.app,
            userEmployeeId: employeeId,
            errorMessage: '',
        },
    };
};