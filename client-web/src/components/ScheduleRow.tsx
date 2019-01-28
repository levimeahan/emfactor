import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ScheduleShift from "./ScheduleShift";

import { actions } from 'emfactor-client-core';

const ScheduleRow = ({ shifts, templateMode }) => {
    return <div className={css(styles.rowContainer)}>
        {shifts.map((shift, i) => (
            <ScheduleShift
                key={i}
                name={shift.name}
                startTime={shift.startTime}
                endTime={shift.endTime}
                employeeName={templateMode ? shift.employeeName : null}
                templateMode={templateMode}
                update={(data) => actions.editShift(shift.id, data)}
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