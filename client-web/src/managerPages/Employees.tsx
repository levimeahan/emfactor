import React, { useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Route, Link } from 'react-router-dom';

import { selectors } from 'emfactor-client-core';

import StateContext from '../StateContext';
import AddEmployee from '../components/AddEmployee';
import EmployeeList from '../components/EmployeeList';

import { colors, linkStyles } from '../themes/default';

const Employees = ({ match }) => {
    return <div className={css(styles.MEContainer)} data-testid="manageEmployeesPage">
        <Route exact path={match.path} render={props => (
            <Index basePath={match.path} {...props} />
        )} />
        <Route path={match.path + '/add'} render={props => (
            <AddEmployee basePath={match.path} {...props} />
        )} />
    </div>;
};

const Index = ({ basePath }) => {
    const state = useContext(StateContext);

    return <React.Fragment>
        <Link to={basePath + '/add'} className={css(linkStyles.standard)}>Add New Employee</Link>
        <h3>Employees</h3>
        <EmployeeList employees={selectors.employeeArray(state)} />
    </React.Fragment>;
};

const styles = StyleSheet.create({
    MEContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '15px',
    },
});

export default Employees;