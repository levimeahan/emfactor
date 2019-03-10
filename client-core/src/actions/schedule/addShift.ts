import store from '../../store/index';

import changeErrorMessage from '../../reducers/changeErrorMessage';

import {Shift, Reducer, DayNumber} from '../../types';

import mockAddShift from '../../mockServerActions/addShift';

export default function addShift(day: DayNumber) {
    try {
        let response = mockAddShift({ day });

        if(response.success) {
            store.dispatch(shiftAddSuccess, response.shift);
        }
        else {
            store.dispatch(changeErrorMessage, response.errorMessage);
        }
    } catch (error) {
        store.dispatch(changeErrorMessage, JSON.stringify(error));
    }
}

const shiftAddSuccess: Reducer = (prevState, newShift: Shift) => ({
    ...prevState,
    shifts: {
        byId: {
            ...prevState.shifts.byId,
            [newShift.id]: newShift,
        },
        allIds: [
            ...prevState.shifts.allIds,
            newShift.id
        ]
    }
});