import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
    getByText
} from 'react-testing-library';

import changeFormInput from '../testUtils/changeFormInput';

import { store } from 'emfactor-client-core';

import App from '../App';
import clickNavMenuLink from "../testUtils/clickNavMenuLink";

const setup = () => {
    store.initialize({
        ...store.defaultState,
        app: {
            ...store.defaultState.app,
            userEmployeeId: 1,
        }
    });

    let renderResult = render(<App/>);

    clickNavMenuLink(renderResult.container, 'Schedule');

    return renderResult;
};

it('renders all 7 days', async () => {
    const { getByText, getByTestId, container } = setup();

    clickNavMenuLink(container, 'Schedule');

    const schedule = await waitForElement(() =>
        getByTestId('schedulePage')
    );

    let daysFound = 0;
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    days.forEach((day) => {
        if(getByText(day)) {
            daysFound++;
        }
    });

    expect(daysFound).toBe(days.length);
});