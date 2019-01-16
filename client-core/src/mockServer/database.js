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
var defaultState_1 = require("../defaultState");
var database = {
    app: defaultState_1["default"].app,
    employees: {
        byId: {
            1: __assign({}, defaultState_1["default"].employees.byId[1], { password: 'bananas' })
        },
        allIds: []
    },
    roles: defaultState_1["default"].roles,
    shifts: defaultState_1["default"].shifts,
    scheduledShifts: defaultState_1["default"].scheduledShifts,
    availabilities: defaultState_1["default"].availabilities,
    timeOffRequests: defaultState_1["default"].timeOffRequests,
    shiftSwapRequests: defaultState_1["default"].shiftSwapRequests,
    availabilityChangeRequests: defaultState_1["default"].availabilityChangeRequests,
    events: defaultState_1["default"].events,
    notifications: defaultState_1["default"].notifications
};
exports["default"] = database;
