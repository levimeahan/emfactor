import store from '../store';
import network from '../network';

import { Employee } from '../types';

interface LoginResponse {
    loginOk: boolean,
    errorMessage: string,
    employee?: Employee
}

export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);

    // TODO: Make API call and get results, pass to success or failure reducer
    let result = network.post('/login', { employeeId, password });

    result.then((response: LoginResponse) => {
        if(response.loginOk) {
            store.dispatch(loginSuccess, response.employee.id);
        }
        else {
            store.dispatch(loginFailure, response.errorMessage);
        }
    })
    .catch((error) => {
        store.dispatch(loginFailure, JSON.stringify(error));
    });


}

/* REDUCERS - Do not perform side effects inside */

const loginSuccess = (prevState, employeeId) => {
    return {
        ...prevState,
        app: {
            ...prevState.app,
            userEmployeeId: employeeId,
            errorMessage: '',
        },
    };
};

const loginFailure = (prevState, errorMessage) => {
    // TODO: Make this update error message and decide how to display it
    return {
        ...prevState,
        app: { ...prevState.app, errorMessage: errorMessage }
    };
};