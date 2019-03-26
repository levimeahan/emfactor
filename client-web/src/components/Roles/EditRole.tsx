import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, permissions as rolePermissions, types } from "emfactor-client-core";

import useAppState from "../../hooks/useAppState";
import useFormCheckboxGroup from "../../hooks/useFormCheckboxGroup";
import useFormInput from "../../hooks/useFormInput";

import ErrorMessage from "../ErrorMessage";
import RoleForm from "./RoleForm";

const EditRole = ({ basePath, match, history }) => {
    const state = useAppState();

    if(!state.roles.byId.hasOwnProperty(match.params.id)) {
        return <div>
            <ErrorMessage>Invalid role!</ErrorMessage>
        </div>
    }

    const role = state.roles.byId[match.params.id];

    const name = useFormInput(role.name);
    const permissions = useFormCheckboxGroup(
        Object.keys(rolePermissions).map((name) => ({
            name: name,
            value: name,
            label: rolePermissions[name].label,
            checked: role.permissions.indexOf(name as keyof types.Permissions) !== -1,
        }))
    );
    const subRoles = useFormCheckboxGroup([
        {
            name: 'employee',
            label: 'Employee',
            value: 1,
            checked: role.subRoles.indexOf(1) !== -1,
        }
    ]);

    const submit = () => {
        actions.roles.editRole(role.id, { name: name.value, permissions: permissions.value, subRoles: subRoles.value }, () => {
            history.push(basePath);
        });
    };

    return <div>
        <h2>Edit Role: {role.name}</h2>
        <RoleForm
            errorMessage={state.app.errorMessage}
            name={name}
            subRoles={subRoles}
            permissions={permissions}
            submit={submit}
        />
    </div>;
};

const styles = StyleSheet.create({});

export default EditRole;