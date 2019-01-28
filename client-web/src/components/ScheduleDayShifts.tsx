import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, ScheduleDayShift } from 'emfactor-client-core';

import spreadShiftsToRows from '../utils/spreadShiftsToRows';

import ScheduleRow from "./ScheduleRow";

interface ScheduleDayShiftsProps {
    shifts: ScheduleDayShift[];
    templateMode: boolean;
}

const ScheduleDayShifts = ({ shifts, templateMode }: ScheduleDayShiftsProps) => {
    let rows = spreadShiftsToRows(shifts);

    return <div className={css(styles.sdsContainer)}>
        {rows.map((row, i) => (
            <ScheduleRow
                key={i}
                shifts={row}
                templateMode={templateMode}
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