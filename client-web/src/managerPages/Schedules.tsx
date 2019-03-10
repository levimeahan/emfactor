import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { actions, selectors } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';
import ScheduleWeek from "../components/Schedule/ScheduleWeek";
import { getWeekName } from "../utils/dateTime";

const Schedules = () => {
    const state = useAppState();
    const scheduleWeeks = selectors.assignableScheduleWeeks(state);

    return <div className={css(styles.container)} data-testid="schedulePage">
        {scheduleWeeks.map((week, i) => (
            <ScheduleWeek
                key={i}
                id={week.id}
                name={getWeekName(week.startTimestamp)}
                startTimestamp={week.startTimestamp}
                draft={week.draft}
                days={week.days}
                dayIds={week.dayIds}
                mode='ASSIGN'
                setDraft={(draft) => actions.editScheduleWeek(week.id, { draft })}
            />
        ))}
        <button
            className={css(styles.addWeekButton)}
            onClick={() => actions.addScheduleWeek()}
        >
            Add Week
        </button>
    </div>;
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    addWeekButton: {
        margin: '0 8px 8px',
    },
});

export default Schedules;
