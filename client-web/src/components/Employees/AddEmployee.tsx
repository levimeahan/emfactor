import React, { useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { Link } from 'react-router-dom';
import { linkThemes } from '../../themes/default';

import useFormInput from '../../hooks/useFormInput';
import useAppState from '../../hooks/useAppState';

import FormInput from '../Form/FormInput';
import FormCheckbox from "../Form/FormCheckbox";

import { actions } from "emfactor-client-core";
import ErrorMessage from "../ErrorMessage";
import EmployeeForm from "./EmployeeForm";
import useFormCheckboxGroup from "../../hooks/useFormCheckboxGroup";

const AddEmployee = ({ basePath, history }) => {
    const state = useAppState();
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const roles = useFormCheckboxGroup(
        state.roles.allIds.map((id) => ({
            name: state.roles.byId[id].name,
            label: state.roles.byId[id].name,
            checked: false,
            value: id,
        }))
    );
    const availability = useFormInput({
        mon: '0'.repeat(24),
        tue: '0'.repeat(24),
        wed: '0'.repeat(24),
        thu: '0'.repeat(24),
        fri: '0'.repeat(24),
        sat: '0'.repeat(24),
        sun: '0'.repeat(24),
    });

    const submit = () => {
        actions.addEmployee(firstName.value, lastName.value, roles.value, availability.value, () => {
            history.push(basePath);
        });
    };

    return <React.Fragment>
        <h2>Add New Employee</h2>
        <EmployeeForm
            errorMessage={state.app.errorMessage}
            firstName={firstName}
            lastName={lastName}
            roles={roles}
            availability={availability}
            submit={submit}
        />
    </React.Fragment>;
};

const styles = StyleSheet.create({});

export default AddEmployee;