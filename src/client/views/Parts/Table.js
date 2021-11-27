import React, { useState, useRef, useEffect } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import SmartDataTable from 'react-smart-data-table';
import SplitterLayout from 'react-splitter-layout';
import { getLocalStorage, setLocalStorage } from './../../utils/localstorage';
import { prepareForm } from '../../utils/prepareForm';
import { Filter } from './../../components/Filter';
import { Pagination } from './../../components/Pagination';
import { Pagesize } from './../../components/Pagesize';
import { Form } from './Form';
import { Search } from './Search';
import { Add } from './Toolbar/Add';

UIkit.use(Icons);

export const Table = ({
    columns,
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
    const table = useRef(null);

    const [state, setState] = useState({
        activePage: 1,
        columns: prepareForm(columns),
        clicks: 0,
        count: 0,
        filter: '',
        perPage: getLocalStorage('pagesize') || 10,
    });

    useEffect(() => {
        if (table?.current) {
            setState({
                ...state,
                activePage: 1,
                count: table.current.getRows().length,
            });
        }
    }, [items, state.filter]);

    return (
        <>
            <section className="toolbar">
                <Filter
                    count={state.count}
                    value={state.filter}
                    onChange={e => {
                        setState({
                            ...state,
                            filter: e,
                        });
                    }}
                />

                <Pagination
                    activePage={state.activePage}
                    perPage={state.perPage}
                    totalPages={state.count}
                    onPageChange={(activePage) => {
                        setState({ ...state, activePage });
                        table.current.handleOnPageChange(null, {
                            activePage,
                        });
                    }}
                />

                <Pagesize
                    setPageSize={(value) => {
                        setState({
                            ...state,
                            activePage: 1,
                            perPage: value,
                        });
                        table.current.handleOnPageChange(null, {
                            activePage: 1
                        });
                    }}
                    pageSize={state.perPage}
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

                    <SmartDataTable
                        ref={table}
                        name="parts"
                        data={items}
                        dataKey={null}
                        className="uk-table uk-table-divider uk-table-hover uk-table-striped uk-table-small"
                        headers={{
                            ...state.columns,
                            ...{
                                actions: {
                                    text: 'Actions',
                                    // invisible: false,
                                    // sortable: false,
                                    // filterable: false,
                                    transform: (value, index, row) => {
                                        return (
                                            <>
                                                <a
                                                    role="button"
                                                    tabIndex={0}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onEdit(row);
                                                    }}
                                                    onKeyPress={null}
                                                    uk-icon="icon: file-edit; ratio: 0.8"
                                                    title="Edit"
                                                >
                                                    {' '}
                                                </a>
                                                {' '}
                                                {/* <a
                                                    role="button"
                                                    tabIndex={0}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        console.log('DELETE');
                                                        onDelete(row);
                                                    }}
                                                    onKeyPress={null}
                                                    uk-icon="icon: trash; ratio: 0.8"
                                                    title="Delete"
                                                >
                                                    {' '}
                                                </a> */}
                                            </>
                                        );
                                    },
                                },
                                date_created: {
                                    invisible: true,
                                },
                                date_updated: {
                                    invisible: true,
                                },
                                id: {
                                    invisible: true,
                                },
                                image: {
                                    invisible: true,
                                },
                                link: {
                                    invisible: true,
                                },
                                min_stock: {
                                    invisible: true,
                                },
                                name: {
                                    text: 'Name',
                                },
                                price: {
                                    invisible: true,
                                },
                                price_total: {
                                    invisible: true,
                                },
                                value: {
                                    text: 'Value',
                                },
                                tags: {
                                    invisible: true,
                                },
                                type: {
                                    text: 'Type',
                                },
                                stock: {
                                    invisible: true,
                                },
                                storage_location: {
                                    invisible: true,
                                },
                                storage_name: {
                                    invisible: true,
                                },
                                supplier_nr: {
                                    text: 'SPN',
                                },
                                supplier: {
                                    text: 'Supplier',
                                },
                                manufacturer_nr: {
                                    text: 'MPN',
                                },
                                manufacturer: {
                                    text: 'Manufacturer',
                                },
                                unit: {
                                    invisible: true,
                                }
                            }
                        }}
                        sortable
                        perPage={state.perPage}
                        loader="load"
                        orderedHeaders={[
                            'type',
                            'name',
                            'value',
                            'supplier_nr',
                            'supplier',
                            'manufacturer_nr',
                            'manufacturer',
                            'actions',
                        ]}
                        paginator={() => null}
                        // onRowClick={(e, { rowData }) => {
                        //     e.preventDefault();
                        //     e.stopPropagation();
                        //     state.clicks++;
                        //     setTimeout(() => {
                        //         setState({
                        //             ...state,
                        //             clicks: 0,
                        //         });
                        //     }, 400);

                        //     if (state.clicks === 2) {
                        //         // Array.from(e.currentTarget.parentNode.children).forEach((row) => {
                        //         //     row.classList.remove('table-row--selected');
                        //         // });
                        //         // e.currentTarget.classList.add('table-row--selected');
                        //         setState({
                        //             ...state,
                        //             clicks: 0,
                        //         });
                        //         onEdit(rowData);
                        //     }
                        // }}
                        filterValue={state.filter}
                    />
                </section>

                <section ref={formPane} className="form uk-background-secondary">
                    {searchForm && (
                        <Search
                            onSelect={(oemSelected) => {
                                onAdd(oemSelected);
                            }}
                        />
                    )}
                    {!searchForm && (
                        <Form
                            item={selectedItem || []}
                            onSubmit={onSubmit}
                            currentButtonName={currentButtonName}
                        />
                    )}
                </section>

            </SplitterLayout>

        </>
    );
};
