import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {InputStateManager} from "../../types";

interface FormCheckboxProps {
    name: string;
    label: string;
    manager: InputStateManager;
}

const FormCheckbox = ({ name, label, manager }: FormCheckboxProps) => (
    <div className={css(styles.container)}>
        <input
            type='checkbox'
            id={name}
            checked={manager.value}
            onChange={(e) => manager.onChange(e.currentTarget.checked)}
            className={css(styles.input)}
        />
        {label.length > 0 ?
            <label htmlFor={name} className={css(styles.label)}>{label}</label>
        : null}
    </div>
);
FormCheckbox.defaultProps = {
    checked: true,
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3px 0',
    },
    label: {
        display: 'inline-block',
        textAlign: 'left',
    },
    input: {
        margin: '3px 5px 0 5px',
        height: '14px',
        width: '14px',
    },
});

export default FormCheckbox;