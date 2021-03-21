import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../../utils/api';

export const Welcome = () => {

    const [state, setState] = useState({});

    useEffect(() => {
        fetchAPI('/api/latestentries', (data) => {
            setState({
                items: data,
            });
        });
    }, []);

    return (
        <div className="uk-margin uk-margin-left uk-margin-top">
            <div className="title">
                <h1>PIA</h1>
                <h2 className="uk-margin-remove-top">Parts Inventory evolved</h2>
            </div>
            <div className="row">
                <div className="splash">
                    <section className="start">
                        <h3>Start</h3>
                        <ul className="uk-nav ul-margin-top uk-margin-bottom">
                            <li>
                                <Link to="/parts/new" className="uk-padding-remove-top">
                                    <span uk-icon="plus-circle" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">New Part</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects/new" className="uk-padding-remove-top">
                                    <span uk-icon="plus-circle" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">New Project</span>
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <section className="recent">
                        <h3>Recent Parts</h3>
                        <ul className="uk-nav ul-margin-top uk-margin-bottom">
                            {
                                state && state.items && state.items.map((e) => {
                                    return (
                                        <li>
                                            <Link to={`parts/${e.id}`} className="uk-padding-remove-top">
                                                <span uk-icon="tag" className="uk-margin-small-right uk-icon" />
                                                <span className="uk-text-middle">
                                                    {e.name.substring(0,30)}
                                                    {`${(e.name.length > 30) ? ' ...' : ''}`}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </section>

                    <section className="help">
                        <h3>Help</h3>
                        <ul className="uk-nav ul-margin-top uk-margin-bottom">
                            <li>
                                <Link to="/keyboard" className="uk-padding-remove-top">
                                    <span uk-icon="bookmark" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">Keyboard cheatsheet</span>
                                </Link>
                            </li>
                            <li>
                                <a href="https://github.com/vlrmprjct/pia/issues" rel="noreferrer" target="_blank" className="uk-padding-remove-top">
                                    <span uk-icon="git-fork" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">Issues</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/vlrmprjct/pia" rel="noreferrer" target="_blank" className="uk-padding-remove-top">
                                    <span uk-icon="github-alt" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">Github Repository</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>

    );
};
