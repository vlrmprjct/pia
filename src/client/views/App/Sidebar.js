import React, { useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { fetchAPI } from '../../utils/api';

const Sidebar = ({
    onChangeTheme,
}) => {

    const [state, setState] = useState({
        user: null,
    });

    useEffect(() => {
        fetchAPI('/api/success/', (data) => {
            setState({
                ...state,
                user: data.user,
            });
        });
    }, []);

    return (
        <nav className="uk-background-secondary">
            <div>
                <ul className="uk-nav uk-nav-default uk-nav-parent-icon uk-margin" data-uk-nav>
                    <li className="uk-text-center">
                        <img className="uk-icon-button" src={state.user && state.user.photos[0].value} alt="" />
                    </li>
                </ul>
                <ul className="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
                    <li>
                        <NavLink to="/welcome" title="Welcome" activeClassName="active">
                            <span className="uk-margin-small-right" uk-icon="icon: home" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/parts" title="Parts" activeClassName="active">
                            <span className="uk-margin-small-right" uk-icon="icon: list" />
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="uk-nav uk-nav-default uk-nav-parent-icon uk-margin" data-uk-nav>
                    <li>
                        <a href="/api/logout">
                            <span className="uk-margin-small-right" uk-icon="icon: sign-out" />
                        </a>
                    </li>
                    <li>
                        <a onClick={onChangeTheme} onKeyDown={() => { }} role="button" tabIndex="-1">
                            <span className="uk-margin-small-right" uk-icon="icon: paint-bucket" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
