import {Employee, State, Day} from "../types";
import { DaysByNum } from "../config";

import { hasRange } from '../utils/availability';

import { roleMatches } from './roles';

export const employeesArray = (state: State) => (
    state.employees.allIds.map(id => state.employees.byId[id])
);

export const availableEmployees = (state: State, shiftId: number) => {
    if(!state.shifts.byId.hasOwnProperty(shiftId)) {
        throw new Error("Invalid shift!");
    }

    let shift = state.shifts.byId[shiftId];
    let day = DaysByNum[shift.day];

    let availableEmployeeIds = state.employees.allIds.filter((id) => {
        // debugger;
        return hasRange(state.employees.byId[id].availability[day], shift.startTime, shift.endTime)
            &&
            employeeHasRole(state, id, shift.allowedRoles[0]);
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