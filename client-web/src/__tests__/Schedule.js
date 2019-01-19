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
        app: {
            ...store.defaultState.app,
            userEmployeeId: 1,
        }
    });

    let renderResult = render(<App/>);

    fireEvent.click(renderResult.getByText('Schedule'));

    return renderResult;
};

it('renders all 7 days', () => {
    const { getByText } = setup();

    let daysFound = 0;
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    days.forEach((day) => {
        if(getByText(day, { exact: false })) {
            daysFound++;
        }
    });

    expect(daysFound).toBe(days.length);
});