import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import NavMenu from './components/NavMenu'
import { routes } from './routes';

const AppRouter = () => {
    return <Router>
        <div className={css(styles.container)}>
            <NavMenu routes={routes} containerStyle={styles.navMenuContainer} />
            <div className={css(styles.appContent)}>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {routes.map((route, i) => (
                            <Route key={i} path={route.path} component={route.component} />
                        ))}
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

    },
    appContent: {
        flexGrow: 2,
    },
});



export default AppRouter;