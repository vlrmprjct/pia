import React from 'react';

const Dashboard = (props) => {
    return (
        <div className="uk-child-width-1-2@s uk-grid-match" uk-grid>
            <div>
                <div className="uk-card uk-card-hover uk-card-body">
                    <h3 className="uk-card-title">Hover</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                    <h3 className="uk-card-title">Default</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
                    <h3 className="uk-card-title">Primary</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                    <h3 className="uk-card-title">Secondary</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
