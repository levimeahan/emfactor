import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ScheduledShift from "./ScheduledShift";

const ScheduleRow = ({ shifts }) => {
    return <div className={css(styles.rowContainer)}>
        {shifts.map((shift, i) => (
            <ScheduledShift
                key={i}
                name={shift.name}
                startTime={shift.startTime}
                endTime={shift.endTime}
                employeeName={shift.employeeName}
            />
        ))}
    </div>;
};

const styles = StyleSheet.create({
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
    }
});

export default ScheduleRow;