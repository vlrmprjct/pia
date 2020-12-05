import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Routes from './Routes';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import { initLocalStorage } from './../utils/localstorage';

import '../scss/index.scss';

UIkit.use(Icons);

const App = (props) => {

    if (localStorage.getItem('pia') === null) {
        initLocalStorage();
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll, true);
    }, []);

    const scroll = (() => {
        let timer;
        return (e) => {
            if (e.target.classList.contains('on-scrollbar') === false) {
                e.target.classList.add('on-scrollbar');
            }
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                e.target.classList.remove('on-scrollbar');
            }, 3000);
        };
    })();

    const props2 = {
        user: 'me myself and I',
        ...props,
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main className={props.location.pathname.split('/').pop()}>
                <Routes {...props2} />
            </main>
            <Footer />
        </>
    );
};

export default withRouter(App);
