import {State, TimeOffRequest} from "../types";

export const employeeTimeOffRequests = (state: State, employeeId: number): TimeOffRequest[] =>
    state.timeOffRequests.allIds
        .filter(id => state.timeOffRequests.byId[id].employeeId === employeeId)
        .map(id => state.timeOffRequests.byId[id]);

export const allTimeOffRequests = (state: State): TimeOffRequest[] =>
    state.timeOffRequests.allIds.map(id => state.timeOffRequests.byId[id]);
