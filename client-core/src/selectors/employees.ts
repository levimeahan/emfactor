import {Employee, State, Day, Permissions} from "../types";
import { DaysByNum } from "../config";

import { hasRange } from '../utils/availability';

import { roleHasPermission, roleMatches } from './roles';
import {fullName} from "../utils/employee";

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

export const availableEmployees = (state: State, shiftId: number) => {
    if(!state.shifts.byId.hasOwnProperty(shiftId)) {
        throw new Error("Invalid shift!");
    }

    let shift = state.shifts.byId[shiftId];
    let day = DaysByNum[shift.day];
    
    let availableEmployeeIds = state.employees.allIds.filter((id) => {
        return hasRange(state.employees.byId[id].availability[day], shift.startHour, shift.endHour)
            &&
            employeeHasRole(state, id, shift.roleId);
    });

    return availableEmployeeIds.map(id => state.employees.byId[id]);
};

export const employeeIsAvailable = (state: State, employeeId: number, day: Day, startTime, endTime) => (
    hasRange(state.employees.byId[employeeId].availability[day], startTime, endTime)
);

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