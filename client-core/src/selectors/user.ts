import { ROLE_MANAGER } from "../roles";
import { State } from '../types';

export const userLoggedIn = (state: State) => state.app.userEmployeeId !== 0;

export const userIsManager = (state: State) => {
    let userId = state.app.userEmployeeId;

    if(!userId) {
        return false;
    }
    if(!state.employees.byId.hasOwnProperty(userId)) {
        return false;
    }

    let userData = state.employees.byId[userId];

    return userData.roles.indexOf(ROLE_MANAGER) !== -1;
};