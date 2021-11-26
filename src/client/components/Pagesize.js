import React from 'react';
import { setLocalStorage } from './../utils/localstorage';

export const Pagesize = ({
    pageSize,
    setPageSize,
}) => {

    return (
        <div className="pagesize">
            <div uk-form-custom="target: > * > span:first-child">
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                        setLocalStorage({ 'pagesize': Number(e.target.value) });
                    }}
                >
                    {[10, 20, 30, 40, 50, 100].map(size => (
                        <option key={size} value={size}>
                            {size}
                            {' '}
                        </option>
                    ))}
                </select>
                <button className="uk-button uk-button-default" type="button" tabIndex="0">
                    <span>
                        {' '}
                    </span>
                    <span uk-icon="icon: chevron-down" />
                </button>
            </div>
        </div>
    );

};
