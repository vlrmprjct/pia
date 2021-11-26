import React, { useState, useEffect  } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UIkit from 'uikit';
import { fetchAPI } from '../../utils/api';
import { prepareForm } from '../../utils/prepareForm';
import { Table } from './Table';

const setNotification = ({
    expectedCode = 200,
    code = null,
    message = 'Success',
    timeout = 2000,
    pos = 'top-right',
    type = 'success',
}) => {

    UIkit.notification({
        message: (code === expectedCode)
            ? message
            : 'Oops, something went wrong!',
        status: (code === expectedCode)
            ? type
            : 'danger',
        pos,
        timeout,
    });

    return null;

};

export const Parts = () => {

    const { id } = useParams();
    const history = useHistory();

    const [state, setState] = useState({
        addForm: id === 'new',
        searchForm: id === 'search',
        columns: [],
        items: [],
        item: [],
        current: 'SAVE',
    });

    useEffect(() => {
        fetchAPI('/api/parts', (data) => {

            fetchAPI('/api/partcolumns', (columns) => {
                setState({
                    ...state,
                    columns,
                    item: id === 'new' ? prepareForm(columns) : null,
                    items: data,
                    current: 'SAVE',
                });
            });

        });
    }, []);

    useEffect(() => {
        if (id && id.length > 0 && id !== 'new' && state.current !== 'UPDATE') {
            setState({
                ...state,
                current: 'UPDATE',
                item: state.items.filter(e => (e.id === id))[0],
            });
        }
    }, [state.items]);

    const onEdit = (part) => {
        setState({
            ...state,
            searchForm: false,
            item: part,
            current: 'UPDATE',
        });
        history.push(`/parts/${part.id}`);
    };

    const onAdd = (oempart) => {
        if (oempart) {
            delete oempart.logo;
            delete oempart.datasheet;
        }

        setState({
            ...state,
            item: { ...prepareForm(state.columns), ...oempart},
            current: 'SAVE',
            searchForm: false,
        });

        history.push('/parts/new');
    };

    const onSubmit = (formData) => {

        const options = {
            method: 'POST',
            body: JSON.stringify(formData)
        };

        const saveItem = {
            'SAVE': () => {

                fetchAPI('/api/addpart', (result) => {
                    setNotification({
                        code: result.response.code,
                        expectedCode: 200,
                        message: 'Saved successfully',
                    });
                    setState({
                        ...state,
                        item: result.data,
                        items: [result.data, ...state.items],
                        current: 'UPDATE',
                    });
                    history.push(`/parts/${result.data.id}`);

                }, options);
            },
            'UPDATE': () => {

                const stateItemID = state.items.findIndex((item) => item.id === formData.id);

                fetchAPI('/api/part', (result) => {
                    setNotification({
                        code: result.code,
                        expectedCode: 202,
                        message: 'Updated successfully',
                    });
                    setState({
                        ...state,
                        items: state.items.map((item, i) => i === stateItemID
                            ? { ...state.items[state.index], ...formData }
                            : item
                        ),
                    });

                }, options);
            },
        } || null;

        saveItem[state.current]();

    };

    const onDelete = (part) => {

        const options = {
            method: 'POST',
            body: JSON.stringify({ "id": part.id }),
        };

        fetchAPI('/api/delete', (result) => {

            setState({
                ...state,
                item: (result.id === part.id) ? [] : state.item,
                items: state.items.filter((item) => {
                    return (result.id !== item.id);
                }),
            });

            setNotification({
                code: result.code,
                expectedCode: 204,
                message: 'Deleted successfully',
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

    if (state.columns.length === 0) return null;

    return (
        <div className="parts">
            <Table
                columns={state.columns}
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
