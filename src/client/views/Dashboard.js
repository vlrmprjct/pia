import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {

    const [state, setState] = useState({});
    const history = useHistory();

    useEffect(() => {

        const loadItems = async () => {
            try {
                const response = await fetch('/api/latestentries');
                const data = await response.json();
                setState({
                    items: data,
                });
            } catch (error) {
                throw error;
            }
        };

        loadItems();

    }, []);

    return (
        <div className="welcome uk-margin uk-margin-left uk-margin-top">
            <div className="title">
                <h1 className="caption">P.I.A</h1>
                <p className="subtitle detail">Parts Inventory evolved</p>
            </div>
            <div className="row">
                <div className="splash">
                    <div className="section start">
                        <h2 className="caption">Start</h2>
                        <ul>
                            <li><a href="#">New part</a></li>
                            <li><a href="#">New project</a></li>
                        </ul>
                    </div>
                    <div className="section recent">
                        <h2 className="caption">Recent Parts</h2>
                        <ul className="list">
                            {
                                state && state.items && state.items.map((e) => {
                                    return (
                                        <li>
                                            <span className="path detail">{e.name}</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="section help">
                        <h2 className="caption">Help</h2>
                        <ul>
                            <li><a href="#">Printable keyboard cheatsheet</a></li>
                            <li><a href="#">Tips and Tricks</a></li>
                            <li><a href="https://github.com/vlrmprjct/pia/issues" rel="noreferrer" target="_blank">Issues</a></li>
                            <li><a href="https://github.com/vlrmprjct/pia" rel="noreferrer" target="_blank">GitHub repository</a></li>
                            <li><a href="#">Join our Newsletter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
