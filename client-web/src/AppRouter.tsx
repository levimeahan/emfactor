import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';

import useAppState from './hooks/useAppState';
import NavMenu from './components/NavMenu'
import { routes, managerRoutes } from './routes';
import {colors} from "./themes/default";

const preloadRoutes = () => {
    routes.map((route) => {
        route.componentFactory().then().catch();
    });
    managerRoutes.map((route) => {
        route.componentFactory().then().catch();
    });
};

const AppRouter = () => {
    const state = useAppState();

    useEffect(preloadRoutes, []);

    return <Router>
        <div className={css(styles.container)}>
            <nav className={css(styles.navMenuContainer)}>
                <NavMenu routes={routes} />
                {selectors.userIsManager(state) ?
                    <React.Fragment>
                        <h3 className={css(styles.navMenuHeader)}>Manage</h3>
                        <NavMenu routes={managerRoutes} />
                    </React.Fragment>
                : null}
            </nav>
            <div className={css(styles.appContent)}>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {routes.map((route, i) => (
                            <Route key={i} path={route.path} component={React.lazy(route.componentFactory)} />
                        ))}
                        {selectors.userIsManager(state) ?
                            <React.Fragment>
                                {managerRoutes.map((route, i) => (
                                    <Route key={i} path={route.path} component={React.lazy(route.componentFactory)} />
                                ))}
                            </React.Fragment>
                        : null}
                    </Switch>
                </React.Suspense>
            </div>
        </div>
    </Router>;
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 2,
        alignSelf: 'stretch',

        display: 'flex',
        flexDirection: 'row',
    },
    navMenuContainer: {
        background: colors.background.secondary,
        margin: 0,
        padding: 0,
        borderRight: `1px solid ${colors.background.secondaryLight}`
    },
    navMenuHeader: {
        margin: '6px 0 0',
        padding: '2px 0 4px',

        fontSize: '18px',
        fontWeight: 'normal',
        background: colors.background.secondaryDark,
        borderTop: `1px solid ${colors.background.secondaryLight}`,
        borderBottom: `1px solid ${colors.background.secondaryLight}`,
    },
    appContent: {
        flexGrow: 2,
    },
});



export default AppRouter;