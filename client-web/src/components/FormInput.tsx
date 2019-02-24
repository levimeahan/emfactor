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
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
}

const FormInput = (props: FormInputProps) => (
    <div className={css(styles.container, props.containerStyle)}>
        {props.labelType === 'label' ?
            <FormInputLabel inputId={name} style={props.labelStyle}>{props.label}</FormInputLabel>
        : null}
        <input
            type='text'
            id={name}
            placeholder={props.labelType === 'placeholder' ? props.label : null}
            value={props.manager.value}
            onChange={e => props.manager.onChange(e.currentTarget.value)}
            onBlur={props.onBlur}
            className={css(styles.input, props.inputStyle)}
        />
    </div>
);
FormInput.defaultProps = {
    type: 'text',
    labelType: 'label',
    containerStyle: null,
    labelStyle: null,
    inputStyle: null,
    onBlur: () => {},
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