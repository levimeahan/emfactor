import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import FormInput from "../Form/FormInput";
import {InputStateManager} from "../../types";
import ErrorMessage from "../ErrorMessage";
import FormCheckboxGroup from "../Form/FormCheckboxGroup";

interface RoleFormPropTypes {
    errorMessage: string;
    subRoles: InputStateManager;
    permissions: InputStateManager;
    submit: Function;
}
const RoleForm = ({ errorMessage, name, permissions, subRoles, submit }) => {
    return <div>
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <FormInput
            name='name'
            label='Name'
            manager={name}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
        />

        <FormCheckboxGroup
            name='permissions'
            label='Permissions'
            manager={permissions}
        />

        <FormCheckboxGroup
            name='subRoles'
            label='Sub-Roles'
            manager={subRoles}
        />

        <button onClick={submit} className={css(styles.submitButton)}>Submit</button>
    </div>;
};

const styles = StyleSheet.create({
    inputContainer: {
        margin: '8px 0',
    },
    inputLabel: {
        fontWeight: 'bold',
    },
    submitButton: {
        marginTop: '10px',
    },
});

export default RoleForm;