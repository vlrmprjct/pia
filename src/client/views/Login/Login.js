import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { fetchAPI } from '../../utils/api';
import logo from './../../assets/media/logo.svg';

export const Login = ({
    onSuccess = () => {},
}) => {

    const history = useHistory();
    const [, setCookie] = useCookies(['access_token']);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (!code) return;
        fetchAPI('/api/login/' + code, (data) => {
            if (data.access_token && data.token_type === 'bearer') {
                setCookie('access_token', data.access_token, {
                    path: '/',
                    maxAge: 86400 * 30,
                    sameSite: 'lax',
                });

                onSuccess(data.access_token);
                setTimeout(() => history.replace('/'), 0);
            }
        });
    }, []);

    return (
        <div
            className="uk-cover-container uk-flex uk-flex-center uk-flex-middle uk-overflow-hidden uk-light"
            data-uk-height-viewport
        >

            <div className="uk-position-cover uk-overlay-primary" />

            <div className="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
                <span className="uk-text-small uk-text-muted">
                    © 2021 vlrm.prjct
                    ( Photo by
                    {' '}
                    <a href="https://unsplash.com/@nicolasthomas">Nicolas Thomas</a>
                    {' '}
                    )
                </span>
            </div>

            <div className="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">

                <div className="uk-text-center uk-margin">
                    <img width="48" src={logo} alt="Logo" />
                </div>

                <form className="toggle-class">
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin-bottom">
                            <a
                                className="uk-button uk-input uk-width-1-1"
                                href="https://github.com/login/oauth/authorize?client_id=f6b7044bab13d95678e3&scope=gist"
                            >
                                <span
                                    uk-icon="icon: github-alt"
                                    style={{ position: 'relative', top: '-2px', left: '-3px' }}
                                />
                                {'  '}
                                LOGIN WITH GITHUB
                            </a>
                        </div>
                    </fieldset>
                </form>

            </div>

        </div>
    );
};
