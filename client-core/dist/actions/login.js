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
import store from '../store';
import network from '../network';
export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);
    // TODO: Make API call and get results, pass to success or failure reducer
    var result = network.post('/login', { employeeId: employeeId, password: password });
    result.then(function (response) {
        if (response.loginOk) {
            store.dispatch(loginSuccess, response.employee.id);
        }
        else {
            store.dispatch(loginFailure, response.errorMessage);
        }
    })
        .catch(function (error) {
        store.dispatch(loginFailure, JSON.stringify(error));
    });
}
/* REDUCERS - Do not perform side effects inside */
var loginSuccess = function (prevState, employeeId) {
    return __assign({}, prevState, { app: __assign({}, prevState.app, { userEmployeeId: employeeId, errorMessage: '' }) });
};
var loginFailure = function (prevState, errorMessage) {
    // TODO: Make this update error message and decide how to display it
    return __assign({}, prevState, { app: __assign({}, prevState.app, { errorMessage: errorMessage }) });
};
