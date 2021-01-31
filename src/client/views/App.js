import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Routes from './Routes';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import { scroll } from './../utils/scrollbar';
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
    console.log(props.location);
    return (
        <>
            <Header />
            <Sidebar />
            <main className={props.location.pathname.split('/')[1]}>
                <Routes {...props} />
            </main>
            <Footer />
        </>
    );
};

export default withRouter(App);
