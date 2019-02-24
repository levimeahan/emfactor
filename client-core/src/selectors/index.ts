import {
    userLoggedIn,
    userIsManager
} from './user';

import {
    currentScheduleWeek,
    futureScheduleWeeks,
    currentAndFutureScheduleWeeks,
} from './schedule';

import {
    employeesArray,
    availableEmployees,
    employeeIsAvailable
} from './employees';

import { employeeTimeOffRequests } from "./requests";

import {
    rolesArray,
    roleNames,
    roleMatches
} from './roles';


import {State} from "../types";

const allPolicies = (state: State) => state.policies.allIds.map(id => state.policies.byId[id]);


export {
    userLoggedIn,
    userIsManager,

    currentScheduleWeek,
    futureScheduleWeeks,
    currentAndFutureScheduleWeeks,

    employeesArray,
    availableEmployees,
    employeeIsAvailable,

    employeeTimeOffRequests,

    rolesArray,
    roleNames,
    roleMatches,

    allPolicies,
}