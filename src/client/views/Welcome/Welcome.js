import React, { useState, useEffect } from 'react';
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
                                <a href="/add" className="uk-padding-remove-top">
                                    <span uk-icon="plus-circle" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">New Part</span>
                                </a>
                            </li>
                            <li>
                                <a href="/add/project" className="uk-padding-remove-top">
                                    <span uk-icon="plus-circle" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">New Project</span>
                                </a>
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
                                            <a href="/parts/id" className="uk-padding-remove-top">
                                                <span uk-icon="tag" className="uk-margin-small-right uk-icon" />
                                                <span className="uk-text-middle">{e.name}</span>
                                            </a>
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
                                <a href="/keyboard" className="uk-padding-remove-top">
                                    <span uk-icon="bookmark" className="uk-margin-small-right uk-icon" />
                                    <span className="uk-text-middle">Keyboard cheatsheet</span>
                                </a>
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
