import React from 'react';
import { act } from 'react-dom/test-utils';
import {
    render,
    fireEvent,
    waitForElement,
} from 'react-testing-library';
import changeFormInput from '../__testUtils/changeFormInput';

import { store } from 'emfactor-client-core';

import App from '../components/App/App';

const employeeIdLabel = 'Employee ID';
const passwordLabel = 'Password';

const setup = () => {
    store.initialize({
        ...store.defaultState,
        app: { ...store.defaultState.app, userEmployeeId: 0 }
    });

    return render(<App />);
};

it('renders employee id and password fields', () => {
    let renderResult = setup();
});

it('successfully registers changes to employee ID and password fields', async () => {
    let { getByLabelText } = setup();

    await changeFormInput(getByLabelText(employeeIdLabel), 1);
    expect(getByLabelText(employeeIdLabel).value).toBe("1");

    await changeFormInput(getByLabelText(passwordLabel), 'bananas');
    expect(getByLabelText(passwordLabel).value).toBe("bananas");
});

it('denies invalid login credentials and shows error', async () => {
    let { getByText, getByTestId, getByLabelText } = setup();

    await changeFormInput(getByLabelText(employeeIdLabel), 1);
    await changeFormInput(getByLabelText(passwordLabel), 'bananas2');

    let submitButton = getByText('Login');

    fireEvent.click(submitButton);

    let errorMessage = await waitForElement(() => getByTestId('errorMessage'));

    expect(store.getState().app.userEmployeeId).toBe(0);

    expect(errorMessage.innerHTML).toMatch(/password/i);
});

it('logs in successfully', async () => {
    let { getByText, getByTestId, getByLabelText } = setup();

    await changeFormInput(getByLabelText(employeeIdLabel), 1);
    await changeFormInput(getByLabelText(passwordLabel), 'bananas');

    let submitButton = getByText('Login');

    fireEvent.click(submitButton);

    try {
        await waitForElement(() => getByText('Logout'), { timeout: 1000 });
    } catch (e) {
        let errorMessage = getByTestId('errorMessage');
        throw new Error('Login timed out - ' + errorMessage.innerHTML);
    }

    expect(store.getState().app.userEmployeeId).toBe(1);
});


