import { matchSorter } from 'match-sorter';

export const fuzzyTextFilter = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
};
