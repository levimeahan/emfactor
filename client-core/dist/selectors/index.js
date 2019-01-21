import { userLoggedIn, userIsManager } from './user';
export var employeeArray = function (state) { return (state.employees.allIds.map(function (id) { return state.employees.byId[id]; })); };
export { userLoggedIn, userIsManager };
