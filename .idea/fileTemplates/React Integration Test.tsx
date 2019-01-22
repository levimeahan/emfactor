import React from 'react';
import {
    render,
    fireEvent,
    waitForElement,
} from 'react-testing-library';
import changeFormInput from '../__testUtils/changeFormInput';

import { store } from 'emfactor-client-core';

import App from '../App';

const setup = () => {
    store.initialize({
        ...store.defaultState,
        app: { ...store.defaultState.app, userEmployeeId: 0 }
    });

    let renderResult = render(<App />);

    return { renderResult };
};