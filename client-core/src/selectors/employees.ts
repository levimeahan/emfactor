import {Employee, State, Day, Permissions, DeepReadonly} from "../types";
import { DaysByNum } from "../config";

import { hasHourRange } from '../utils/availability';

import { roleHasPermission, roleMatches } from './roles';
import {fullName} from "../utils/employee";

import moment from 'moment';

export const allEmployees = (state: State) => (
    state.employees.allIds.map(id => state.employees.byId[id])
);

export const employeeNamesByIds = (state: State, employeeIds: number[]) => {
    let names = {};
    employeeIds.forEach(id => {
        if(typeof state.employees.byId[id] === 'undefined') {
            names[id] = `[Emp #${id} undefined]`;
        }

        names[id] = fullName(state.employees.byId[id]);
    });

    return names;
};

export const availableEmployees = (state: State, startTimestamp, endTimestamp) => {
    if(!startTimestamp || !endTimestamp) {
        return [];
    }

    return state.employees.allIds
        .filter(id => employeeIsAvailable(state, id, startTimestamp, endTimestamp))
        .map(id => state.employees.byId[id]);
};

export const employeeIsAvailable = (state: State, employeeId: number, startTimestamp, endTimestamp) => {
    const employee: DeepReadonly<Employee> = state.employees.byId[employeeId];

    const startTime = moment(startTimestamp);
    const endTime = moment(endTimestamp);

    const day = DaysByNum[startTime.isoWeekday()];

    if(!hasHourRange(employee.availability, day, startTime.hour(), endTime.hour())) {
        return false;
    }

    return true;
};

export const employeeHasRole = (state: State, employeeId: number, roleId: number) => {
    for(let id of state.employees.byId[employeeId].roles) {
        if(roleMatches(state, id, roleId)) {
            return true;
        }
    }

    return false;
};

export const employeeHasPermission = (state: State, employeeId: number, permission: keyof Permissions) => {
    for(let id of state.employees.byId[employeeId].roles) {
        if(roleHasPermission(state, id, permission)) {
            return true;
        }
    }

    return false;
};

export const employeeFullName = (state: State, employeeId: number) => {
    if(!employeeId) {
        return '[Invalid Emp ID]';

    }

    return fullName(state.employees.byId[employeeId]);
};