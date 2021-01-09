import React, { useState, useEffect, Fragment } from 'react';

export const Form = ({
    item,
    submitMe,
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

    const onSubmit = () => {
        if (submitMe) {
            submitMe(state);
        }
    };

    const config = {
        default: {
            className: 'uk-input',
            disabled: false,
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
        min_stock: {
            type: 'number',
            min: 0,
        },
        price_total: {
            className: 'uk-input uk-text-right',
            disabled: true,
            value: (parseFloat(state.price) * parseInt(state.stock)).toFixed(2).toString(),
        },
        stock: {
            type: 'number',
            min: 0,
        }
    };

    return (
        <form autoComplete="null" className="item-form uk-margin-top">
            {
                Object.keys(state).map(key => {
                    return (
                        <Fragment>
                            { key === 'image'
                                &&
                                (
                                    <div
                                        htmlFor="image_2"
                                        className="item-form-image-2"
                                        style={{ backgroundImage: `url(${state[key]})` }}
                                    />
                                )
                            }
                            <label className="uk-form-label" key={key} htmlFor={key}>
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

            <div className="item-form-separator-1" htmlFor="separator_1" />
            <div className="item-form-separator-2" htmlFor="separator_2" />

            <div className="item-form-footer" htmlFor="footer">
                <button
                    className="uk-button uk-button-default"
                    type="reset"
                    name="cancel"
                >
                    CANCEL
                </button>
                <button
                    className="uk-button uk-button-default"
                    onClick={() => onSubmit()}
                    type="button"
                    name="submit"
                >
                    {currentButtonName}
                </button>
                <button
                    className="uk-button uk-button-default"
                    type="button"
                    name="hide"
                    onClick={() => setState({ isFormVisible: false })}
                >
                    HIDE ME
                </button>
            </div>
        </form>
    );

};
