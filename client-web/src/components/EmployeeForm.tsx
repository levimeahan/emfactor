import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import ErrorMessage from './ErrorMessage';
import FormInput from './FormInput';
import FormCheckboxGroup from './FormCheckboxGroup';
import {FormCheckboxGroupManager, InputStateManager} from "../types";

interface EmployeeFormProps {
    errorMessage: string;
    firstName: InputStateManager;
    lastName: InputStateManager;
    roles: FormCheckboxGroupManager;
    submit: Function;
}

const EmployeeForm = ({errorMessage, firstName, lastName, roles, submit}: EmployeeFormProps) => {
    return <React.Fragment>
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <FormInput name='firstName' label='First Name' manager={firstName} />
        <FormInput name='lastName' label='Last Name' manager={lastName} />
        <FormCheckboxGroup name='roles' label='Roles' manager={roles} />

        <button onClick={() => submit()}>Submit</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({});

export default EmployeeForm;