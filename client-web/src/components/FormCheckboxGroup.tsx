import React, { useState } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import FormCheckbox from './FormCheckbox';
import {ObjectInputStateManager} from "../types";

interface FormCheckboxGroupProps {
    name: string;
    label: string;
    manager: ObjectInputStateManager,
}

const FormCheckboxGroup = ({ name, label, manager }) => {
    return <div className={css(styles.container)}>
        <label className={css(styles.label)}>{label}</label>
        <ul className={css(styles.list)}>
            {manager.options.map((option, i) => (
                <li key={i} className={css(styles.listItem)}>
                    <FormCheckbox
                        name={option.name}
                        label={option.label}
                        manager={{
                            value: option.checked,
                            onChange: (checked) => manager.onChange(i, checked)
                        }}
                    />
                </li>
            ))}
        </ul>
    </div>
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        fontWeight: 'bold',
    },
    list: {
        display: 'block',
        margin: '3px 0 0',
        padding: '0'
    },
    listItem: {
        listStyle: 'none',
        marginLeft: '8px',
    },
});

export default FormCheckboxGroup;