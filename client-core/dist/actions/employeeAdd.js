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
export default function addEmployee(firstName, lastName, isManager, success) {
    network.post('/employees/add', { firstName: firstName, lastName: lastName, isManager: isManager })
        .then(function (response) {
        var empResponse = response;
        if (empResponse.success) {
            store.dispatch(addEmployeeSuccess, empResponse.employees);
            success();
        }
        else {
            store.dispatch(changeErrorMessage, empResponse.errorMessage);
        }
    })
        .catch(function (error) {
        store.dispatch(changeErrorMessage, JSON.stringify(error));
    });
}
var addEmployeeSuccess = function (prevState, employees) { return (__assign({}, prevState, { app: __assign({}, prevState.app, { errorMessage: '' }), employees: __assign({}, employees) })); };
