import React from 'react';
import {
    getByText as containerGetByText,
    fireEvent,
    waitForElement,
} from 'react-testing-library';

import changeFormInput from '../__testUtils/changeFormInput';
import { addEmployeeToStore, defaultEmployee, setup, roles } from '../__testUtils/employees';
import waitForErrorMessage from '../__testUtils/waitForErrorMessage';
import { store, selectors } from 'emfactor-client-core';



it('renders employee info', async () => {
    const { getByText, getByTestId } = await setup();

    getByText(defaultEmployee.id.toString());
    getByText(defaultEmployee.firstName + ' ' + defaultEmployee.lastName);

    addEmployeeToStore(2, 'John', 'Doe', defaultEmployee.availability, [roles.employee]);
    await waitForElement(() => getByTestId('manageEmployeesPage'));
    getByText('John Doe');
});


const addEmployeeSetup = async () => {
    let renderResult = await setup();

    store.dispatch(prevState => ({
        ...prevState,
        roles: {
            byId: {
                1: {
                    id: 1,
                    name: 'Employee',
                    permissions: [],
                    subRoles: []
                },
                2: {
                    id: 2,
                    name: 'Manager',
                    permissions: ['addEmployees', 'manageSchedules'],
                    subRoles: [1],
                },
            },
            allIds: [1, 2],
        }
    }));

    fireEvent.click(renderResult.getByText('Add New Employee'));
    await waitForElement(() => renderResult.getByTestId('manageEmployeesPage'));

    const getFirstNameInput = () => renderResult.getByLabelText('First Name');
    const getLastNameInput = () => renderResult.getByLabelText('Last Name');
    const getSubmitButton = () => renderResult.getByText('Submit');
    const getRoleCheckbox = (name) => renderResult.getByLabelText(name) as HTMLInputElement;

    return { renderResult, getFirstNameInput, getLastNameInput, getRoleCheckbox, getSubmitButton };
};

it('stops and shows error message when full name not entered', async () => {
    let {
        renderResult: { container, getByText, getByLabelText, getByTestId },
        getFirstNameInput,
        getLastNameInput,
        getSubmitButton
    } = await addEmployeeSetup();

    const getEmployeeCount = () => selectors.allEmployees(store.getState()).length;
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

it('adds employee with specific role', async () => {
    const {
        renderResult: { getByText, getByTestId, getByLabelText },
        getFirstNameInput,
        getLastNameInput,
        getSubmitButton,
        getRoleCheckbox
    } = await addEmployeeSetup();

    await changeFormInput(getFirstNameInput(), 'John');
    await changeFormInput(getLastNameInput(), 'Doe');

    if(getRoleCheckbox('Employee').checked) {
        fireEvent.click(getRoleCheckbox('Employee'));
    }

    fireEvent.click(getRoleCheckbox('Manager'));

    expect(getRoleCheckbox('Manager').checked).toBe(true);

    const startingEmployeeCount = selectors.allEmployees(store.getState()).length;

    fireEvent.click(getSubmitButton());

    await waitForElement(() => getByTestId('manageEmployeesPage'));

    const employees = selectors.allEmployees(store.getState());

    expect(employees.length).toBe(startingEmployeeCount + 1);

    let newEmployee = employees.find(emp => emp.firstName === 'John' && emp.lastName == 'Doe');

    expect(newEmployee).toBeDefined();

    expect(newEmployee.roles).toContain(roles.manager);
    expect(newEmployee.roles).not.toContain(roles.employee);
});

it('adds employee with specific availability', async () => {
    const {
        renderResult: { getByText, getByLabelText, getByTestId },
        getFirstNameInput,
        getLastNameInput,
        getSubmitButton
    } = await addEmployeeSetup();

    await changeFormInput(getFirstNameInput(), 'John');
    await changeFormInput(getLastNameInput(), 'Doe');

    const tuesday = getByTestId('availability-tue');

    let hours = ['4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
    hours.forEach(hour => {
        fireEvent.click(containerGetByText(tuesday, hour));
    });

    fireEvent.click(getSubmitButton());

    await waitForElement(() => getByTestId('manageEmployeesPage'));

    const employees = selectors.allEmployees(store.getState());

    let newEmployee = employees.find(emp => emp.firstName === 'John' && emp.lastName == 'Doe');

    expect(selectors.employeeIsAvailable(store.getState(), newEmployee.id, 'tue', 16, 21)).toBe(true);
    expect(selectors.employeeIsAvailable(store.getState(), newEmployee.id, 'tue', 15, 21)).toBe(false);
    expect(selectors.employeeIsAvailable(store.getState(), newEmployee.id, 'tue', 16, 22)).toBe(false);

    expect(newEmployee).toBeDefined();

});
