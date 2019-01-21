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
import changeErrorMessage from '../reducers/changeErrorMessage';
export default function login(employeeId, password) {
    employeeId = parseInt(employeeId);
    network.post('/login', { employeeId: employeeId, password: password })
        .then(function (response) {
        var loginResponse = response;
        if (loginResponse.loginOk) {
            store.dispatch(loginSuccess, loginResponse.employee.id);
        }
        else {
            store.dispatch(changeErrorMessage, loginResponse.errorMessage);
        }
    })
        .catch(function (error) {
        store.dispatch(changeErrorMessage, JSON.stringify(error));
    });
}
var loginSuccess = function (prevState, employeeId) {
    return __assign({}, prevState, { app: __assign({}, prevState.app, { userEmployeeId: employeeId, errorMessage: '' }) });
};
