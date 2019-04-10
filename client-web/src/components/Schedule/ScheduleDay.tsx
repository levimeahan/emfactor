import React from 'react';
import {StyleSheet, css, StyleDeclarationValue} from 'aphrodite/no-important';

import { UIScheduleShift } from "emfactor-client-core";

import ScheduleDayShifts from './ScheduleDayShifts';
import {colors} from "../../themes/default";
import {ScheduleDayActions, ScheduleMode} from "../../types";

interface ScheduleDayProps {
    name: string;
    date: string;
    shifts: UIScheduleShift[];
    headerStyle: StyleDeclarationValue;
    mode: ScheduleMode;
    actions: ScheduleDayActions;
}

const ScheduleDay = ({ name, date, shifts, headerStyle, mode, actions }: ScheduleDayProps) => {
    return <div className={css(styles.container)}>
        <div className={css(styles.header, headerStyle)}>
            <span className={css(styles.dayName)}>{name}</span>
            {mode === 'EDIT' ?
                <button onClick={() => actions.addShift()}>Add Shift</button>
                :
                <span className={css(styles.date)}>{date}</span>
            }
        </div>
        <ScheduleDayShifts
            shifts={shifts}
            actions={actions}
            mode={mode}
        />
    </div>;
};
ScheduleDay.defaultProps = {
    mode: 'DISPLAY',
    addShift: () => {},
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minHeight: '60px',
        flexDirection: 'row',
        flexGrow: 1,
        alignSelf: 'stretch',
        background: colors.background.secondaryLight,
    },
    header: {
        alignSelf: 'stretch',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        padding: '7px 0',

        background: 'rgba(0,0,0,0.2)'
    },
    dayName: {
        textTransform: 'capitalize',
        textAlign: 'center',
        width: '6em',
    },
    date: {

    }
});

export default ScheduleDay;