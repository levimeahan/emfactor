import React, { useState, useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, selectors, ScheduleDays, ScheduleDayShift, Shift, State } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';

import ScheduleDay from '../components/ScheduleDay';
import ErrorMessage from '../components/ErrorMessage';

let baseShifts = {
    1: {
        id: 1,
        day: 1,
        startTime: 0,
        endTime: 8,
        name: 'Sunrise / Reg 1',
        employeeId: 1,
        employeeName: 'Levi'
    },
    2: {
        id: 2,
        day: 1,
        startTime: 0,
        endTime: 8,
        name: 'Sunrise / Reg 2',
        employeeId: 1,
        employeeName: 'Kristihan'
    },

    3: {
        id: 3,
        day: 1,
        startTime: 8,
        endTime: 16,
        name: 'Day / Reg 1',
        employeeId: 2,
        employeeName: 'Teresa',
    },
    4: {
        id: 4,
        day: 1,
        startTime: 8,
        endTime: 16,
        name: 'Day / Reg 2',
        employeeId: 2,
        employeeName: 'Jenova',
    },


    5: {
        id: 5,
        day: 3,
        startTime: 16,
        endTime: 24,
        name: 'Swing / Reg 1',
        employeeId: 3,
        employeeName: 'Annette',
    },
    6: {
        id: 6,
        day: 4,
        startTime: 16,
        endTime: 24,
        name: 'Swing / Reg 2',
        employeeId: 3,
        employeeName: 'Malou',
    }
};

let scheduleWeekDays: ScheduleDays = {
    byId: {
        1: {
            name: 'Monday',
            date: '11/12',
            shifts: [],
        },
        2: {
            name: 'Tuesday',
            date: '11/13',
            shifts: [],
        },
        3: {
            name: 'Wednesday',
            date: '11/14',
            shifts: [],
        },
        4: {
            name: 'Thursday',
            date: '11/15',
            shifts: [],
        },
        5: {
            name: 'Friday',
            date: '11/16',
            shifts: [],
        },
        6: {
            name: 'Saturday',
            date: '11/17',
            shifts: [],
        },
        7: {
            name: 'Sunday',
            date: '11/18',
            shifts: [],
        },
    },
    allIds: [1, 2, 3, 4, 5, 6, 7]
};



const Shifts = () => {
    const state = useAppState();

    return <div data-testid="manageShiftsPage">
        <ErrorMessage>{state.app.errorMessage}</ErrorMessage>
        {scheduleWeekDays.allIds.map((day) => (
            <div key={day} className={css(styles.dayContainer)}>
                <ScheduleDay
                    name={scheduleWeekDays.byId[day].name}
                    date={scheduleWeekDays.byId[day].date}
                    shifts={selectors.shiftsByDay(state)[day]}
                    headerStyle={styles.dayHeaderContainer}
                    templateMode={true}
                />
            </div>
        ))}
    </div>;
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: '5px',
    },
    dayContainer: {
        display: 'flex',
        minHeight: '76px',
        margin: '5px',
        background: 'rgba(255,255,255,0.2)'
    },
    dayHeaderContainer: {
        width: '6em'
    },
});

export default Shifts;