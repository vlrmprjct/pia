import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {

    return (
        <nav>
            <div className="left-nav-wrap">

                <ul className="uk-nav uk-nav-default uk-nav-parent-icon uk-margin" data-uk-nav>
                    <li className="uk-text-center">
                        <img className="uk-icon-button" src={props.user && props.user.avatar_url} alt="" />
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
                    <li>
                        <a href="/api/logout">
                            <span className="uk-margin-small-right" uk-icon="icon: sign-out" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
