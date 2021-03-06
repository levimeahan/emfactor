import store from '../../store/index';
import {Shift, Reducer, ScheduledShift} from '../../types';

import changeErrorMessage from '../../reducers/changeErrorMessage';
import editEntityItem from "../../reducers/editEntityItem";

export default function editBaseShift(shiftId: number, changedData: Partial<ScheduledShift>) {
    if(!store.getState().scheduledShifts.byId.hasOwnProperty(shiftId)) {
        store.dispatch(changeErrorMessage, 'Invalid shift!');
        return;
    }

    store.dispatch(prevState => ({
        ...prevState,
        scheduledShifts: editEntityItem(prevState.scheduledShifts, shiftId, changedData)
    }));
}