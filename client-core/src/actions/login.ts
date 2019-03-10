import store from '../store';

import { Reducer } from '../types';

import changeErrorMessage from '../reducers/changeErrorMessage';

import mockLogin from '../mockServerActions/login';

export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);

    try {
        let response = mockLogin({ employeeId, password });

        if(response.loginOk) {
            store.dispatch(loginSuccess, response.employee.id);
        }
        else {
            store.dispatch(changeErrorMessage, response.errorMessage);
        }
    } catch(error) {
        store.dispatch(changeErrorMessage, JSON.stringify(error));
    }
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