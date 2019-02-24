import store from '../store';

import changeErrorMessage from '../reducers/changeErrorMessage';
import addEntityItem from '../reducers/addEntityItem';

import {Employee, EntityCollection, Reducer, TimeOffRequest } from '../types';

export default function requestTimeOff(
    employeeId,
    startDate: Date,
    endDate: Date,
    onSuccess: Function = null,
) {

    const newRequest: TimeOffRequest = {
        id: null,
        employeeId: employeeId,
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
        reason: '',
        approved: false,
        finalized: false,
        finalizedBy: null,
        finalizedTime: null,
    };

    store.dispatch((prevState) => ({
        ...prevState,
        timeOffRequests: addEntityItem(prevState.timeOffRequests, newRequest)
    }));

    if(onSuccess) {
        onSuccess();
    }
}
