import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions } from 'emfactor-client-core';

import useAppState from "../hooks/useAppState";
import useFormCheckboxGroup from "../hooks/useFormCheckboxGroup";
import useFormInput from "../hooks/useFormInput";

import ErrorMessage from "./ErrorMessage";
import EmployeeForm from "./EmployeeForm";

const EditEmployee = ({ basePath, match,  history }) => {
    const state = useAppState();

    if(!state.employees.byId.hasOwnProperty(match.params.id)) {
        return <div>
            <ErrorMessage>Invalid employee!</ErrorMessage>
        </div>
    }

    const employee = state.employees.byId[match.params.id];

    const firstName = useFormInput(employee.firstName);
    const lastName = useFormInput(employee.lastName);
    const roles = useFormCheckboxGroup(
        state.roles.allIds.map((id) => ({
            name: state.roles.byId[id].name,
            label: state.roles.byId[id].name,
            checked: employee.roles.indexOf(id) !== -1,
            value: id,
        }))
    );
    const availability = useFormInput(employee.availability);

    const submit = () => {
        actions.editEmployee(employee.id, firstName.value, lastName.value, roles.value, availability.value, () => {
            history.push(basePath);
        });
    };

    return <div>
        <h2>Edit Employee: {employee.firstName} {employee.lastName}</h2>
        <EmployeeForm
            errorMessage={state.app.errorMessage}
            firstName={firstName}
            lastName={lastName}
            roles={roles}
            availability={availability}
            submit={submit}
        />
    </div>;
};

const styles = StyleSheet.create({});

export default EditEmployee;