import React, { useMemo, Fragment } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {
    useTable,
    useRowState,
    useSortBy,
    useFlexLayout,
    useFilters,
    usePagination,
    useGlobalFilter
} from 'react-table';
import { getLocalStorage } from './../../utils/localstorage';
import { GlobalFilter, DefaultColumnFilter, fuzzyTextFilter } from './../../utils/filter';
import { Pagination } from './../../components/Pagination';
import { Pageselector } from './../../components/Pageselector';
import { Pagesize } from './../../components/Pagesize';

UIkit.use(Icons);
fuzzyTextFilter.autoRemove = val => !val;

export const Table = ({
    items,
    onAdd,
    onEdit,
    // onDelete
}) => {

    const data = useMemo(() => items);

    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: fuzzyTextFilter,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = useMemo(
        () => ({
            minWidth: 50,
            width: 80,
            maxWidth: 150,
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                minWidth: 40,
                width: 40,
                maxWidth: 40,
                className: 'uk-text-muted'
            },
            {
                Header: 'Name',
                accessor: 'name',
                width: 130,
            },
            {
                Header: 'Value',
                accessor: 'value',
                width: 150
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'SPN',
                accessor: 'supplier_nr',
            },
            {
                Header: 'Supplier',
                accessor: 'supplier',
            },
            {
                Header: 'MPN',
                accessor: 'manufacturer_nr',
            },
            {
                Header: 'Manufacturer',
                accessor: 'manufacturer',
            },
            {
                Header: 'Toolbar',
                accessor: '',
                Cell: props => {
                    return (
                        <button
                            className="uk-text-muted"
                            uk-icon="file-edit"
                            type="button"
                            onClick={e => {
                                rowSelect(e, props.row.id);
                            }}
                        />
                    );
                }
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        // pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            initialState: {
                pageIndex: 0,
                pageSize: getLocalStorage('pagesize') || 20,
            },
            autoResetSortBy: false,
            autoResetFilters: false,
            autoResetRowState: false,
        },
        useRowState,
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useFlexLayout,

    );

    const rowSelect = (event, index) => {
        if (onEdit) {
            onEdit(index);
        }
    };

    return (
        <Fragment>
            <section className="toolbar">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />

                <Pagination
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    className="foobar"
                    gotoPage={gotoPage}
                    nextPage={nextPage}
                    pageCount={pageCount}
                    previousPage={previousPage}
                />

                <Pagesize
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                />

                <Pageselector
                    pageCount={pageCount}
                    pageIndex={pageIndex}
                    gotoPage={gotoPage}
                />

                <button
                    type="button"
                    className="actions uk-button uk-button-primary uk-button-small"
                    onClick={onAdd}
                >
                    <span uk-icon="icon: plus" />
                    {' '}
                    Add Part
                </button>

            </section>

            <section className="data">
                <table
                    {...getTableProps()}
                    className="uk-table uk-table-divider uk-table-hover uk-table-striped uk-table-small"
                >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span className="sort">
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <span uk-icon="chevron-down" />
                                                    : <span uk-icon="chevron-up" />
                                                : <span uk-icon="minus" />}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => onEdit(row.id)}
                                    onDoubleClick={(event) => {
                                        rowSelect(event, row.id);
                                    }}
                                >
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    className: cell.column.className
                                                })}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );

                                    })}

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>


        </Fragment>
    );
};
