import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
    waitForDomChange
} from 'react-testing-library';

import { store } from 'emfactor-client-core';

import StoreProvider from '../StoreProvider';
import App from '../App';

import { actions } from 'emfactor-client-core';

store.initialize({
    ...store.defaultState,
    app: { ...store.defaultState.app, userEmployeeId: 0 }
});

const setup = () => {
    let renderResult = render(
        <StoreProvider>
            <App />
        </StoreProvider>
    );

    let employeeIdInput = renderResult.getByPlaceholderText('Employee ID');
    let passwordInput = renderResult.getByPlaceholderText('Password');

    return { renderResult, employeeIdInput, passwordInput };
};

const changeFormInput = async (input, newValue) => {
    fireEvent.change(input, {
        target: {
            value: newValue
        }
    });

    return waitForElement(() => input);
};

it('renders employee id and password fields', () => {
    let { renderResult, employeeIdInput, passwordInput } = setup();
});

it('successfully registers changes to employee ID and password fields', async () => {
    let {renderResult, employeeIdInput, passwordInput} = setup();

    await changeFormInput(employeeIdInput, 1);
    expect(employeeIdInput.value).toBe("1");

    await changeFormInput(passwordInput, 'bananas');
    expect(passwordInput.value).toBe("bananas");
});

it('shows error message on failed login', async () => {
    let {renderResult, employeeIdInput, passwordInput} = setup();

    await changeFormInput(employeeIdInput, 1);
    await changeFormInput(passwordInput, 'bananas2');

    let submitButton = renderResult.getByText('Login');

    fireEvent.click(submitButton);

    let errorMessage = await waitForElement(() => renderResult.getByRole('error-message'));

    expect(errorMessage.innerHTML).toBe('Invalid password!');
});

it('logs in successfully', async () => {
    let {renderResult, employeeIdInput, passwordInput} = setup();

    await changeFormInput(employeeIdInput, 1);
    await changeFormInput(passwordInput, 'bananas');

    let submitButton = renderResult.getByText('Login');

    fireEvent.click(submitButton);

    try {
        await waitForElement(() => renderResult.getByText('Logout'), { timeout: 1000 });
    } catch(e) {
        let errorMessage = renderResult.getByRole('error-message');
        throw new Error('Login timed out - ' + errorMessage.innerHTML);
    }

    expect(store.getState().app.userEmployeeId).toBe(1);
});


