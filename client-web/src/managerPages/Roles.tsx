import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Route, Link } from 'react-router-dom';

import useAppState from '../hooks/useAppState';

import AddRole from '../components/AddRole';
import RoleList from '../components/RoleList';
import SubRoute from '../components/SubRoute';

import { colors, linkThemes } from '../themes/default';
import pageStyles from '../styles/page';

const Roles = ({ match }) => {
    return <div className={css(pageStyles.container)} data-testid="manageRolesPage">
        <Route
            path={match.path}
            component={Index}
            exact
        />
        <SubRoute
            basePath={match.path}
            path={match.path + '/add'}
            component={AddRole}
        />
    </div>;
};

const Index = ({ match }) => {
    const state = useAppState();

    return <React.Fragment>
        <Link to={match.path + '/add'} className={css(linkThemes.standard)}>Add New Role</Link>
        <h3>Roles</h3>
        <RoleList roles={state.roles.allIds.map(id => state.roles.byId[id])} />
    </React.Fragment>;
};

export default Roles;