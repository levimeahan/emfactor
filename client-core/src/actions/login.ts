import store from '../store/index';

export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);

    // TODO: Make API call and get results, pass to success or failure reducer

    /* Placeholder logic to test success/failure cases */

    if(employeeId !== 1) {
        store.dispatch(loginFailure, 'Invalid user id!');
        return;
    }

    if(password === 'bananas') {
        store.dispatch(loginSuccess, employeeId);
    }
    else {
        store.dispatch(loginFailure, 'Invalid password!');
    }
}

/* REDUCERS - Do not perform side effects inside */

const loginSuccess = (prevState, employeeId) => {
    return {
        ...prevState,
        app: { ...prevState.app, userEmployeeId: employeeId },
    };
};

const loginFailure = (prevState, errorMessage) => {
    // TODO: Make this update error message and decide how to display it
    return {
        ...prevState,
        app: { ...prevState.app, errorMessage: errorMessage }
    };
};