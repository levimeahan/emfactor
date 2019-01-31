import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ScheduleShift from "./ScheduleShift";

import { actions } from 'emfactor-client-core';
import calcShiftWidth from "../utils/calcShiftWidth";

const ScheduleRow = ({ shifts, templateMode }) => {
    let renderItems = [];
    shifts.forEach((shift, i) => {
        let timeElapsed = 0;
        if(i > 0) {
            timeElapsed = shift.startTime - shifts[i - 1].endTime;
        }
        else {
            timeElapsed = shift.startTime;
        }


        if(timeElapsed > 0) {
            renderItems.push(<Spacer time={timeElapsed} />)
        }

        renderItems.push(
            <ScheduleShift
                key={i}
                name={shift.name}
                startTime={shift.startTime}
                endTime={shift.endTime}
                employeeName={templateMode ? shift.employeeName : null}
                templateMode={templateMode}
                update={(data) => actions.editShift(shift.id, data)}
            />
        );
    });
    if(shifts[shifts.length - 1].endTime < 24) {
        renderItems.push(<Spacer time={24 - shifts[shifts.length - 1].endTime} />);
    }

    return <div className={css(styles.rowContainer)}>
        {renderItems}
    </div>;
};

const Spacer = ({ time }) => (
    <div className={css(styles.spacer)} style={{ width: `${calcShiftWidth(time)}%` }}>&nbsp;</div>
);

const styles = StyleSheet.create({
    spacer: {
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-evenly',
    }
});

export default ScheduleRow;