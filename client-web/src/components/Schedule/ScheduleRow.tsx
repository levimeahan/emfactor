import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import ScheduleShift from "./ScheduleShift";

import { selectors, UIScheduleShift } from 'emfactor-client-core';
import calcShiftWidth from "../../utils/calcShiftWidth";
import {ScheduleDayActions, ScheduleMode} from "../../types";
import useAppState from "../../hooks/useAppState";

interface ScheduleRowProps {
    shifts: UIScheduleShift[];
    actions: ScheduleDayActions;
    mode: ScheduleMode;
}

/**
 * Displays a row of shifts and adds space between them according to their start/end times so that proportions of the row
 * directly correspond to hours in the day
 */
const ScheduleRow = ({ shifts, actions, mode }: ScheduleRowProps) => {
    const state = useAppState();

    const allRoles = selectors.rolesArray(state);

    let renderItems = [];
    shifts.forEach((shift, i) => {
        let timeElapsed = 0;
        if(i > 0) {
            timeElapsed = shift.startHour - shifts[i - 1].endHour;
        }
        else {
            timeElapsed = shift.startHour;
        }


        if(timeElapsed > 0) {
            renderItems.push(<Spacer key={'spacer' + i} time={timeElapsed} />)
        }

        renderItems.push(
            <ScheduleShift
                key={i}
                name={shift.name}
                startHour={shift.startHour}
                endHour={shift.endHour}
                employeeId={shift.employeeId}
                employeeName={shift.employeeName}
                employeeOptions={selectors.availableEmployees(state, shift.id)}
                roleId={shift.roleId}
                allRoles={allRoles}
                edit={(data) => actions.editShift(shift.id, data)}
                assign={(employeeId) => actions.assignShift(shift.id, shift.baseShiftId, employeeId)}
                mode={mode}
            />
        );
    });
    if(shifts[shifts.length - 1].endHour < 24) {
        renderItems.push(<Spacer key={'spacer' + shifts.length} time={24 - shifts[shifts.length - 1].endHour} />);
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