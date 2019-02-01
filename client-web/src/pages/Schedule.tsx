import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';

import ScheduleDay from '../components/ScheduleDay';
import useAppState from '../hooks/useAppState';

const Schedule = () => {
    const state = useAppState();
    const scheduleWeek = selectors.currentScheduleWeek(state);

    const [editing, setEditing] = useState(false);

    return <div className={css(styles.container)} data-testid="schedulePage">
        <div>
            <button onClick={() => setEditing(!editing)}>Toggle Edit</button>
        </div>
        {scheduleWeek.dayIds.map((dayId) => (
            <div key={dayId} className={css(styles.dayContainer)}>
                <ScheduleDay
                    name={scheduleWeek.days[dayId].name}
                    date={scheduleWeek.days[dayId].date}
                    shifts={scheduleWeek.days[dayId].shifts}
                    headerStyle={styles.dayHeaderContainer}
                    mode={editing ? 'ASSIGN' : 'DISPLAY'}
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


export default Schedule;