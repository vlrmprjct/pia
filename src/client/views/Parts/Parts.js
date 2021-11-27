import React, { useState, useEffect  } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { fetchAPI } from '../../utils/api';
import { notification } from '../../utils/notification';
import { prepareForm } from '../../utils/prepareForm';
import { Table } from './Table';

export const Parts = () => {

    const { id } = useParams();
    const history = useHistory();
    const query = useLocation();

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

            const currentItem = data.filter(e => (e.id === id))[0] || [];

            fetchAPI('/api/partcolumns', (columns) => {
                setState({
                    ...state,
                    columns,
                    item: (id === 'new') ? prepareForm(columns) : currentItem,
                    items: data,
                    current: (id === 'new') ? 'SAVE' : 'UPDATE',
                });
            });

        });
    }, []);

    // useEffect(() => {
        // console.log('CHANGE');
        // if (id && id.length > 0 && id !== 'new' && state.current !== 'UPDATE') {
        //     setState({
        //         ...state,
        //         current: 'UPDATE',
        //         item: state.items.filter(e => (e.id === id))[0],
        //     });
        // }
        // if (id && id.length > 0 && id !== 'new' && state.current !== 'UPDATE') {
        //     setState({
        //         ...state,
        //         current: 'UPDATE',
        //         item: state.items.filter(e => (e.id === id))[0],
        //     });
        // }
    // }, [state.items]);

    const onEdit = (part) => {
        console.log(state.items);
        setState({
            ...state,
            items: state.items,
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
                    notification({
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
                    notification({
                        code: result.code,
                        expectedCode: 202,
                        message: 'Updated successfully',
                    });
                    setState({
                        ...state,
                        items: state.items.map((item, i) => i === stateItemID
                            ? { ...state.items[stateItemID], ...formData }
                            : item
                        ),
                    });

                }, options);
            },
        } || null;

        saveItem[state.current]();
        console.log(state.items);
    };

    const onDelete = (part) => {

        const options = {
            method: 'POST',
            body: JSON.stringify({ "id": part.id }),
        };

        // fetchAPI('/api/delete', (result) => {

        // const ID = state.items.findIndex((item) => item.id === part.id);
        // state.items.splice(ID, 1);
        // console.log(state.item);
        console.log(id);
        // console.log(part.id);
        let getParams = () => console.log(query);
        console.log(getParams());
        const x = state.items.filter((e) => {
            return e.id === id;
        });

        // console.log(x[0]);

        // const currentItem = state.items.filter(e => (e.id === id))[0];

        setState({
            ...state,
            // item: x[0],
            items: state.items,
        });

        //     notification({
        //         code: result.code,
        //         expectedCode: 204,
        //         message: 'Deleted successfully',
        //     });

        // if(!currentItem) history.push('/parts');

        // }, options);
    };

    const onSearch = () => {

        setState({
            ...state,
            searchForm: true,
        });

        history.push('/parts/search');
        return true;
    };

    console.log(state.items);

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
