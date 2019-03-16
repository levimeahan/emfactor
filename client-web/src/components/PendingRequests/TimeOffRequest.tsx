import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { utils, selectors, TimeOffRequest, UIScheduleShift, UIScheduleWeek } from "emfactor-client-core";

import useAppState from "../../hooks/useAppState";
import {formatDate, getWeekName} from '../../utils/dateTime';

import boxStyles from '../../styles/box';
import pageStyles from '../../styles/page';
import moment from 'moment';
import {colors} from "../../themes/default";

// Utils
function getWeekShifts (scheduleWeek: UIScheduleWeek, scheduledShifts: UIScheduleShift[]) {
    console.log('getWeekShifts', scheduledShifts.filter(shift => shift.weekId === scheduleWeek.id));
    return scheduledShifts.filter(shift => shift.weekId === scheduleWeek.id);
}

function formatTime(timestamp) {
    return moment(timestamp).format('HH:00');
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

    let weeksInRequest = [];
    let weekIndex = 0;
    for(let time = moment(startDate).startOf('isoWeek'); time.valueOf() < endDate; time.add({days: 7})) {
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

    return <div className={css(boxStyles.container, styles.torContainer)}>
        <h4 className={css(boxStyles.header)}>{employeeName}</h4>
        <span>{formatDate(startDate)} -> {formatDate(endDate)}</span>
        <h4 className={css(boxStyles.header, styles.scheduledShiftsHeader)}>Scheduled Shifts</h4>
        {weeksInRequest.map((week, i) => (
            <RequestedWeekOff
                key={i}
                startTime={week.startTime}
                scheduleCreated={week.index !== null}
                shifts={week.index !== null ? getWeekShifts(scheduleWeeks[week.index], scheduledShifts) : []}
            />
        ))}

        <div className={css(styles.actionsContainer)}>
            <button>Accept</button>
            <button>Decline</button>
        </div>
    </div>;
};

// Requested Week Off
const RequestedWeekOff = ({ startTime, scheduleCreated, shifts }) => (
    <div>
        <h3 className={css(pageStyles.header2)}>{getWeekName(startTime)}</h3>
        {scheduleCreated ?
            <ScheduledShiftsList shifts={shifts} />
            :
            <div>Not scheduled yet. <button>Generate Schedule Draft</button></div>
        }
    </div>
);

// Scheduled Shifts List
interface ScheduledShiftsListProps {
   shifts: UIScheduleShift[];
}
const ScheduledShiftsList = ({ shifts }: ScheduledShiftsListProps) => (
    <div>
        {shifts.map((shift, i) => (
            <div key={i} className={css(styles.scheduledShift)}>
                <span className={css(styles.scheduledShiftDate)}>{formatDate(shift.startTimestamp)}</span>
                <span>{formatTime(shift.startTimestamp)} -> {formatTime(shift.endTimestamp)}</span>
            </div>
        ))}
    </div>
);

// Styles
const styles = StyleSheet.create({
    torContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '8px 0',
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
        marginTop: '10px'
    },

    requestedWeekOff: {},
    scheduledShift: {
        display: 'flex',
        flexDirection: 'column',
        margin: '5px 0',
        padding: '5px',

        background: colors.background.secondaryDark,
    },
    scheduledShiftDate: {
        fontWeight: 'bold',
    },
});

// Export
export default TimeOffRequestComponent;