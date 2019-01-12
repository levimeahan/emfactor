var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import store from '../store/index';
export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);
    // TODO: Make API call and get results, pass to success or failure reducer
    /* Placeholder logic to test success/failure cases */
    if (employeeId !== 1) {
        store.dispatch(loginFailure, 'Invalid user id!');
        return;
    }
    if (password === 'bananas') {
        store.dispatch(loginSuccess, employeeId);
    }
    else {
        store.dispatch(loginFailure, 'Invalid password!');
    }
}
/* REDUCERS - Do not perform side effects inside */
var loginSuccess = function (prevState, employeeId) {
    return __assign({}, prevState, { app: __assign({}, prevState.app, { userEmployeeId: employeeId }) });
};
var loginFailure = function (prevState, errorMessage) {
    // TODO: Make this update error message and decide how to display it
    return __assign({}, prevState, { app: __assign({}, prevState.app, { errorMessage: errorMessage }) });
};
