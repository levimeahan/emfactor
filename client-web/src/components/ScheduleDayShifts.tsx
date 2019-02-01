import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, UIScheduleShift } from 'emfactor-client-core';

import spreadShiftsToRows from '../utils/spreadShiftsToRows';
import ScheduleRow from "./ScheduleRow";

import { ScheduleMode } from '../types';

interface ScheduleDayShiftsProps {
    shifts: UIScheduleShift[];
    mode: ScheduleMode;
}

const ScheduleDayShifts = ({ shifts, mode }: ScheduleDayShiftsProps) => {
    let rows = spreadShiftsToRows(shifts);

    return <div className={css(styles.sdsContainer)}>
        {rows.map((row, i) => (
            <ScheduleRow
                key={i}
                shifts={row}
                mode={mode}
            />
        ))}
    </div>;
};

const styles = StyleSheet.create({
    sdsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },

});

export default ScheduleDayShifts;