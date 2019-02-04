import {State} from "../types";
import { DaysByNum } from "../config";

import { hasRange } from '../utils/availability';

export const employeeArray = (state: State) => (
    state.employees.allIds.map(id => state.employees.byId[id])
);

export const availableEmployees = (state: State, shiftId: number) => {
    if(!state.shifts.byId.hasOwnProperty(shiftId)) {
        throw new Error("Invalid shift!");
    }

    let shift = state.shifts.byId[shiftId];

    let availableEmployeeIds = state.employees.allIds.filter((id) => {
        return hasRange(
            state.employees.byId[id].availability[ DaysByNum[shift.day] ],
            shift.startTime,
            shift.endTime
        );
    });

    return availableEmployeeIds.map(id => state.employees.byId[id]);
};