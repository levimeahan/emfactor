import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import { Route, Link } from 'react-router-dom';

import {linkThemes} from "../themes/default";

const SubRoute = ({ basePath, path, exact, component: Component }) => (
    <Route exact={exact} path={path} render={props => (
        <React.Fragment>
            <Link to={basePath} className={css(linkThemes.standard)}>&lt; Back</Link>
            <Component basePath={basePath} {...props} />
        </React.Fragment>
    )} />
);
SubRoute.defaultProps = {
    exact: false,
};

const styles = StyleSheet.create({});

export default SubRoute;