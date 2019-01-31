import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { ScheduleDays, ScheduleDayShift, Shift } from 'emfactor-client-core';

import ScheduleDay from '../components/ScheduleDay';
import {colors} from "../themes/default";

let baseShifts = [
    {
        id: 1,
        startTime: 0,
        endTime: 8,
        name: 'Reg 1',
        employeeId: 1,
        employeeName: 'Levi'
    },
    {
        id: 1,
        startTime: 0,
        endTime: 8,
        name: 'Reg 2',
        employeeId: 1,
        employeeName: 'Kristihan'
    },

    {
        id: 1,
        startTime: 8,
        endTime: 16,
        name: 'Reg 1',
        employeeId: 2,
        employeeName: 'Teresa',
    },
    {
        id: 1,
        startTime: 8,
        endTime: 16,
        name: 'Reg 2',
        employeeId: 2,
        employeeName: 'Jenova',
    },


    {
        id: 1,
        startTime: 16,
        endTime: 24,
        name: 'Reg 1',
        employeeId: 3,
        employeeName: 'Annette',
    },
    {
        id: 1,
        startTime: 16,
        endTime: 24,
        name: 'Reg 2',
        employeeId: 3,
        employeeName: 'Malou',
    }
];

let scheduleWeekDays: ScheduleDays = {
    byId: {
        1: {
            name: 'Monday',
            date: '11/12',
            shifts: [
                ...baseShifts
            ]
        },
        2: {
            name: 'Tuesday',
            date: '11/13',
            shifts: [
                ...baseShifts
            ]
        },
        3: {
            name: 'Wednesday',
            date: '11/14',
            shifts: [
                ...baseShifts
            ]
        },
        4: {
            name: 'Thursday',
            date: '11/15',
            shifts: [
                ...baseShifts
            ]
        },
        5: {
            name: 'Friday',
            date: '11/16',
            shifts: [
                ...baseShifts
            ]
        },
        6: {
            name: 'Saturday',
            date: '11/17',
            shifts: [
                ...baseShifts
            ]
        },
        7: {
            name: 'Sunday',
            date: '11/18',
            shifts: [
                ...baseShifts
            ]
        },
    },
    allIds: [1, 2, 3, 4, 5, 6, 7]
};


const Schedule = () => {
    return <div className={css(styles.container)} data-testid="schedulePage">
        {scheduleWeekDays.allIds.map((day) => (
            <div key={day} className={css(styles.dayContainer)}>
                <ScheduleDay
                    name={scheduleWeekDays.byId[day].name}
                    date={scheduleWeekDays.byId[day].date}
                    shifts={scheduleWeekDays.byId[day].shifts}
                    headerStyle={styles.dayHeaderContainer}
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