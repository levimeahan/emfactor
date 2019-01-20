import { ROLE_MANAGER } from "../roles";
export var userLoggedIn = function (state) { return state.app.userEmployeeId !== 0; };
export var userIsManager = function (state) {
    var userId = state.app.userEmployeeId;
    if (!userId) {
        return false;
    }
    if (!state.employees.byId.hasOwnProperty(userId)) {
        return false;
    }
    var userData = state.employees.byId[userId];
    return userData.roles.indexOf(ROLE_MANAGER) !== -1;
};
