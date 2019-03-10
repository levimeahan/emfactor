import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
} from 'react-testing-library';

import changeFormInput from '../__testUtils/changeFormInput';

import { store, selectors } from 'emfactor-client-core';

import App from '../components/App/App';

const setup = () => {
    store.initialize({
        ...store.defaultState,
        app: { ...store.defaultState.app, userEmployeeId: 1 }
    });

    return render(<App/>);
};

it('logs out successfully', async () => {
    let { getByText } = setup();

    let logoutButton = getByText('Logout');

    expect(selectors.userLoggedIn(store.getState())).toBe(true);

    fireEvent.click(logoutButton);

    await waitForElement(() => logoutButton);

    expect(selectors.userLoggedIn(store.getState())).toBe(false);
});