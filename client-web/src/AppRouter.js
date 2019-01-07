import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { routes } from './routes';

const AppRouter = () => {
    return <Router>
        <div>
            <nav>
                <ul>
                    {routes.map((route, i) => (
                        <li key={i}><Link to={route.path} style={{textTransform: 'uppercase'}}>{route.path.substr(1)}</Link></li>
                    ))}
                </ul>
            </nav>
            <Switch>
                {routes.map((route, i) => (
                    <Route key={i} path={route.path} component={route.component} />
                ))}
            </Switch>
        </div>
    </Router>;
};

export default AppRouter;