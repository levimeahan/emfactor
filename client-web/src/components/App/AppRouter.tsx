import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';

import AppMenu from './AppMenu';
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

const AppRouter = ({ menuStatus, menuMode, closeMenu }) => {
    const state = useAppState();

    useEffect(preloadRoutes, []);

    return <Router>
        <div className={css(styles.navAndMainContainer)}>
            <AppMenu
                routes={routes}
                managerRoutes={selectors.userIsManager(state) ? managerRoutes : null}
                status={menuStatus}
                mode={menuMode}
            />
            <main className={css(styles.mainContent)} onClick={closeMenu}>
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
        position: 'relative',
        flexDirection: 'row',
        overflow: 'hidden',
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