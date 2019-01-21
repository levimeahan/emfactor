import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {InputStateManager} from "../types";

interface FormCheckboxProps {
    name: string;
    label: string;
    manager: InputStateManager
}

const FormCheckbox = ({ name, label, manager }: FormCheckboxProps) => (
    <React.Fragment>
        {label.length > 0 ?
            <label htmlFor={name}>{label}</label>
        : null}
        <input
            type='checkbox'
            id={name}
            value={manager.value}
            onChange={manager.onChange}
        />
    </React.Fragment>
);

const styles = StyleSheet.create({});

export default FormCheckbox;