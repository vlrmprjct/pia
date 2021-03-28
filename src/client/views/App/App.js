import React, { useEffect, useState } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { withRouter } from 'react-router';
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

    const [state, setState] = useState({
        user: null,
        loggedIn: null,
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
        fetchAPI('/api/success/', (data, response) => {
            setState({
                ...state,
                user: data,
                loggedIn: response.ok,
            });
        });
    }, []);

    if (state.user === null) return null;

    return (
        <>
            <Header />
            <Sidebar {...props} {...state} />
            <main>
                <Routes {...props} {...state} />
            </main>
            <Footer />
        </>
    );
});
