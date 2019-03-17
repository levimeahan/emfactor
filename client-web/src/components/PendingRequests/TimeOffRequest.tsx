import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import moment from 'moment';

import { utils, actions, selectors, TimeOffRequest, UIScheduleShift, UIScheduleWeek } from "emfactor-client-core";

import RequestedWeekOff from './RequestedWeekOff';

import useAppState from "../../hooks/useAppState";
import {formatDate, getWeekName} from '../../utils/dateTime';

import boxStyles from '../../styles/box';

// Utils
function getWeekShifts (scheduleWeek: UIScheduleWeek, scheduledShifts: UIScheduleShift[]) {
    console.log('getWeekShifts', scheduledShifts.filter(shift => shift.weekId === scheduleWeek.id));
    return scheduledShifts.filter(shift => shift.weekId === scheduleWeek.id);
}


interface RequestWeek {
    startTime: number;
    index: number;
}
function getRequestWeeks(scheduleWeeks: UIScheduleWeek[], startTimestamp: number, endTimestamp: number): RequestWeek[] {
    let weeksInRequest = [];
    let weekIndex = 0;
    for(let time = moment(startTimestamp).startOf('isoWeek'); time.valueOf() < endTimestamp; time.add({days: 7})) {
        while(weekIndex < scheduleWeeks.length && scheduleWeeks[weekIndex].startTimestamp < time.valueOf()) {
            weekIndex++;
        }

        let index = null;
        if(weekIndex < scheduleWeeks.length && scheduleWeeks[weekIndex].startTimestamp === time.valueOf()) {
            index = weekIndex;
        }

        weeksInRequest.push({
            startTime: time.valueOf(),
            index: index,
        });
    }

    return weeksInRequest;
}

// Time Off Request
interface TimeOffRequestProps extends TimeOffRequest {
    employeeName: string;
}
const TimeOffRequestComponent = ({
    id, employeeId, employeeName, startDate, endDate, reason, approved, finalized, finalizedBy, finalizedTime
}: TimeOffRequestProps) => {
    const state = useAppState();

    const scheduleWeeks = selectors.scheduleWeekRange(state, startDate, endDate);
    const scheduledShifts = selectors.employeeScheduledShifts(state, employeeId, startDate, endDate);

    let weeksInRequest = getRequestWeeks(scheduleWeeks, startDate, endDate);

    return <div className={css(boxStyles.container, styles.torContainer)}>
        <h4 className={css(boxStyles.header)}>{employeeName}</h4>
        <span>{formatDate(startDate, 'long')} &rarr; {formatDate(endDate, 'long')}</span>
        <h4 className={css(styles.scheduledShiftsHeader)}>Scheduled Shifts</h4>
        {weeksInRequest.map((week, i) => (
            <RequestedWeekOff
                key={i}
                weekId={week.index !== null ? scheduleWeeks[week.index].id : null}
                startTime={week.startTime}
                scheduleCreated={week.index !== null}
                shifts={week.index !== null ? getWeekShifts(scheduleWeeks[week.index], scheduledShifts) : []}
            />
        ))}

        <div className={css(styles.actionsContainer)}>
            <button onClick={() => actions.requests.approveTimeOff(id, state.app.userEmployeeId)}>Accept</button>
            <button onClick={() => actions.requests.declineTimeOff(id, state.app.userEmployeeId)}>Decline</button>
        </div>
    </div>;
};

// Styles
const styles = StyleSheet.create({
    torContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '8px 0',
        width: '90%',
        maxWidth: '40em',
    },
    employeeName: {

    },
    actionsContainer: {
        display: 'flex',
        margin: '15px 0 7px',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    scheduledShiftsHeader: {
        margin: '15px 0 5px',
        fontWeight: 'bold',
    },
});

// Export
export default TimeOffRequestComponent;