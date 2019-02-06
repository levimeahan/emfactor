import React, { useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { Link } from 'react-router-dom';
import { linkThemes } from '../themes/default';

import useFormInput from '../hooks/useFormInput';
import useAppState from '../hooks/useAppState';

import FormInput from '../components/FormInput';
import FormCheckbox from "./FormCheckbox";

import { actions } from 'emfactor-client-core';
import ErrorMessage from "./ErrorMessage";

const AddEmployee = ({ basePath, history }) => {
    const state = useAppState();
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const roles = {
        manager: useFormInput(false)
    };

    const submit = () => {
        actions.addEmployee(firstName.value, lastName.value, roles.manager.value, () => {
            history.push(basePath);
        });
    };

    return <React.Fragment>
        <Link to={basePath} className={css(linkThemes.standard)}>&lt; Back</Link>
        <h3>Add New Employee</h3>
        <ErrorMessage>{state.app.errorMessage}</ErrorMessage>

        <FormInput name='firstName' label='First Name' manager={firstName} />
        <FormInput name='lastName' label='Last Name' manager={lastName} />
        <FormCheckbox name='roles-manager' label='Manager' manager={roles.manager} />

        <button onClick={submit}>Submit</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({});

export default AddEmployee;