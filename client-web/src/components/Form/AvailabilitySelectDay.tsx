import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { createSelectable } from 'react-selectable-fast';

import arrayFromRange from "../../utils/arrayFromRange";
import formatShiftHour from "../../utils/formatShiftHour";

const hoursInDay = arrayFromRange(0, 23);

// AvailabilitySelectDay
const AvailabilitySelectDay = ({ name, hours }) => {
    return <div className={css(styles.day)} data-testid={`availability-${name}`}>
        <span className={css(styles.dayName)}>{name}</span>
        {hoursInDay.map((hourNum) => (
            <SelectableHourInput
                key={hourNum}
                day={name}
                hour={hourNum}
                selected={isAvailable(hours, hourNum)}
                onClick={() => {}}
            />
        ))}
    </div>
};

// onClick={() => onChange(getToggledAvailable(hours, hourNum))}

const HourInput = ({ selectableRef, hour, selected, selecting, onClick }) => (
    <div
        ref={selectableRef}
        className={css(styles.hourContainer, selected ? styles.hourSelected : null, selecting ? styles.hourSelecting : null)}
        onClick={onClick}
    >
        <div className={css(styles.hour)}>{formatShiftHour(hour)}</div>
    </div>
);

const SelectableHourInput = createSelectable(HourInput);

// Utils
const isAvailable = (availableHours, hour) => availableHours.substr(hour, 1) === '1';

// Styles
const styles = StyleSheet.create({
    day: {
        display: 'flex',
        flexDirection: 'column',

        width: '14.0%',
        background: '#303030',

        alignItems: 'center',
    },
    dayName: {
        textTransform: 'capitalize',
        padding: '5px 0',
        background: '#282828',
        alignSelf: 'stretch',
    },

    hourContainer: {
        alignSelf: 'stretch',
        boxSizing: 'border-box',
        padding: '5px',
        cursor: 'pointer',
        ':hover': {
            background: 'rgba(0,0,0,0.1)',
        },
    },
    hourSelected: {
        background: 'rgba(0,0,0,0.2)',
        ':hover': {
            background: 'rgba(0,0,0,0.2)',
        },
    },
    hourSelecting: {
        background: 'rgba(0,0,0,0.1)',
    },
    hour: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AvailabilitySelectDay;