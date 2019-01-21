import {
    userLoggedIn,
    userIsManager
} from './user';


export const employeeArray = (state) => (
    state.employees.allIds.map(id => state.employees.byId[id])
);


export {
    userLoggedIn,
    userIsManager
}