import {State} from "../types";

export const employeeTimeOffRequests = (state: State, employeeId: number) =>
    state.timeOffRequests.allIds
        .filter(id => state.timeOffRequests.byId[id].employeeId === employeeId)
        .map(id => state.timeOffRequests.byId[id]);