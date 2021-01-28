import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UIkit from 'uikit';
import { octopartSearch } from '../../utils/octopart';
import { Table } from './Table';
import { Form } from './Form';

const Parts = () => {
    const [state, setState] = useState({});
    const history = useHistory();

    useEffect(() => {

        const loadItems = async () => {
            try {

                // const response2 = await fetch('/api/octopart/ECEA1CKS100');
                // const data2 = await response2.json();
                // console.log(data2);

                // const response3 = await fetch('/api/mouser/attiny84');
                // const data3 = await response3.json();
                // console.log(data3);

                // const response3 = await fetch('/api/oemsecret/attiny84');
                // const data3 = await response3.json();
                // console.log(data3);

                const response = await fetch('/api/parts');
                const data = await response.json();
                setState({
                    current: 'SAVE',
                    items: data,
                    item: null,
                    isFormVisible: false
                });
            } catch (error) {
                throw error;
            }
        };

        loadItems();

    }, []);

    const onEdit = (index) => {
        const currentItem = state.items[index];
        setState({
            ...state,
            isFormVisible: true,
            item: currentItem,
            current: 'UPDATE',
            index,
        });
        history.push(`/parts/${state.items[index].id}`);
    };

    const onAdd = () => {
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
                item: altObj,
                current: 'SAVE',
                isFormVisible: true
            });

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
                    octopartSearch(formData.manufacturer_nr).then(data => {
                        console.log(data);
                    });

                    const response = await fetch('/api/part', options);
                    UIkit.notification({
                        message: (response.status === 200) ? 'Saved successfully' : 'Oops, something went wrong!',
                        status: (response.status === 200) ? 'success' : 'danger',
                        pos: 'top-right',
                        timeout: 5,
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

    if (Object.keys(state).length === 0 && state.constructor === Object) {
        return null;
    }

    return (
        <div className="home open">

            {/* <div className="item">
                {state.isFormVisible && (
                    <Form
                        item={state.item}
                        submitMe={onSubmit}
                        currentButtonName={state.current}
                    />
                )}
            </div> */}

            <div className="parts">
                <Table
                    items={state.items}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>

        </div>
    );
};

export default Parts;
