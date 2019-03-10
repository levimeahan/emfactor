import React, { useState, useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, selectors } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';

import ScheduleDay from '../components/Schedule/ScheduleDay';
import ErrorMessage from '../components/ErrorMessage';

const Shifts = () => {
    const state = useAppState();

    const allShiftsWeek = selectors.allShiftsWeek(state);

    return <div data-testid="manageShiftsPage">
        <ErrorMessage>{state.app.errorMessage}</ErrorMessage>
        {allShiftsWeek.dayIds.map((dayId) => (
            <div key={dayId} className={css(styles.dayContainer)}>
                <ScheduleDay
                    name={allShiftsWeek.days[dayId].weekday}
                    date={''}
                    shifts={allShiftsWeek.days[dayId].shifts}
                    headerStyle={styles.dayHeaderContainer}
                    mode='EDIT'
                    actions={{
                        addShift: () => actions.addShift(dayId),
                        editShift: actions.editShift,
                        assignShift: null,
                    }}
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