import React from 'react';

const Loader = ({
    loading=false
}) => (
    <>
        {
            loading && <div uk-spinner="true" />
        }
    </>
);

export default Loader;
