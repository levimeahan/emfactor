import React, { useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { Link } from 'react-router-dom';
import { linkStyles } from '../themes/default';

import useFormInput from '../hooks/useFormInput';
import useFormCheckbox from '../hooks/useFormCheckbox';
import useAppState from '../hooks/useAppState';

import FormInput from '../components/FormInput';
import FormCheckbox from "./FormCheckbox";

import { actions } from 'emfactor-client-core';

const AddEmployee = ({ basePath, history }) => {
    const state = useAppState();
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const roles = {
        manager: useFormCheckbox(false)
    };

    const submit = () => {
        actions.addEmployee(firstName.value, lastName.value, roles.manager.value, () => {
            history.push(basePath);
        });
    };

    return <React.Fragment>
        <Link to={basePath} className={css(linkStyles.standard)}>&lt; Back</Link>
        <h3>Add New Employee</h3>
        <span data-testid="errorMessage">{state.app.errorMessage}</span>

        <FormInput name='firstName' label='First Name' manager={firstName} />
        <FormInput name='lastName' label='Last Name' manager={lastName} />
        <FormCheckbox name='roles-manager' label='Manager' manager={roles.manager} />

        <button onClick={submit}>Submit</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({});

export default AddEmployee;