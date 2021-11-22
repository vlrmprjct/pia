import React from 'react';
import logo from './../../assets/media/pia_logo_white.svg';

export const Login = () => {

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
                                href="/api/login/github"
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
