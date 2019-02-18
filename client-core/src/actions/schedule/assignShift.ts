import store from '../../store/index';
import network from '../../network';

import changeErrorMessage from '../../reducers/changeErrorMessage';

import {Shift, Reducer, ScheduledShift} from '../../types/index';
import {ShiftAssignResponse} from "../../types/serverResponses";

export default function assignShift(scheduleWeek, shiftId, employeeId) {
    network.post('/shifts/assign', { scheduleWeek, shiftId, employeeId: parseInt(employeeId) })
        .then((response) => {
            let shiftAssignResponse = response as ShiftAssignResponse;

            if(!shiftAssignResponse.success) {
                store.dispatch(changeErrorMessage, shiftAssignResponse.errorMessage);
            }
            else if(shiftAssignResponse.isNew) {
                store.dispatch(addScheduledShift, shiftAssignResponse.scheduledShift);
            }
            else {
                store.dispatch(editScheduledShift, shiftAssignResponse.scheduledShift);
            }
        })
        .catch((error) => {
            store.dispatch(changeErrorMessage, JSON.stringify(error));
        });
}

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
            ...prevState.scheduledShifts,
            [newShift.id]: newShift,
        },
        allIds: prevState.scheduledShifts.allIds,
    }
});