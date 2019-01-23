import React from 'react';
import {render, waitForElement} from 'react-testing-library';
import clickNavMenuLink from './clickNavMenuLink';
import { Employee } from "emfactor-client-core";

import { store } from 'emfactor-client-core';
import {ROLE_EMPLOYEE, ROLE_MANAGER} from "../../../client-core/src/roles";

import App from '../App';

export const addEmployeeToStore = (id, firstName, lastName, roles) => {
    store.dispatch((prevState) => ({
        ...prevState,
        employees: {
            byId: {
                ...prevState.employees.byId,
                [id]: {
                    id,
                    firstName,
                    lastName,
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
    roles: [ ROLE_EMPLOYEE, ROLE_MANAGER ]
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

    clickNavMenuLink(renderResult.container, 'Employees');

    await waitForElement(() => renderResult.getByTestId('manageEmployeesPage'));

    return renderResult;
};