import React, { useState, useEffect, Fragment } from 'react';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

export const Form = ({
    item,
    onSubmit,
    currentButtonName,
}) => {

    const [state, setState] = useState(item);
    useEffect(() => setState(item), [item]);

    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const config = {
        default: {
            className: 'uk-input',
            disabled: false,
            tabIndex: 99,
            type: 'text',
        },
        id: {
            disabled: true,
        },
        date_created: {
            disabled: true,
        },
        date_updated: {
            disabled: true,
        },
        image: {
            type: 'url',
            placeholder: 'URL http(s):// ...',
            tabIndex: 14,
        },
        link: {
            type: 'url',
            placeholder: 'URL http(s):// ...',
            tabIndex: 15,
        },
        manufacturer: {
            tabIndex: 12,
        },
        manufacturer_nr: {
            tabIndex: 13,
        },
        min_stock: {
            type: 'number',
            min: 0,
            tabIndex: 7,
        },
        name: {
            tabIndex: 2,
        },
        price_total: {
            className: 'uk-input uk-text-right',
            disabled: true,
            value: state.price && (parseFloat(state.price) * parseInt(state.stock || 1)).toFixed(2).toString(),
        },
        price: {
            pattern: '.{3,}',
            placeholder: '0.00',
            tabIndex: 4,
        },
        stock: {
            type: 'number',
            min: 0,
            tabIndex: 6,
        },
        storage_name: {
            tabIndex: 8,
        },
        storage_location: {
            tabIndex: 9,
        },
        supplier: {
            tabIndex: 10,
        },
        supplier_nr: {
            tabIndex: 11,
        },
        tags: {
            tabIndex: 16,
        },
        type: {
            tabIndex: 1,
        },
        unit: {
            tabIndex: 5
        },
        value: {
            tabIndex: 3,
        }
    };

    if (item.length === 0) return null;

    return (
        <form autoComplete="null" className="form--entry">

            <div className="form--entry-toolbar" htmlFor="toolbar">
                <a
                    role="button"
                    tabIndex={0}
                    type="button"
                    onClick={() => onSubmit(state)}
                    onKeyPress={null}
                >
                    <span uk-icon="icon: check" />
                    {currentButtonName}
                </a>
            </div>

            {
                Object.keys(state).map(key => {
                    return (
                        <Fragment key={key}>
                            { key === 'image'
                                &&
                                (
                                    <div
                                        htmlFor="image_2"
                                        className="form--entry-image-2"
                                        style={state[key] === ''
                                            ? null
                                            : { backgroundImage: `url(${state[key]})`, backgroundColor: '#FFF' }
                                        }
                                    />
                                )
                            }
                            <label className="uk-form-label" htmlFor={key}>
                                {key.replace('_', ' ')}
                                <input
                                    {...config.default}
                                    {...config[key]}
                                    data-name={key}
                                    onChange={onChange}
                                    value={
                                        (config[key] && 'value' in config[key]) ? config[key].value : state[key] || ''
                                    }
                                    name={key}
                                />
                            </label>
                        </Fragment>
                    );
                })
            }

            <div className="form--entry-separator-1" htmlFor="separator_1" />
            <div className="form--entry-separator-2" htmlFor="separator_2" />

            <div className="form--entry-footer" htmlFor="footer">
                <div className="uk-border-rounded">
                    <button
                        className="uk-button uk-button-primary"
                        onClick={() => onSubmit(state)}
                        type="button"
                        name="submit"
                    >
                        <span uk-icon="icon: check" />
                        {' '}
                        {currentButtonName}
                    </button>
                </div>
            </div>
        </form>
    );

};
