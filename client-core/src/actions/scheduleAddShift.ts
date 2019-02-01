import store from '../store';
import network from '../network';

import changeErrorMessage from '../reducers/changeErrorMessage';

import { Shift, Reducer } from '../types';
import {ShiftResponse} from "../types/serverResponses";


export default function addShift(day) {
    network.post('/shifts/add', { day })
        .then((response) => {
            let shiftResponse = response as ShiftResponse;

            if(shiftResponse.success) {
                store.dispatch(shiftAddSuccess, shiftResponse.shift);
            }
            else {
                store.dispatch(changeErrorMessage, shiftResponse.errorMessage);
            }
        })
        .catch((error) => {
            store.dispatch(changeErrorMessage, JSON.stringify(error));
        });
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