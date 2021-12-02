import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import {
    Login,
    Parts,
    Error,
    Welcome
} from './../';

const Routes = ({ loggedIn }, ...props) => {

    return (
        (!loggedIn && loggedIn !== null) ? (
            <Switch>
                <Route path="/login" render={() => <Login {...props} />} />
                <Redirect to="/login" />
            </Switch>
        ) : (
            <Switch>
                <Route exact path='/parts/:id?' render={() => <Parts {...props} />} />
                <Route exact path='/welcome' render={() => <Welcome {...props} />} />
                <Route exact path='/login' render={() => <Login {...props} />} />
                <Route exact path='/' render={() => <Redirect to="/welcome" />} />
                <Route exact path="/manifest.webmanifest" />
                <Route path="*" component={Error} />
            </Switch>
        )
    );
};

export default Routes;
