import store from '../../store/index';
import network from '../../network';

import changeErrorMessage from '../../reducers/changeErrorMessage';

import {ScheduleWeek, Reducer, DayNumber} from '../../types';
import addEntityItem from "../../reducers/addEntityItem";
import moment from 'moment';

export default function addWeek() {
    let newestWeekTime = 0;

    let { scheduleWeeks } = store.getState();

    scheduleWeeks.allIds.forEach(id => {
        if(scheduleWeeks.byId[id].startTimestamp > newestWeekTime) {
            newestWeekTime = scheduleWeeks.byId[id].startTimestamp;
        }
    });

    store.dispatch(scheduleWeekAddSuccess, {
        startTimestamp: moment(newestWeekTime).add({weeks: 1}).valueOf(),
        draft: true,
    });
}

const scheduleWeekAddSuccess: Reducer = (prevState, newScheduleWeek: ScheduleWeek) => (
    {
        ...prevState,
        scheduleWeeks: addEntityItem(prevState.scheduleWeeks, newScheduleWeek)
    }
);