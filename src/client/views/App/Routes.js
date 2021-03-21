import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import {
    Login,
    Parts,
    Error,
    Welcome
} from './../';

const Routes = ({
    onSuccess = () => { },
    ...props
}) => {

    const isLoggedIn = props.token;

    return (
        (!isLoggedIn) ? (
            <Switch>
                <Route path="/login" render={() => <Login {...props} onSuccess={onSuccess} />} />
                <Redirect to="/login" />
            </Switch>
        ) : (
            <Switch>
                <Route exact path='/parts/:id?' render={() => <Parts {...props} />} />
                <Route exact path='/welcome' render={() => <Welcome {...props} />} />
                <Route exact path='/login' render={() => <Login {...props} />} />
                <Route exact path='/' render={() => <Redirect to="/welcome" />} />
                <Route path="*" component={Error} />
            </Switch>
        )
    );
};

export default Routes;
