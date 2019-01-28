import store from '../store';
import { Shift, Reducer } from '../types';

import changeErrorMessage from '../reducers/changeErrorMessage';

export default function editShift(shiftId: number, changedData: Partial<Shift>) {
    if(!store.getState().shifts.byId.hasOwnProperty(shiftId)) {
        store.dispatch(changeErrorMessage, 'Invalid shift!');
        return;
    }

    store.dispatch(shiftEditSuccess, shiftId, changedData);
}

const shiftEditSuccess: Reducer = (prevState, shiftId, changedData: Partial<Shift>) => ({
    ...prevState,
    shifts: {
        ...prevState.shifts,
        byId: {
            ...prevState.shifts.byId,
            [shiftId]: {
                ...prevState.shifts.byId[shiftId],
                ...changedData
            }
        },
    }
});