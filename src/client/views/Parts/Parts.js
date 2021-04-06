import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UIkit from 'uikit';
import { fetchAPI } from '../../utils/api';
import { Table } from './Table';

export const Parts = () => {

    const { id } = useParams();
    const history = useHistory();

    const [state, setState] = useState({
        addForm: id === 'new',
        index: null,
        items: [],
        item: {},
        current: 'SAVE',
        searchForm: false,
    });

    useEffect(() => {
        fetchAPI('/api/parts', (data) => {

            if (state.addForm &&  data.length > 0) {
                (async () => {
                    const response = await fetch('/api/partcolumns');
                    const columns = await response.json();
                    const altObj = Object.fromEntries(
                        // eslint-disable-next-line no-unused-vars
                        Object.entries(columns).map(([key, value]) =>
                            [`${value.name}`, '']
                        )
                    );

                    setState({
                        ...state,
                        items: data,
                        item: altObj,
                        current: 'SAVE',
                        searchForm: false,
                    });
                })();
            }

            if (!state.addForm && data.length > 0) {
                setState({
                    ...state,
                    current: 'SAVE',
                    items: data,
                    item: null,
                    searchForm: false
                });
            }
        });

    }, []);

    useEffect(() => {
        if (!isNaN(parseInt(id))) {
            setState({
                ...state,
                current: 'UPDATE',
                index: state.items.findIndex((x) => (x.id === parseInt(id))),
                item: state.items.filter(e => (e.id === parseInt(id)))[0],
            });
        }
    }, [state.items]);

    const onEdit = (index) => {
        const currentItem = state.items[index];
        setState({
            ...state,
            searchForm: false,
            item: currentItem,
            current: 'UPDATE',
            index,
        });
        history.push(`/parts/${state.items[index].id}`);
    };

    const onAdd = (oempart) => {
        (async () => {
            const response = await fetch('/api/partcolumns');
            const columns = await response.json();
            const altObj = Object.fromEntries(
                // eslint-disable-next-line no-unused-vars
                Object.entries(columns).map(([key, value]) =>
                    [`${value.name}`, '']
                )
            );

            if (oempart) {
                delete oempart.logo;
                delete oempart.datasheet;
            }

            setState({
                ...state,
                item: { ...altObj, ...oempart } ,
                current: 'SAVE',
                searchForm: false,
            });

            history.push('/parts/new');
        })();
    };

    const onSubmit = (formData) => {

        if (state.current === 'SAVE') {
            const options = {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const addItem = async () => {
                try {
                    const response = await fetch('/api/addpart', options);
                    const data = await response.json();
                    return data;
                } catch (error) {
                    throw error;
                }
            };

            addItem().then(data => {
                setState({
                    ...state,
                    item: data[0],
                    items: [...state.items, data[0]].reverse(),
                    current: 'UPDATE',
                });
            });
        }
        else if (state.current === 'UPDATE') {

            const options = {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const updateItem = async () => {
                try {
                    const response = await fetch('/api/part', options);
                    UIkit.notification({
                        message: (response.status === 200) ? 'Saved successfully' : 'Oops, something went wrong!',
                        status: (response.status === 200) ? 'success' : 'danger',
                        pos: 'top-right',
                        timeout: 1500,
                    });
                } catch (error) {
                    throw error;
                }
            };

            updateItem();

            setState({
                ...state,
                items: state.items.map((item, i) => i === parseInt(state.index)
                    ? { ...state.items[state.index], ...formData }
                    : item
                ),
            });
        }
        else {
            setState({
                ...state,
                item: formData,
                current: 'SAVE',
            });
        }
    };

    const onDelete = (event, index) => {
        setState({
            ...state,
            item: {},
            current: 'SAVE',
            items: state.items.filter((item, itemIndex) => (index != itemIndex)),
        });
    };

    const onSearch = () => {
        setState({ ...state, searchForm: true });
        console.log('SEARCH');
        return true;
    };

    // if (Object.keys(state).length === 0 && state.constructor === Object) {
    //     return null;
    // }

    return (
        <div className="parts">
            <Table
                items={state.items}
                selectedItem={state.item}
                currentButtonName={state.current}
                searchForm={state.searchForm}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={onDelete}
                onSubmit={onSubmit}
                onSearch={onSearch}
            />
        </div>
    );
};
