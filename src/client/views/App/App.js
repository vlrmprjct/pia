import React, { useEffect, useState } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { withRouter } from 'react-router';
import { useCookies } from 'react-cookie';
import { fetchAPI } from '../../utils/api';
import { scroll } from '../../utils/scrollbar';
import { initLocalStorage } from '../../utils/localstorage';

import Routes from './Routes';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import './../../scss/index.scss';

UIkit.use(Icons);

export const App = withRouter((props) => {

    const [cookies] = useCookies(['access_token']);

    const [state, setState] = useState({
        user: null,
        token: cookies.access_token || null,
    });

    if (localStorage.getItem('pia') === null) {
        initLocalStorage();
    }

    useEffect(() => {
        document.body
            .querySelector('[data-root]')
            .setAttribute('class', `app ${props.location.pathname.split('/')[1]}`);
    }, [props.location]);

    useEffect(() => {
        window.addEventListener('scroll', scroll, true);
    }, []);

    useEffect(() => {
        state.token && fetchAPI('/api/success/' + state.token, (data) => {
            setState({
                ...state,
                user: data,
            });
        });
    }, [state.token]);

    const onSuccess = (token) => setState({...state, token});

    return (
        <>
            <Header />
            <Sidebar {...props} {...state} />
            <main>
                <Routes {...props} {...state} onSuccess={onSuccess} />
            </main>
            <Footer />
        </>
    );
});
