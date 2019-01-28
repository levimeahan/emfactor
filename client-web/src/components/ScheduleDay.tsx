import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import ScheduleDayShifts from './ScheduleDayShifts';

const ScheduleDay = ({ name, date, shifts, headerStyle, templateMode }) => {
    return <div className={css(styles.container)}>
        <div className={css(styles.header, headerStyle)}>
            <span className={css(styles.dayName)}>{name}</span>
            {templateMode ?
                <span>Add Shift</span>
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
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        alignSelf: 'stretch',
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