import {Employee, State, Day, Permissions, DeepReadonly} from "../types";
import { DaysByNum } from "../config";

import { hasHourRange } from '../utils/availability';

import { roleHasPermission, roleMatches } from './roles';
import {fullName} from "../utils/employee";

import moment from 'moment';
import {inRange, rangesOverlap} from "../utils/number";

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

export const availableEmployees = (state: State, startTimestamp, endTimestamp, shiftId = null) => {
    if(!startTimestamp || !endTimestamp) {
        return [];
    }

    return state.employees.allIds
        .filter(id => employeeIsAvailable(state, id, startTimestamp, endTimestamp, shiftId))
        .map(id => state.employees.byId[id]);
};

export const employeeIsAvailable = (state: State, employeeId: number, startTimestamp, endTimestamp, desiredShiftId = null) => {
    const employee: DeepReadonly<Employee> = state.employees.byId[employeeId];

    const startTime = moment(startTimestamp);
    const endTime = moment(endTimestamp);

    const day = DaysByNum[startTime.isoWeekday()];

    if(!hasHourRange(employee.availability, day, startTime.hour(), endTime.hour())) {
        return false;
    }

    if(employeeIsScheduled(state, employeeId, startTimestamp, endTimestamp, desiredShiftId)) {
        return false;
    }

    return true;
};

export const employeeIsScheduled = (state: State, employeeId: number, startTimestamp, endTimestamp, desiredShiftId = null) => {
    let shift = state.scheduledShifts.allIds.find(id => {
        if(id === desiredShiftId) {
            return false;
        }

        let shift = state.scheduledShifts.byId[id];
        if (shift.employeeId !== employeeId) {
            return false;
        }


        return rangesOverlap(
            { start: shift.startTimestamp, end: shift.endTimestamp },
            { start: startTimestamp, end: endTimestamp }
        );
    });

    return shift !== undefined;
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