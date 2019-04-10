import store from '../../store';

import { ShiftsToAssign } from "../../types";

import assignShift from '../schedule/assignShift';

import editEntityItem from '../../reducers/editEntityItem';

export default function approveTimeOff(requestId: number, approverId: number, shiftsToAssign: ShiftsToAssign) {
    if(!requestId) {
        throw new Error("Invalid request ID!");
    }

    const request = store.getState().timeOffRequests.byId[requestId];

    // Cache shifts to revert if needed
    const scheduledShifts = store.getState().scheduledShifts;


    for(let shift of Object.values(shiftsToAssign)) {
        if(!assignShift(shift.weekId, shift.shiftId, shift.baseShiftId, shift.employeeId)) {
            store.dispatch(prevState => ({
                ...prevState,
                scheduledShifts: scheduledShifts
            }));
            return false;
        }
    }

    debugger;

    store.dispatch(prevState => ({
        ...prevState,
        timeOffRequests: editEntityItem(prevState.timeOffRequests, requestId, {
            approved: true,
            finalized: true,
            finalizedBy: approverId,
            finalizedTime: Date.now(),
        })
    }));
}