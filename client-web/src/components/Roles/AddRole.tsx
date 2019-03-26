import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';

import { actions, permissions as rolePermissions } from "emfactor-client-core";

import useAppState from "../../hooks/useAppState";
import useFormInput from "../../hooks/useFormInput";
import useFormCheckboxGroup from '../../hooks/useFormCheckboxGroup';
import RoleForm from "./RoleForm";

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
        <RoleForm
            errorMessage={state.app.errorMessage}
            name={name}
            subRoles={subRoles}
            permissions={permissions}
            submit={submit}
        />
    </React.Fragment>;
};

const styles = StyleSheet.create({

});

export default AddRole;