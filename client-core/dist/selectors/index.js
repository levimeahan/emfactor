import { userLoggedIn, userIsManager } from './user';
export var employeeArray = function (state) { return (state.employees.allIds.map(function (id) { return state.employees.byId[id]; })); };
export var shiftsByDay = function (state) {
    var shiftsByDay = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    };
    Object.values(state.shifts.byId).forEach(function (shift) {
        shiftsByDay[shift.day].push(shift);
    });
    return shiftsByDay;
};
export { userLoggedIn, userIsManager };
