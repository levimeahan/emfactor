import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { UIScheduleShift } from 'emfactor-client-core';

import spreadShiftsToRows from '../utils/spreadShiftsToRows';
import ScheduleRow from "./ScheduleRow";

import {ScheduleDayActions, ScheduleMode} from '../types';

interface ScheduleDayShiftsProps {
    shifts: UIScheduleShift[];
    actions: ScheduleDayActions;
    mode: ScheduleMode;
}

const ScheduleDayShifts = ({ shifts, actions, mode }: ScheduleDayShiftsProps) => {
    let rows = spreadShiftsToRows(shifts);

    return <div className={css(styles.sdsContainer)}>
        {rows.map((row, i) => (
            <ScheduleRow
                key={i}
                shifts={row}
                actions={actions}
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