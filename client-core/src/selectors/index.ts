import {State} from "../types";

import { roleMatches } from "./roles";


export const allPolicies = (state: State) => state.policies.allIds.map(id => state.policies.byId[id]);

export const allGuides = (state: State) => state.guides.allIds.map(id => state.guides.byId[id]);

export const guidesForRole = (state: State, roleId: number) =>
    state.guides.allIds
        .filter(id => roleMatches(state, state.guides.byId[id], roleId))
        .map(id => state.guides.byId[id]);


export * from './user';

export { employeeShiftsByWeek } from "./schedule";

export * from './scheduleWeeks';

export * from './employees';

export * from "./requests";

export * from './roles';