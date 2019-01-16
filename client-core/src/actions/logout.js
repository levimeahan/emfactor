"use strict";
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
exports.__esModule = true;
var store_1 = require("../store");
function logout() {
    store_1["default"].dispatch(logoutSuccess);
}
exports["default"] = logout;
var logoutSuccess = function (prevState) { return (__assign({}, prevState, { app: __assign({}, prevState.app, { userEmployeeId: 0 }) })); };
