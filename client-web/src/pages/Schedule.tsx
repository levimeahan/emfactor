import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';
import ScheduleWeek from "../Schedule/ScheduleWeek";
import { getWeekName } from "../utils/dateTime";

const Schedule = () => {
    const state = useAppState();
    const scheduleWeeks = selectors.currentAndFutureScheduleWeeks(state);

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
                mode='DISPLAY'
            />
        ))}
    </div>;
};


const styles = StyleSheet.create({
    container: {

    }
});


export default Schedule;