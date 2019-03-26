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

    const roleToEdit = state.roles.byId[match.params.id];

    const name = useFormInput(roleToEdit.name);
    const permissions = useFormCheckboxGroup(
        Object.keys(rolePermissions).map((name) => ({
            name: name,
            value: name,
            label: rolePermissions[name].label,
            checked: roleToEdit.permissions.indexOf(name as keyof types.Permissions) !== -1,
        }))
    );
    const subRoles = useFormCheckboxGroup(
        state.roles.allIds
            // Don't want to allow this role or roles which have this one as a sub-role (circular sub-roles)
            .filter(id => id !== roleToEdit.id && state.roles.byId[id].subRoles.indexOf(roleToEdit.id) === -1)
            .map(id => {
                let role = state.roles.byId[id];
                return {
                    name: role.name,
                    label: role.name,
                    value: role.id,
                    checked: roleToEdit.subRoles.indexOf(role.id) !== -1,
                };
            })
    );

    const submit = () => {
        actions.roles.editRole(roleToEdit.id, { name: name.value, permissions: permissions.value, subRoles: subRoles.value }, () => {
            history.push(basePath);
        });
    };

    return <div>
        <h2>Edit Role: {roleToEdit.name}</h2>
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