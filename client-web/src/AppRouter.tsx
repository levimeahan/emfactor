import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import Menu from './components/Menu'
import { routes } from './routes';

const AppRouter = () => {
    return <Router>
        <div className={css(styles.container)}>
            <Menu routes={routes} containerStyle={styles.menuContainer} />
            <div className={css(styles.appContent)}>
                <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} path={route.path} component={route.component} />
                    ))}
                </Switch>
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
    menuContainer: {

    },
    appContent: {
        flexGrow: 2,
    },
});



export default AppRouter;