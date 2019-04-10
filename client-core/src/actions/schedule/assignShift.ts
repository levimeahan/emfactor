import store from '../../store/index';

import changeErrorMessage from '../../reducers/changeErrorMessage';

import { Reducer, ScheduledShift } from '../../types';

import mockAssignShift from '../../mockServerActions/assignShift';

export default function assignShift(weekId: number, shiftId: number, baseShiftId: number, employeeId: number) {
    try {
        let response = mockAssignShift({ weekId: weekId, shiftId, baseShiftId, employeeId: employeeId });

        if(!response.success) {
            store.dispatch(changeErrorMessage, response.errorMessage);
        }
        else if(response.isNew) {
            store.dispatch(addScheduledShift, response.scheduledShift);
        }
        else {
            store.dispatch(editScheduledShift, response.scheduledShift);
        }

        return true;
    } catch(error) {
        store.dispatch(changeErrorMessage, JSON.stringify(error));

        return false;
    }
};

const addScheduledShift: Reducer = (prevState, newShift: ScheduledShift) => ({
    ...prevState,
    scheduledShifts: {
        byId: {
            ...prevState.scheduledShifts.byId,
            [newShift.id]: newShift,
        },
        allIds: [
            ...prevState.scheduledShifts.allIds,
            newShift.id
        ]
    }
});

const editScheduledShift: Reducer = (prevState, newShift: ScheduledShift) => ({
    ...prevState,
    scheduledShifts: {
        byId: {
            ...prevState.scheduledShifts.byId,
            [newShift.id]: newShift,
        },
        allIds: prevState.scheduledShifts.allIds,
    }
});