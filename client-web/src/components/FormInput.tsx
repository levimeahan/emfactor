import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import FormInputLabel from './FormInputLabel';


import {InputStateManager} from "../types";

interface FormInputProps {
    type: string;
    name: string;
    label: string;
    labelType: 'label'|'placeholder';
    manager: InputStateManager,
    containerStyle?: object,
    labelStyle?: object,
    inputStyle?: object,
}

const FormInput = ({
   name, label, labelType, type, manager, containerStyle, labelStyle, inputStyle
}: FormInputProps) => (
    <div className={css(styles.container, containerStyle)}>
        {labelType === 'label' ?
            <FormInputLabel inputId={name} style={labelStyle}>{label}</FormInputLabel>
        : null}
        <input
            type='text'
            id={name}
            placeholder={labelType === 'placeholder' ? label : null}
            value={manager.value}
            onChange={e => manager.onChange(e.currentTarget.value)}
            className={css(styles.input, inputStyle)}
        />
    </div>
);
FormInput.defaultProps = {
    type: 'text',
    labelType: 'label',
    containerStyle: null,
    labelStyle: null,
    inputStyle: null,
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    input: {
        marginTop: '4px',
    }
});

export default FormInput;