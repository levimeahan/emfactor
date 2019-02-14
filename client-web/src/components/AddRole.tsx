import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';

import { actions, permissions as rolePermissions } from 'emfactor-client-core';

import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';
import FormCheckboxGroup from "./FormCheckboxGroup";

import useAppState from "../hooks/useAppState";
import useFormInput from "../hooks/useFormInput";
import useFormCheckboxGroup from '../hooks/useFormCheckboxGroup';

const AddRole = ({ basePath, history }) => {
    const state = useAppState();

    const name = useFormInput('');
    const permissions = useFormCheckboxGroup(
        Object.keys(rolePermissions).map(name => ({
            name: name,
            value: name,
            label: rolePermissions[name].label,
            checked: false,
        }))
    );
    const subRoles = useFormCheckboxGroup([
        {
            name: 'employee',
            label: 'Employee',
            value: 1,
            checked: false,
        }
    ]);

    const submit = () => {
        actions.addRole(name.value, permissions.value, subRoles.value, () => {
            history.push(basePath);
        });
    };

    return <React.Fragment>
        <h2>Add New Role</h2>
        <ErrorMessage>{state.app.errorMessage}</ErrorMessage>

        <FormInput
            name='name'
            label='Name'
            manager={name}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
        />

        <FormCheckboxGroup
            name='permissions'
            label='Permissions'
            manager={permissions}
        />

        <FormCheckboxGroup
            name='subRoles'
            label='Sub-Roles'
            manager={subRoles}
        />

        <button onClick={submit} className={css(styles.submitButton)}>Submit</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({
    inputContainer: {
        margin: '8px 0',
    },
    inputLabel: {
        fontWeight: 'bold',
    },
    submitButton: {
        marginTop: '10px',
    },
});

export default AddRole;