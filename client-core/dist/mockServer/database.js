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
        allIds: [1]
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
export var updateDbFromStoreState = function (state) {
    database.app = __assign({}, state.app);
    var employees = {};
    Object.values(state.employees.byId).forEach(function (employee) {
        employees[employee.id] = __assign({}, employee, { password: 'bananas' });
    });
    database.employees = {
        byId: employees,
        allIds: state.employees.allIds.slice()
    };
    database.roles = __assign({}, state.roles);
    database.shifts = __assign({}, state.shifts);
    database.scheduledShifts = __assign({}, state.scheduledShifts);
    database.scheduleWeeks = __assign({}, state.scheduleWeeks);
    database.availabilities = __assign({}, state.availabilities);
    database.timeOffRequests = __assign({}, state.timeOffRequests);
    database.shiftSwapRequests = __assign({}, state.shiftSwapRequests);
    database.availabilityChangeRequests = __assign({}, state.availabilityChangeRequests);
    database.events = __assign({}, state.events);
    database.notifications = __assign({}, state.notifications);
};
export default database;
