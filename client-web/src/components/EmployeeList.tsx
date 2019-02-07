import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Link } from 'react-router-dom';

import { colors, linkThemes } from '../themes/default';

import { selectors } from 'emfactor-client-core';
import useAppState from "../hooks/useAppState";

const EmployeeDisplay = ({ id, firstName, lastName, roles, editPath, style }) => (
    <div className={css(styles.employeeDisplay, style)}>
        <span className={css(styles.empId)}>{id}</span>
        <span className={css(styles.name)}>{firstName} {lastName}</span>
        <span className={css(styles.roles)}>{roles.join(', ')}</span>
        <div className={css(styles.editButtonContainer)}>
            {editPath ?
                <Link to={`${editPath}/${id}`} className={css(linkThemes.standard)}>Edit</Link>
                : null}
        </div>
    </div>
);
EmployeeDisplay.defaultProps = {
    style: null,
};

const EmployeeList = ({ employees, editPath }) => {
    const state = useAppState();

    return <div className={css(styles.listContainer)}>
        <EmployeeDisplay
            id='ID'
            firstName='Name'
            lastName=''
            roles={['Roles']}
            editPath={null}
            style={styles.listHeader}
        />
        {employees.map((employee, i) => (
            <EmployeeDisplay
                key={i}
                id={employee.id}
                firstName={employee.firstName}
                lastName={employee.lastName}
                editPath={editPath}
                roles={selectors.roleNames(state, employee.roles)}
            />
        ))}
    </div>;
};

const styles = StyleSheet.create({
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        boxShadow: '3px 3px 8px #222222'
    },
    listHeader: {
        fontWeight: 'bold',
    },
    employeeDisplay: {
        display: 'flex',
        flexDirection: 'row',

        padding: '5px 0',

        background: colors.background.secondary,
        borderTop: `1px solid ${colors.background.secondaryDark}`
    },
    editButtonContainer: {
        flexBasis: '50px',
        flexShrink: 0,
    },
    editButton: {

    },
    empId: {
        flexBasis: '50px',
        flexShrink: 0,
    },
    name: {
        flexBasis: '200px',
    },
    roles: {
        flexBasis: '200px',
    },
});

export default EmployeeList;