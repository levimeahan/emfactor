import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import {Availability} from "emfactor-client-core";
import {InputStateManager} from "../types";
import FormInputLabel from "./FormInputLabel";

import arrayFromRange from "../utils/arrayFromRange";
import formatHour from '../utils/formatHour';

const hoursInDay = arrayFromRange(0, 23);


// AvailabilitySelect
interface FormAvailabilitySelectProps {
    manager: InputStateManager<Availability>,
}
const FormAvailabilitySelect = ({ manager }: FormAvailabilitySelectProps) => {
    return <div className={css(styles.container)}>
        <FormInputLabel>Availability</FormInputLabel>
        <div className={css(styles.daysContainer)}>
            {Object.keys(manager.value).map((day, i) => (
                <AvailabilitySelectDay
                    key={i}
                    name={day}
                    hours={manager.value[day]}
                    onChange={(newValue) => manager.onChange({
                        ...manager.value, [day]: newValue
                    })}
                />
            ))}
        </div>
    </div>;
};

const isAvailable = (availableHours, hour) => availableHours.substr(hour, 1) === '1';
const getToggledAvailable = (availableHours, hour) => (
    availableHours.slice(0, hour) +
    (availableHours[hour] === '1' ? '0' : '1') +
    availableHours.slice(hour + 1)
);

// AvailabilitySelectDay
interface AvailabilitySelectDay {
    name: string;
    hours: string;
}
const AvailabilitySelectDay = ({ name, hours, onChange }) => {
    return <div className={css(styles.day)}>
        <span className={css(styles.dayName)}>{name}</span>
        {hoursInDay.map((hourNum) => (
            <HourInput
                key={hourNum}
                hour={hourNum}
                selected={isAvailable(hours, hourNum)}
                onClick={() => onChange(getToggledAvailable(hours, hourNum))}
            />
        ))}
    </div>
};


const HourInput = ({ hour, selected, onClick }) => (
    <div className={css(styles.hourContainer, selected ? styles.hourSelected : null)} onClick={onClick}>
        <div className={css(styles.hour)}>{formatHour(hour)}</div>
    </div>
);

// Styles
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '4px 0',
        color: '#c0c0c0',
    },
    daysContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '420px',
        marginTop: '5px',
    },
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
    hour: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// Exports
export default FormAvailabilitySelect;
