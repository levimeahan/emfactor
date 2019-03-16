import React from 'react';
import {render, waitForElement} from 'react-testing-library';
import clickNavMenuLink from './clickNavMenuLink';
import { Employee } from "emfactor-client-core";

import { store } from 'emfactor-client-core';

import App from '../components/App/App';
import {act} from "react-dom/test-utils";

export const roles = {
    employee: 1,
    manager: 2,
};

export const addEmployeeToStore = (id, firstName, lastName, availability, roles) => {
    store.dispatch((prevState) => ({
        ...prevState,
        employees: {
            byId: {
                ...prevState.employees.byId,
                [id]: {
                    id,
                    firstName,
                    lastName,
                    availability,
                    roles
                }
            },
            allIds: [
                ...prevState.employees.allIds,
                id
            ]
        },
    }));
};

export const defaultEmployee: Employee = {
    id: 1,
    firstName: 'Levi',
    lastName: 'Meahan',
    availability: {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: '',
        sat: '',
        sun: '',
    },
    roles: [ roles.employee, roles.manager ]
};

export const setup = async () => {
    store.initialize({
        ...store.defaultState,
        app: {
            ...store.defaultState.app,
            userEmployeeId: 1
        },
        employees: {
            byId: {
                [defaultEmployee.id]: defaultEmployee,
            },
            allIds: [defaultEmployee.id]
        },
    });

    let renderResult = render(<App />);

    act(() => {
        clickNavMenuLink(renderResult.container, 'Employees');
    });

    await waitForElement(() => renderResult.getByTestId('manageEmployeesPage'));

    return renderResult;
};