import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { utils, selectors, TimeOffRequest } from "emfactor-client-core";

import useAppState from "../hooks/useAppState";
import {formatDate, getWeekName} from '../utils/dateTime';

import boxStyles from '../styles/box';

interface TimeOffRequestProps extends TimeOffRequest {
    employeeName: string;
}
const TimeOffRequestComponent = ({
    id, employeeId, employeeName, startDate, endDate, reason, approved, finalized, finalizedBy, finalizedTime
}: TimeOffRequestProps) => {
    const state = useAppState();

    const firstWeekStart = utils.getWeekStartTime(startDate);
    const lastWeekStart = utils.getWeekStartTime(endDate);

    return <div className={css(boxStyles.container, styles.torContainer)}>
        <h4 className={css(boxStyles.header)}>{employeeName}</h4>
        <span>{formatDate(startDate)} -> {formatDate(endDate)}</span>
        <h4 className={css(boxStyles.header, styles.scheduledShiftsHeader)}>Scheduled Shifts</h4>

        <div>
            Time range not scheduled yet. <button>Generate Schedules</button>
        </div>

        <div className={css(styles.actionsContainer)}>
            <button>Accept</button>
            <button>Decline</button>
        </div>
    </div>;
};

const styles = StyleSheet.create({
    torContainer: {
        display: 'flex',
        flexDirection: 'column',
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
});

export default TimeOffRequestComponent;