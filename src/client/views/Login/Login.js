/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from './../../assets/media/logo.svg';

export const Login = () => {
    return (
        <div className="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>

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
                        <div className="uk-margin-small">
                            <div className="uk-inline uk-width-1-1">
                                <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user" />
                                <input className="uk-input" required placeholder="Username" type="text" />
                            </div>
                        </div>
                        <div className="uk-margin-small">
                            <div className="uk-inline uk-width-1-1">
                                <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock" />
                                <input className="uk-input" required placeholder="Password" type="password" />
                            </div>
                        </div>
                        <div className="uk-margin-small">
                            <label htmlFor="keep">
                                <input name="keep" className="uk-checkbox" type="checkbox" />
                                {' '}
                                Keep me logged in
                            </label>
                        </div>
                        <div className="uk-margin-bottom">
                            <button type="submit" className="uk-button uk-button-primary uk-width-1-1">LOG IN</button>
                        </div>
                    </fieldset>
                </form>

                <form className="toggle-class" hidden>
                    <div className="uk-margin-small">
                        <div className="uk-inline uk-width-1-1">
                            <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail" />
                            <input className="uk-input" placeholder="E-mail" required type="text" />
                        </div>
                    </div>
                    <div className="uk-margin-bottom">
                        <button type="submit" className="uk-button uk-button-primaryuk-width-1-1">SEND PASSWORD</button>
                    </div>
                </form>

                <div>
                    <div className="uk-text-center">
                        <a className="uk-link-reset uk-text-small toggle-class" data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade">Forgot your password?</a>
                        <a className="uk-link-reset uk-text-small toggle-class" data-uk-toggle="target: .toggle-class ;animation: uk-animation-fade" hidden>
                            <span data-uk-icon="arrow-left" />
                            Back to Login
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
};
