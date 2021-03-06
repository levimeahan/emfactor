import React, { useContext } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Route, Link } from 'react-router-dom';

import { selectors } from 'emfactor-client-core';

import SubRoute from "../components/SubRoute";
import AddEmployee from '../components/Employees/AddEmployee';
import EmployeeList from '../components/Employees/EmployeeList';
import EditEmployee from "../components/Employees/EditEmployee";

import useAppState from '../hooks/useAppState';

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
        <SubRoute
            basePath={match.path}
            path={match.path + '/add'}
            component={AddEmployee}
        />
        <SubRoute
            basePath={match.path}
            path={match.path + '/edit/:id'}
            component={EditEmployee}
        />
    </div>;
};

const Index = ({ basePath }) => {
    const state = useAppState();

    return <React.Fragment>
        <Link to={basePath + '/add'} className={css(linkThemes.standard)}>Add New Employee</Link>
        <h2>Employees</h2>
        <EmployeeList
            employees={selectors.allEmployees(state)}
            editPath={basePath + '/edit'}
        />
    </React.Fragment>;
};

const styles = StyleSheet.create({
});

export default Employees;