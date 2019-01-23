import React from 'react';
import {
    fireEvent,
    waitForElement,
} from 'react-testing-library';

import changeFormInput from '../__testUtils/changeFormInput';
import { addEmployeeToStore, defaultEmployee, setup } from '../__testUtils/employees';
import waitForErrorMessage from '../__testUtils/waitForErrorMessage';
import { store, selectors } from 'emfactor-client-core';

import {ROLE_EMPLOYEE, ROLE_MANAGER} from "../../../client-core/src/roles";

it('renders employee info', async () => {
    const { getByText, getByTestId } = await setup();

    getByText(defaultEmployee.id.toString());
    getByText(defaultEmployee.firstName + ' ' + defaultEmployee.lastName);

    addEmployeeToStore(2, 'John', 'Doe', [ROLE_EMPLOYEE]);
    await waitForElement(() => getByTestId('manageEmployeesPage'));
    getByText('John Doe');
});


const addEmployeeSetup = async () => {
    let renderResult = await setup();

    fireEvent.click(renderResult.getByText('Add New Employee'));
    await waitForElement(() => renderResult.getByTestId('manageEmployeesPage'));

    const getFirstNameInput = () => renderResult.getByLabelText('First Name');
    const getLastNameInput = () => renderResult.getByLabelText('Last Name');
    const getSubmitButton = () => renderResult.getByText('Submit');

    return { renderResult, getFirstNameInput, getLastNameInput, getSubmitButton };
};

it('stops and shows error message when full name not entered', async () => {
    let {
        renderResult: { container, getByText, getByLabelText, getByTestId },
        getFirstNameInput,
        getLastNameInput,
        getSubmitButton
    } = await addEmployeeSetup();

    const getEmployeeCount = () => selectors.employeeArray(store.getState()).length;
    const startingEmployeeCount = getEmployeeCount();

    await changeFormInput(getLastNameInput(), 'Doe');
    fireEvent.click(getSubmitButton());
    await waitForErrorMessage(container, /first name/i);

    expect(getEmployeeCount()).toEqual(startingEmployeeCount);

    await changeFormInput(getFirstNameInput(), 'John');
    await changeFormInput(getLastNameInput(), '');
    fireEvent.click(getByText('Submit'));

    const errorMessage = await waitForErrorMessage(container, /last name/i);

    console.log(store.getState().app.errorMessage);
    expect(errorMessage.innerHTML).toMatch(/last name/i);

    expect(getEmployeeCount()).toEqual(startingEmployeeCount);
});

it('adds employee with no manager role', async () => {
    const {
        renderResult: { getByText, getByTestId, getByLabelText },
        getFirstNameInput,
        getLastNameInput,
        getSubmitButton
    } = await addEmployeeSetup();

    await changeFormInput(getFirstNameInput(), 'John');
    await changeFormInput(getLastNameInput(), 'Doe');

    fireEvent.click(getSubmitButton());
    await waitForElement(() => getByTestId('manageEmployeesPage'));

    const employees = selectors.employeeArray(store.getState());

    let newEmployee = employees.find(emp => emp.firstName === 'John' && emp.lastName == 'Doe');

    expect(newEmployee).toBeDefined();

    expect(newEmployee.roles).toContain(ROLE_EMPLOYEE);
    expect(newEmployee.roles).not.toContain(ROLE_MANAGER);
});

it('adds employee with manager role', async () => {
    const {
        renderResult: { getByText, getByLabelText, getByTestId },
        getFirstNameInput,
        getLastNameInput,
        getSubmitButton
    } = await addEmployeeSetup();

    await changeFormInput(getFirstNameInput(), 'John');
    await changeFormInput(getLastNameInput(), 'Doe');

    const managerCheckbox = getByLabelText('Manager');
    fireEvent.click(managerCheckbox);
    fireEvent.click(getSubmitButton());

    await waitForElement(() => getByTestId('manageEmployeesPage'));

    const employees = store.getState().employees;

    let newEmployee = null;
    for(let emp of Object.values(employees.byId)) {
        if(emp.firstName == 'John' && emp.lastName == 'Doe') {
            newEmployee = emp;
        }
    }

    expect(newEmployee).not.toBeNull();

    expect(newEmployee.roles).toContain(ROLE_EMPLOYEE);
    expect(newEmployee.roles).toContain(ROLE_MANAGER);
});
