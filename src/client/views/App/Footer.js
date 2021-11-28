import React from 'react';

const Footer = () => (
    <footer>
        <a href="https://github.com/vlrmprjct/pia" rel="noreferrer" target="_blank">
            <span aria-label="copyright" role="img">©️</span>
            {new Date().getFullYear()}
        </a>
    </footer>
);

export default Footer;
