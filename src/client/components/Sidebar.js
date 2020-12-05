import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => (

    <nav id="left-col">

        <div className="left-nav-wrap">
            <ul className="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
                <li className="uk-parent">
                    <a href="#/">
                        <span data-uk-icon="icon: thumbnails" className="uk-margin-small-right" />
                    </a>
                    <ul className="uk-nav-sub">
                        <li><a title="Article" href="https://zzseba78.github.io/Kick-Off/article.html">Article</a></li>
                        <li><a title="Album" href="https://zzseba78.github.io/Kick-Off/album.html">Album</a></li>
                        <li><a title="Cover" href="https://zzseba78.github.io/Kick-Off/cover.html">Cover</a></li>
                        <li><a title="Cards" href="https://zzseba78.github.io/Kick-Off/cards.html">Cards</a></li>
                        <li><a title="News Blog" href="https://zzseba78.github.io/Kick-Off/newsBlog.html">News Blog</a></li>
                        <li><a title="Price" href="https://zzseba78.github.io/Kick-Off/price.html">Price</a></li>
                        <li><a title="Login" href="https://zzseba78.github.io/Kick-Off/login.html">Login</a></li>
                        <li><a title="Login-Dark" href="https://zzseba78.github.io/Kick-Off/login-dark.html">Login - Dark</a></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/dashboard" title="Dashboard" activeClassName="active">
                        <span className="uk-margin-small-right" uk-icon="icon: home" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/parts" title="Parts" activeClassName="active">
                        <span className="uk-margin-small-right" uk-icon="icon: list" />
                    </NavLink>
                </li>
                <li>
                    <a href="#/">
                        <span data-uk-icon="icon: album" className="uk-margin-small-right" />
                    </a>
                </li>
                <li className="uk-parent">
                    <a href="#/"><span data-uk-icon="icon: comments" className="uk-margin-small-right" /></a>
                    <ul className="uk-nav-sub">
                        <li><a href="#//">Sub item</a></li>
                        <li><a href="#//">Sub item</a></li>
                    </ul>
                </li>
            </ul>

        </div>

    </nav>
);

Sidebar.defaultProps = {
    groups: [{
        links: [{
            icon: 'Home',
            name: 'Home',
            url: 'http://example.com',
            links: [{
                name: 'Activity',
                url: 'http://msn.com',
            }, {
                name: 'News',
                url: 'http://msn.com',
            }],
            isExpanded: true,
        }, {
            name: 'Documents',
            url: 'http://example.com',
            isExpanded: true,
        }, {
            name: 'Pages',
            url: 'http://msn.com',
        }, {
            name: 'Notebook',
            url: 'http://msn.com',
        }, {
            name: 'Long Name Test for elipsis. Longer than 12em!',
            url: 'http://example.com',
        }, {
            name: 'Edit Link',
            url: 'http://example.com',
            iconClassName: 'ms-Icon--Edit',
        }, {
            name: 'Edit',
            url: '#/',
            icon: 'Edit',
            onClick: () => { },
        }]
    }],
    expanded: 'expanded',
    collapsed: 'collapsed',
};

export default Sidebar;
