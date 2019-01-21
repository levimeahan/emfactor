import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { Link } from 'react-router-dom';
import { linkStyles } from '../themes/default';

import useFormInput from '../hooks/useFormInput';
import useFormCheckbox from '../hooks/useFormCheckbox';

import FormInput from '../components/FormInput';
import FormCheckbox from "./FormCheckbox";

const AddEmployee = ({ path }) => {
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const roles = {
        manager: useFormCheckbox(false)
    };

    return <React.Fragment>
        <Link to={path} className={css(linkStyles.standard)}>&lt; Back</Link>
        <h3>Add New Employee</h3>

        <FormInput name='firstName' label='First Name' manager={firstName} />
        <FormInput name='lastName' label='Last Name' manager={lastName} />
        <FormCheckbox name='roles-manager' label='Manager' manager={roles.manager} />

        <button onClick={() => console.log('hi', firstName.value, lastName.value, roles.manager.value)}>Submit</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({});

export default AddEmployee;