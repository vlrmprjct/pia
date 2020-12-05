import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './views/App';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.body.querySelector('[data-root]')
);
