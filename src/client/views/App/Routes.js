import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import {
    Login,
    Parts,
    Error,
    Welcome
} from './../';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path='/parts/:id?' render={() => <Parts {...props} />} />
            <Route exact path='/welcome' render={() => <Welcome {...props} />} />
            <Route exact path='/login' render={() => <Login {...props} />} />
            <Route exact path='/' render={() => <Redirect to="/welcome" />} />
            <Route path="*" component={Error} />
        </Switch>
    );
};

export default Routes;
