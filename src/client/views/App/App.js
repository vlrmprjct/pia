import React, { useEffect, useState } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { withRouter } from 'react-router';
import { scroll } from '../../utils/scrollbar';
import { setLocalStorage, initLocalStorage } from '../../utils/localstorage';

import Routes from './Routes';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import './../../scss/index.scss';

UIkit.use(Icons);

export const App = withRouter((props) => {

    // Prevent selecting text/word after doubleclick
    document.addEventListener('mousedown', (event) => {
        if (event.detail === 2) {
            event.preventDefault();
        }
    }, false);

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

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            setLocalStorage({ 'theme': 'dark' });
        }

    }, []);

    const onChangeTheme = () => {
        const e = document.documentElement;
        e.setAttribute('data-theme', (e.getAttribute("data-theme") !== 'dark') ? 'dark' : 'light');
        setLocalStorage({ 'theme': e.getAttribute("data-theme") });
    };

    return (
        <>
            <Header />
            <Sidebar {...props} onChangeTheme={onChangeTheme} />
            <main>
                <Routes {...props} />
            </main>
            <Footer />
        </>
    );
});
