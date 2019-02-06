import React, { useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Route, Link } from 'react-router-dom';

import { selectors } from 'emfactor-client-core';

import useAppState from '../hooks/useAppState';
import AddEmployee from '../components/AddEmployee';
import EmployeeList from '../components/EmployeeList';

import { colors, linkThemes } from '../themes/default';
import pageStyles from '../styles/page';

const Employees = ({ match }) => {
    return <div className={css(pageStyles.container)} data-testid="manageEmployeesPage">
        <Route exact path={match.path} render={props => (
            <Index
                basePath={match.path}
                {...props}
            />
        )} />
        <Route path={match.path + '/add'} render={props => (
            <AddEmployee
                basePath={match.path}
                {...props}
            />
        )} />
    </div>;
};

const Index = ({ basePath }) => {
    const state = useAppState();

    return <React.Fragment>
        <Link to={basePath + '/add'} className={css(linkThemes.standard)}>Add New Employee</Link>
        <h3>Employees</h3>
        <EmployeeList employees={selectors.employeeArray(state)} />
    </React.Fragment>;
};

const styles = StyleSheet.create({
});

export default Employees;