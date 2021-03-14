import React from 'react';

export const Add = ({
    onAdd = () => { },
    onSearch = () => { },
}) => {

    return (
        <div className="uk-button-group uk-border-rounded">
            <button
                type="button"
                className="actions uk-button uk-button-primary"
                onClick={onAdd}
            >
                <span uk-icon="icon: plus" />
                {' '}
                Add
            </button>
            <button
                type="button"
                className="actions uk-button uk-button-primary"
                onClick={onSearch}
            >
                <span uk-icon="icon: search" />
                {' '}
            </button>
        </div>
    );
};
