import React, { useEffect} from 'react';
import { matchSorter } from 'match-sorter';
import { useFocus } from './usefocus';

export const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const [inputRef, setInputFocus] = useFocus();
    const count = preGlobalFilteredRows.length;

    useEffect(() => {
        setInputFocus();
    }, []);

    return (
        <input
            ref={inputRef}
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
            ref
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
