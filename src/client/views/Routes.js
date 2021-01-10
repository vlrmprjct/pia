import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Parts from './Parts/Parts';
import Oops from './404';
import Login from './Login/Login';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path='/parts/:id?' render={() => <Parts {...props} />} />
            <Route exact path='/404' component={Oops} />
            <Route exact path='/dashboard' render={() => <Dashboard {...props} />} />
            <Route exact path='/login' render={() => <Login {...props} />} />
            <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
        </Switch>
    );
};

export default Routes;
