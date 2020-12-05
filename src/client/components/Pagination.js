import React from 'react';

export const Pagination = (props) => {

    return (
        <div className="pagination uk-button-group">
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => props.gotoPage(0)}
                disabled={!props.canPreviousPage}
            >
                <span uk-icon="icon: chevron-double-left" />
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => props.previousPage()}
                disabled={!props.canPreviousPage}
            >
                <span uk-icon="icon: chevron-left" />
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => props.nextPage()}
                disabled={!props.canNextPage}
            >
                <span uk-icon="icon: chevron-right" />
            </button>
            <button
                className="uk-button uk-button-default"
                type="button"
                onClick={() => props.gotoPage(props.pageCount - 1)}
                disabled={!props.canNextPage}
            >
                <span uk-icon="icon: chevron-double-right" />
            </button>
        </div>
    );
};
