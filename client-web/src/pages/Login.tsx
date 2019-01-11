import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import useFormInput from '../hooks/useFormInput';
import { actions } from 'emfactor-client-core';

import StoreContext from '../StoreContext';

const Login = () => {
    const employeeId = useFormInput('');
    const password = useFormInput('');

    const state = useContext(StoreContext);

    return <div className={css(styles.loginContainer)}>
        <span>{state.errorMessage}</span>
        <input
            type='number'
            placeholder='Employee ID'
            value={employeeId.value}
            onChange={employeeId.onChange}
        />
        <input
            type='password'
            placeholder='Password'
            value={password.value}
            onChange={password.onChange}
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