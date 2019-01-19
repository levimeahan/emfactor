import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { colors, sizes } from '../themes/default';

const calcWidth = (startTime, endTime) => (
    ((endTime - startTime) / 24) * 100
);

const formatTime = (hour) => {
    if(hour == 0 || hour == 24) {
        return '12 AM';
    }

    if(hour == 12) {
        return '12 PM';
    }

    if(hour > 12) {
        return `${hour - 12} PM`;
    }
    else {
        return `${hour} AM`;
    }
};

const ScheduledShift = ({name, startTime, endTime, employeeName}) => {
    return <div className={css(styles.container)} style={{ width: calcWidth(startTime, endTime) + '%' }}>
        <div className={css(styles.shiftContent)}>
            <span className={css(styles.time, styles.startTime)}>{formatTime(startTime)}</span>
            <span className={css(styles.employeeName)}>{employeeName}</span>
            <span className={css(styles.time, styles.endTime)}>{formatTime(endTime)}</span>
        </div>
    </div>;
};

const styles = StyleSheet.create({
    container: {
        margin: '5px',
        alignSelf: 'center',
        backgroundColor: '#3a3a3a',
    },
    shiftContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3px 5px',
    },
    time: {
        fontSize: sizes.primaryFont - 2,
        color: colors.text.dark,
        width: '4.5em',
    },
    startTime: {
        textAlign: 'left',
    },
    endTime: {
        textAlign: 'right',
    },
    employeeName: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontFamily: 'Lucida Sans Unicode',
        color: colors.text.semiBright,
    },
    shiftName: {
        margin: 0,
        fontSize: '10px',
        backgroundColor: '#333',
    }
});

export default ScheduledShift;