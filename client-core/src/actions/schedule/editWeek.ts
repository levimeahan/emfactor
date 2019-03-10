import store from '../../store/index';
import {Shift, Reducer, ScheduleWeek} from '../../types';

import changeErrorMessage from '../../reducers/changeErrorMessage';
import editEntityItem from "../../reducers/editEntityItem";

export default function editWeek(weekId: number, changedData: Partial<ScheduleWeek>) {
    if(!store.getState().shifts.byId.hasOwnProperty(weekId)) {
        store.dispatch(changeErrorMessage, 'Invalid shift!');
        return;
    }

    store.dispatch(prevState => ({
        ...prevState,
        scheduleWeeks: editEntityItem(prevState.scheduleWeeks, weekId, changedData)
    }));
}