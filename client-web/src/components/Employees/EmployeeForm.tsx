import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import ErrorMessage from '../ErrorMessage';
import FormInput from '../Form/FormInput';
import FormCheckboxGroup from '../Form/FormCheckboxGroup';
import FormAvailabilitySelect from '../Form/FormAvailabilitySelect';
import {FormCheckboxGroupManager, InputStateManager} from "../../types";

import { Availability } from "emfactor-client-core";

interface EmployeeFormProps {
    errorMessage: string;
    firstName: InputStateManager;
    lastName: InputStateManager;
    availability: InputStateManager<Availability>;
    roles: FormCheckboxGroupManager;
    submit: Function;
}

const EmployeeForm = ({errorMessage, firstName, lastName, roles, availability, submit}: EmployeeFormProps) => {
    return <React.Fragment>
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <FormInput
            name='firstName'
            label='First Name'
            manager={firstName}
            containerStyle={styles.inputContainer}
        />
        <FormInput
            name='lastName'
            label='Last Name'
            manager={lastName}
            containerStyle={styles.inputContainer}
        />
        <FormCheckboxGroup
            name='roles'
            label='Roles'
            manager={roles}
        />
        <FormAvailabilitySelect manager={availability} />

        <button onClick={() => submit()}>Submit</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({
    inputContainer: {
        margin: '10px 0',
    }
});

export default EmployeeForm;