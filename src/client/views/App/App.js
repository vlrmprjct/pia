import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Routes from './Routes';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { scroll } from '../../utils/scrollbar';
import { initLocalStorage } from '../../utils/localstorage';

import './../../scss/index.scss';

UIkit.use(Icons);

export const App = withRouter((props) => {

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
});
