import React, { useMemo, useRef } from 'react';
import cuid from 'cuid';
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
import SplitterLayout from 'react-splitter-layout';
import { getLocalStorage, fuzzyTextFilter, setLocalStorage } from './../../utils';
import { Pagination } from './../../components/Pagination';
import { Pageselector } from './../../components/Pageselector';
import { Pagesize } from './../../components/Pagesize';
import { Filter } from './Toolbar/Filter';
import { Form } from './Form';
import { Search } from './Search';
import { Add } from './Toolbar/Add';

UIkit.use(Icons);
fuzzyTextFilter.autoRemove = val => !val;

export const Table = ({
    currentButtonName,
    items,
    selectedItem,
    onAdd,
    onEdit,
    onSubmit,
    onDelete,
    searchForm,
    onSearch,
}) => {

    const dataPane = useRef(null);
    const formPane = useRef(null);

    const data = useMemo(() => items);

    const filterTypes = useMemo(
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
        }),
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                width: 120,
            },
            {
                Header: 'Value',
                accessor: 'value',
                width: 70,
            },
            {
                Header: 'Type',
                accessor: 'type',
                width: 60,
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
            useControlledState: state => {
                return useMemo(
                    () => ({
                        ...state,
                        searchForm,
                    }),
                    [state, searchForm]
                );
            },
        },
        useRowState,
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useFlexLayout,
    );

    return (
        <>
            <section className="toolbar">
                <Filter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />

                <Pagination
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
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

                <Add
                    onAdd={() => onAdd()}
                    onSearch={() => onSearch()}
                />
            </section>

            <SplitterLayout
                customClassName="pane"
                secondaryInitialSize={getLocalStorage('datapanesize') || 592}
                secondaryMinSize={480}
                primaryMinSize={750}
                onDragEnd={() => {
                    setLocalStorage({ 'datapanesize': formPane.current.offsetWidth });
                }}
            >

                <section ref={dataPane} className="data">
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
                                            <span key={cuid()} className="sort">
                                                <span
                                                    uk-icon="icon: triangle-up; ratio: 1"
                                                    className={`sort-icon ${column.isSorted && !column.isSortedDesc
                                                        ? 'sort-icon--active' : ''}`}
                                                />
                                                <span
                                                    uk-icon="icon: triangle-down; ratio: 1"
                                                    className={`sort-icon ${column.isSorted && column.isSortedDesc
                                                        ? 'sort-icon--active' : ''}`}
                                                />
                                            </span>
                                        </th>
                                    ))}
                                    <th width="40" />
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className={
                                            selectedItem
                                            && (selectedItem.id === row.original.id) ? 'table-row--selected' : ''
                                        }
                                        onDoubleClick={() => onEdit(row.id)}
                                    >
                                        {row.cells.map(cell => {
                                            return (
                                                <td
                                                    {...cell.getCellProps({
                                                        className: cell.column.className,
                                                        // contentEditable: true,
                                                        // suppressContentEditableWarning: true,
                                                    })}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );

                                        })}
                                        <td>
                                            <a
                                                role="button"
                                                tabIndex={0}
                                                type="button"
                                                onClick={() => onEdit(row.id)}
                                                onKeyPress={null}
                                                uk-icon="icon: file-edit; ratio: 0.8"
                                                title="Edit"
                                            >
                                                {' '}
                                            </a>
                                            {' '}
                                            <a
                                                role="button"
                                                tabIndex={0}
                                                type="button"
                                                onClick={() => onDelete(row.id)}
                                                onKeyPress={null}
                                                uk-icon="icon: trash; ratio: 0.8"
                                                title="Delete"
                                            >
                                                {' '}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>

                <section ref={formPane} className="form uk-background-secondary">

                    <Search
                        onSelect={(oemSelected) => {
                            onAdd(oemSelected);
                        }}
                        show={searchForm}
                    />

                    <Form
                        currentButtonName={currentButtonName}
                        item={selectedItem || []}
                        onSubmit={onSubmit}
                        show={!searchForm}
                    />

                </section>

            </SplitterLayout>

        </>
    );
};
