import React from 'react';
import matchSorter from 'match-sorter';


export const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length;

    return (
        <input
            className="filter uk-input"
            type="text"
            value={globalFilter || ''}
            onChange={e => {
                setGlobalFilter(e.target.value || undefined);
            }}
            placeholder={`Search in ${count} records ...`}
        />
    );
};

export const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
}) => {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
};

export const fuzzyTextFilter = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
};
