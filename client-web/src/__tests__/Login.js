import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
} from 'react-testing-library';
import changeFormInput from '../testUtils/changeFormInput';

import { store } from 'emfactor-client-core';

import App from '../App';

const setup = () => {
    store.initialize({
        ...store.defaultState,
        app: { ...store.defaultState.app, userEmployeeId: 0 }
    });

    let renderResult = render(<App />);

    let employeeIdInput = renderResult.getByPlaceholderText('Employee ID');
    let passwordInput = renderResult.getByPlaceholderText('Password');

    return { renderResult, employeeIdInput, passwordInput };
};

it('renders employee id and password fields', () => {
    let { renderResult, employeeIdInput, passwordInput } = setup();
});

it('successfully registers changes to employee ID and password fields', async () => {
    let { renderResult, employeeIdInput, passwordInput } = setup();

    await changeFormInput(employeeIdInput, 1);
    expect(employeeIdInput.value).toBe("1");

    await changeFormInput(passwordInput, 'bananas');
    expect(passwordInput.value).toBe("bananas");
});

it('denies invalid login credentials and shows error', async () => {
    let { renderResult, employeeIdInput, passwordInput } = setup();

    await changeFormInput(employeeIdInput, 1);
    await changeFormInput(passwordInput, 'bananas2');

    let submitButton = renderResult.getByText('Login');

    fireEvent.click(submitButton);

    let errorMessage = await waitForElement(() => renderResult.getByRole('error-message'));

    expect(store.getState().app.userEmployeeId).toBe(0);

    expect(errorMessage.innerHTML).toBe('Invalid password!');
});

it('logs in successfully', async () => {
    let { renderResult, employeeIdInput, passwordInput } = setup();

    await changeFormInput(employeeIdInput, 1);
    await changeFormInput(passwordInput, 'bananas');

    let submitButton = renderResult.getByText('Login');

    fireEvent.click(submitButton);

    try {
        await waitForElement(() => renderResult.getByText('Logout'), { timeout: 1000 });
    } catch (e) {
        let errorMessage = renderResult.getByRole('error-message');
        throw new Error('Login timed out - ' + errorMessage.innerHTML);
    }

    expect(store.getState().app.userEmployeeId).toBe(1);
});

