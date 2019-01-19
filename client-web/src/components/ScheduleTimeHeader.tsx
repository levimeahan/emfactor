import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const ScheduleTimeHeader = () => {
    return <div>
        <div className={css(styles.timeHeader)}>
            <span className={css(styles.timeLabel)}>Midnight</span>
            <span className={css(styles.timeLabel)}>4 AM</span>
            <span className={css(styles.timeLabel)}>8 AM</span>
            <span className={css(styles.timeLabel)}>Noon</span>
            <span className={css(styles.timeLabel)}>4 PM</span>
            <span className={css(styles.timeLabel)}>8 PM</span>
            <span className={css(styles.timeLabel)}>Midnight</span>
        </div>
    </div>;
};

const styles = StyleSheet.create({
    timeHeader: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    timeLabel: {
        width: '4.5em',
    },
});

export default ScheduleTimeHeader;