import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import ScheduleDayShifts from './ScheduleDayShifts';
import {colors} from "../themes/default";

const ScheduleDay = ({ name, date, shifts, headerStyle, templateMode, addShift }) => {
    return <div className={css(styles.container)}>
        <div className={css(styles.header, headerStyle)}>
            <span className={css(styles.dayName)}>{name}</span>
            {templateMode ?
                <button onClick={addShift}>Add Shift</button>
                :
                <span className={css(styles.date)}>{date}</span>
            }
        </div>
        <ScheduleDayShifts
            shifts={shifts}
            templateMode={templateMode}
        />
    </div>;
};
ScheduleDay.defaultProps = {
    templateMode: false,
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
        width: '6em',
    },
    date: {

    }
});

export default ScheduleDay;