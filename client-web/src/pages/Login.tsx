import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useFormInput from '../hooks/useFormInput';
import { actions } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';

import FormInput from '../components/Form/FormInput';

const Login = () => {
    const employeeId = useFormInput('');
    const password = useFormInput('');

    const state = useAppState();

    return <div className={css(styles.loginContainer)} data-testid="loginPage">
        <span data-testid="errorMessage">{state.app.errorMessage}</span>
        <FormInput
            type='number'
            name='employeeId'
            label='Employee ID'
            manager={employeeId}
        />
        <FormInput
            type='password'
            name='password'
            label='Password'
            manager={password}
        />
        <button onClick={() => actions.login(employeeId.value, password.value)}>Login</button>
    </div>;
};

const styles = StyleSheet.create({
    loginContainer: {
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'column',
    },
});

export default Login;