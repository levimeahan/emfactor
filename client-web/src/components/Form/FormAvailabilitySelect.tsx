import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import {Availability} from "emfactor-client-core";

import { SelectableGroup } from 'react-selectable-fast'

import {InputStateManager} from "../../types";
import FormInputLabel from "./FormInputLabel";

import AvailabilitySelectDay from './AvailabilitySelectDay';
import {colors} from "../../themes/default";

// AvailabilitySelect
interface FormAvailabilitySelectProps {
    manager: InputStateManager<Availability>,
}
const FormAvailabilitySelect = ({ manager }: FormAvailabilitySelectProps) => {
    const updateAvailability = (selectedItems) => manager.onChange(mapSelectedItemsToAvailability(selectedItems));

    return <div className={css(styles.container)}>
        <FormInputLabel>Availability</FormInputLabel>
        <span className={css(styles.dragHint)}>Click and drag a rectangle to select multiple times</span>
        <SelectableGroup
            className={css(styles.daysContainer)}
            enableDeselect
            selectboxClassName={css(styles.selectBox)}
            onSelectionClear={updateAvailability}
            onSelectionFinish={updateAvailability}
        >
            {Object.keys(manager.value).map((day, i) => (
                <AvailabilitySelectDay
                    key={i}
                    name={day}
                    hours={manager.value[day]}
                />
            ))}
        </SelectableGroup>
    </div>;
};

// Utils
const getChangedHourAvailability = (availableHours, hour, val) => (
    availableHours.slice(0, hour) +
    val +
    availableHours.slice(hour + 1)
);

const mapSelectedItemsToAvailability = (selectedItems) => {
    const availability: Availability = {
        mon: '0'.repeat(24),
        tue: '0'.repeat(24),
        wed: '0'.repeat(24),
        thu: '0'.repeat(24),
        fri: '0'.repeat(24),
        sat: '0'.repeat(24),
        sun: '0'.repeat(24),
    };

    selectedItems.forEach((item) => {
        if(!availability.hasOwnProperty(item.props.day)) {
            return;
        }

        availability[item.props.day] = getChangedHourAvailability(availability[item.props.day], item.props.hour, '1');
    });

    return availability;
};

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
    dragHint: {
        // fontStyle: 'italic',
        color: colors.text.dark,
    },
    selectBox: {
        zIndex: 9000,
        position: 'absolute',
        cursor: 'default',
        background: 'none',
        border: '1px dashed #c0c0c0',
    },
});

// Exports
export default FormAvailabilitySelect;
