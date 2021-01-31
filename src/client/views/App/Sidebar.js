import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => (
    <nav>
        <div className="left-nav-wrap">
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
    </nav>
);

export default Sidebar;
