import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {InputStateManager} from "../types";

interface FormInputProps {
    type: string;
    name: string;
    label: string;
    labelType: 'label'|'placeholder';
    manager: InputStateManager
}

const FormInput = ({ name, label, labelType, type, manager }: FormInputProps) => (
    <React.Fragment>
        {labelType === 'label' ?
            <label htmlFor={name}>{label}</label>
        : null}
        <input
            type='text'
            id={name}
            placeholder={labelType === 'placeholder' ? label : null}
            value={manager.value}
            onChange={manager.onChange}
        />
    </React.Fragment>
);
FormInput.defaultProps = {
    type: 'text',
    labelType: 'label'
};

const styles = StyleSheet.create({});

export default FormInput;