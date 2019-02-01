import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ScheduleShift from "./ScheduleShift";

import { UIScheduleShift } from 'emfactor-client-core';
import calcShiftWidth from "../utils/calcShiftWidth";
import {ScheduleMode} from "../types";

interface ScheduleRowProps {
    shifts: UIScheduleShift[];
    mode: ScheduleMode;
}

const ScheduleRow = ({ shifts, mode }: ScheduleRowProps) => {
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
            renderItems.push(<Spacer key={'spacer' + i} time={timeElapsed} />)
        }

        renderItems.push(
            <ScheduleShift
                key={i}
                id={shift.id}
                name={shift.name}
                startTime={shift.startTime}
                endTime={shift.endTime}
                employeeId={shift.employeeId}
                employeeName={shift.employeeName}
                mode={mode}
            />
        );
    });
    if(shifts[shifts.length - 1].endTime < 24) {
        renderItems.push(<Spacer key={'spacer' + shifts.length} time={24 - shifts[shifts.length - 1].endTime} />);
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