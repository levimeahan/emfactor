import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { TimeOffRequest } from "emfactor-client-core";

import { formatDate } from '../utils/dateTime';

import boxStyles from '../styles/box';

interface TimeOffRequestProps extends TimeOffRequest {
    employeeName: string;
}
const TimeOffRequestComponent = ({
    id, employeeId, employeeName, startDate, endDate, reason, approved, finalized, finalizedBy, finalizedTime
}: TimeOffRequestProps) => {

    return <div className={css(boxStyles.container, styles.torContainer)}>
        <h4 className={css(boxStyles.header)}>{employeeName}</h4>
        <span>{formatDate(startDate)} -> {formatDate(endDate)}</span>
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
});

export default TimeOffRequestComponent;