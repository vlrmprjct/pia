import React, { useState, useEffect  } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UIkit from 'uikit';
import { fetchAPI } from '../../utils/api';
import { prepareForm } from '../../utils/prepareForm';
import { Table } from './Table';

export const Parts = () => {

    const { id } = useParams();
    const history = useHistory();

    const [state, setState] = useState({
        addForm: id === 'new',
        searchForm: id === 'search',
        index: null,
        items: [],
        item: [],
        current: 'SAVE',
    });

    useEffect(() => {
        fetchAPI('/api/parts', (data) => {

            if (state.addForm && data.length >= 0) {

                fetchAPI('/api/partcolumns', (columns) => {
                    setState({
                        ...state,
                        items: data,
                        item: prepareForm(columns),
                        current: 'SAVE',
                    });
                });

            }

            if (!state.addForm && data.length > 0) {
                setState({
                    ...state,
                    current: 'SAVE',
                    items: data,
                    item: null,
                });
            }
        });

    }, []);

    useEffect(() => {
        if (id && id.length > 0 && id !== 'new' && state.current !== 'UPDATE') {
            setState({
                ...state,
                current: 'UPDATE',
                index: state.items.findIndex((x) => (x.id === id)),
                item: state.items.filter(e => (e.id === id))[0],
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

        fetchAPI('/api/partcolumns', (columns) => {

            if (oempart) {
                delete oempart.logo;
                delete oempart.datasheet;
            }

            setState({
                ...state,
                item: { ...prepareForm(columns), ...oempart},
                current: 'SAVE',
                searchForm: false,
            });

            history.push('/parts/new');
        });
    };

    const onSubmit = (formData) => {

        const options = {
            method: 'POST',
            body: JSON.stringify(formData),
        };

        if (state.current === 'SAVE') {

            fetchAPI('/api/addpart', (result) => {
                UIkit.notification({
                    message: (result.response.code === 200) ? 'Saved successfully' : 'Oops, something went wrong!',
                    status: (result.response.code === 200) ? 'success' : 'danger',
                    pos: 'top-right',
                    timeout: 2000,
                });
                setState({
                    ...state,
                    item: result.data,
                    items: [result.data, ...state.items],
                    current: 'UPDATE',
                });
                history.push(`/parts/${result.data.id}`);
            }, options);

        }
        else if (state.current === 'UPDATE') {

            fetchAPI('/api/part', (data) => {
                UIkit.notification({
                    message: (data.code === 202) ? 'Updated successfully' : 'Oops, something went wrong!',
                    status: (data.code === 202) ? 'success' : 'danger',
                    pos: 'top-right',
                    timeout: 2000,
                });
                setState({
                    ...state,
                    items: state.items.map((item, i) => i === parseInt(state.index)
                        ? { ...state.items[state.index], ...formData }
                        : item
                    ),
                });
            }, options);

        }
        else {
            setState({
                ...state,
                item: formData,
                current: 'SAVE',
            });
        }
    };

    const onDelete = (index) => {

        const options = {
            method: 'POST',
            body: JSON.stringify({ "id": state.items[index].id }),
        };

        fetchAPI('/api/delete', (result) => {

            setState({
                ...state,
                item: (result.id === state.item.id) ? [] : state.item,
                items: state.items.filter((item) => {
                    return (result.id !== item.id);
                }),
            });

            UIkit.notification({
                message: (result.code === 204) ? 'Deleted successfully' : 'Oops, something went wrong!',
                status: (result.code === 204) ? 'success' : 'danger',
                pos: 'top-right',
                timeout: 2000,
            });

        }, options);
    };

    const onSearch = () => {

        setState({
            ...state,
            searchForm: true,
        });

        history.push('/parts/search');
        return true;
    };

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
