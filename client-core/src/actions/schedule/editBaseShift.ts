import store from '../../store/index';
import { Shift, Reducer } from '../../types';

import changeErrorMessage from '../../reducers/changeErrorMessage';
import editEntityItem from "../../reducers/editEntityItem";

export default function editBaseShift(baseShiftId: number, changedData: Partial<Shift>) {
    if(!store.getState().shifts.byId.hasOwnProperty(baseShiftId)) {
        store.dispatch(changeErrorMessage, 'Invalid shift!');
        return;
    }


    store.dispatch(prevState => ({
        ...prevState,
        shifts: editEntityItem(prevState.shifts, baseShiftId, changedData)
    }));
}