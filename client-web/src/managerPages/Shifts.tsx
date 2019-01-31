import React, { useState, useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, selectors, ScheduleDays, ScheduleDayShift, Shift, State } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';

import ScheduleDay from '../components/ScheduleDay';
import ErrorMessage from '../components/ErrorMessage';

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

    const scheduleWeek = selectors.currentSchedule(state);

    return <div data-testid="manageShiftsPage">
        <ErrorMessage>{state.app.errorMessage}</ErrorMessage>
        {scheduleWeek.dayIds.map((dayId) => (
            <div key={dayId} className={css(styles.dayContainer)}>
                <ScheduleDay
                    name={scheduleWeek.days[dayId].name}
                    date={scheduleWeek.days[dayId].date}
                    shifts={scheduleWeek.days[dayId].shifts}
                    headerStyle={styles.dayHeaderContainer}
                    templateMode={true}
                    addShift={() => actions.addShift(dayId)}
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
        margin: '5px',
    },
    dayHeaderContainer: {
        width: '6em'
    },
});

export default Shifts;