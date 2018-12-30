import store from '../store';

export default function login(employeeId/*: number */, password) {
    if(employeeId !== 1) {
        store.dispatch(loginFailure, 'Invalid user id!');
        return;
    }

    // API call
    if(password === 'bananas') {
        store.dispatch(loginSuccess, employeeId);
    }
    else {
        store.dispatch(loginFailure, 'Invalid password!');
    }
}

const loginSuccess = (prevState, employeeId) => {
    return { ...prevState, userEmployeeId: employeeId };
};

const loginFailure = (prevState, errorMessage) => {
    return prevState;
};