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
import defaultState from '../defaultState';
var database = {
    app: defaultState.app,
    employees: {
        byId: {
            1: __assign({}, defaultState.employees.byId[1], { password: 'bananas' })
        },
        allIds: []
    },
    roles: defaultState.roles,
    shifts: defaultState.shifts,
    scheduledShifts: defaultState.scheduledShifts,
    scheduleWeeks: defaultState.scheduleWeeks,
    availabilities: defaultState.availabilities,
    timeOffRequests: defaultState.timeOffRequests,
    shiftSwapRequests: defaultState.shiftSwapRequests,
    availabilityChangeRequests: defaultState.availabilityChangeRequests,
    events: defaultState.events,
    notifications: defaultState.notifications,
};
export default database;
