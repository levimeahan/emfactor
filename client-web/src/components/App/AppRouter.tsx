import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';

import NavMenu from '../NavMenu'
import ErrorBoundary from "../ErrorBoundary";

import useAppState from '../../hooks/useAppState';

import { routes, managerRoutes } from '../../routes';

import {colors} from "../../themes/default";

// Lazy components must be set ahead of time to avoid new instances being created every render
const addLazyComponent = route => ({ ...route, component: React.lazy(route.componentFactory) });
const lazyRoutes = routes.map(addLazyComponent);
const lazyManagerRoutes = managerRoutes.map(addLazyComponent);

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
        <div className={css(styles.navAndMainContainer)}>
            <nav className={css(styles.navContainer)}>
                <NavMenu routes={routes} />
                {selectors.userIsManager(state) ?
                    <React.Fragment>
                        <h3 className={css(styles.navMenuHeader)}>Manage</h3>
                        <NavMenu routes={managerRoutes} />
                    </React.Fragment>
                    : null}
            </nav>
            <main className={css(styles.mainContent)}>
                <ErrorBoundary>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {lazyRoutes.map((route, i) => (
                                <Route key={i} path={route.path} component={route.component} />
                            ))}
                            {selectors.userIsManager(state) ?
                                <React.Fragment>
                                    {lazyManagerRoutes.map((route, i) => (
                                        <Route key={'manager' + i} path={route.path} component={route.component} />
                                    ))}
                                </React.Fragment>
                                : null}
                        </Switch>
                    </React.Suspense>
                </ErrorBoundary>
            </main>
        </div>
    </Router>;
};

const styles = StyleSheet.create({
    navAndMainContainer: {
        flexGrow: 2,
        alignSelf: 'stretch',
        justifySelf: 'stretch',

        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    navContainer: {
        flexShrink: 0,
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
    mainContent: {
        flexGrow: 2,
        maxHeight: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '3px',
        background: colors.background.primary,
        '::-webkit-scrollbar': {
            width: '8px',
            background: colors.background.secondaryDark,
        },
        '::-webkit-scrollbar-thumb': {
            background: colors.background.secondaryUltraLight,
            borderRadius: '24px',
        },
        scrollbarColor: `${colors.background.secondaryUltraLight} ${colors.background.secondaryDark}`,
        scrollbarWidth: 'thin',
    },
});



export default AppRouter;