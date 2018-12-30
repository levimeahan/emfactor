import React from 'react';
import useFormInput from '../hooks/useFormInput';
import { actions } from 'emfactor-client-core';

const Login = () => {
    const employeeId = useFormInput('');
    const password = useFormInput('');

    return <div>
        <input
            type='number'
            placeholder='Employee ID'
            value={employeeId.value}
            onChange={employeeId.onChange}
        /><br />
        <input
            type='password'
            placeholder='Password'
            value={password.value}
            onChange={password.onChange}
        /><br />
        <button>Login</button>
    </div>;
};

export default Login;