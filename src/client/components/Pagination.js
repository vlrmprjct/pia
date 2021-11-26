import React from 'react';

export const Pagination = ({
    activePage,
    perPage,
    totalPages,
    onPageChange,
}) => {

    const roundPaging = Math.ceil(totalPages / perPage);

    return (
        <div className="pagination uk-button-group">
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => onPageChange(1)}
                disabled={activePage === 1}
            >
                <span uk-icon="icon: chevron-double-left" />
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => onPageChange(activePage - 1)}
                disabled={activePage === 1}
            >
                <span uk-icon="icon: chevron-left" />
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                disabled
            >
                {activePage}
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => onPageChange(activePage + 1)}
                disabled={activePage === roundPaging}
            >
                <span uk-icon="icon: chevron-right" />
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => onPageChange(roundPaging)}
                disabled={activePage === roundPaging}
            >
                <span uk-icon="icon: chevron-double-right" />
            </button>
        </div>
    );
};
