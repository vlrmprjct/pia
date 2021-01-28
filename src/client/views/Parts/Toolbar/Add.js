import React, { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from './../../../utils/localstorage';
import { sleep } from './../../../utils/sleep';
import { useFocus } from './../../../utils/usefocus';
import { stringToColour } from './../../../utils/stringcolor';
import Loader from './../../../components/Loader';

export const Add = ({
    onClick = () => {},
}) => {

    const [inputRef, setInputFocus] = useFocus();

    const [state, setState] = useState({
        loading: false,
        result: {
            distributors: null,
            oemsecret: null,
            selected: null,
        },
        searchTerm: '',
        searchLatest: (getLocalStorage('latest')) ? getLocalStorage('latest').split(',') : [],
    });

    useEffect(() => {
        setLocalStorage({ 'latest': state.searchLatest.join(',') });
    }, [state.searchLatest]);

    const oemsecretRemap = (obj) => {
        const result = obj.stock.map((x) => {
            return {
                buy: x.buy_now_url,
                description: x.description,
                image: x.image_url,
                datasheet: x.datasheet_url,
                distributor: x.distributor.distributor_name,
                logo: x.distributor.distributor_logo,
                partnumber: x.part_number
            };
        });
        return result;
    };

    const color = (str) => {
        return { 'backgroundColor': stringToColour(str, '11') };
    };

    const onEnter = async () => {
        setState({ ...state, loading: true });
        await fetch('/api/oemsecret/' + state.searchTerm)
            .then(response => response.json())
            .then(data => {
                setState({
                    ...state,
                    loading: false,
                    searchLatest: (!state.searchLatest.includes(state.searchTerm))
                        ? [state.searchTerm]
                            .concat(state.searchLatest)
                            .slice(0, 7)
                        : state.searchLatest,
                    result: {
                        oemsecret: oemsecretRemap(data),
                        distributors: [...new Set(oemsecretRemap(data).map(item => {
                            return item.distributor;
                        }))],
                    }
                });
            });
    };

    return (
        <div className="uk-button-group uk-border-rounded">
            <button
                type="button"
                className="actions uk-button uk-button-primary"
                onClick={onClick}
            >
                <span uk-icon="icon: plus" />
                {' '}
                Add
            </button>
            <div className="uk-inline uk-border-rounded">
                <button
                    className="uk-button uk-button-primary"
                    type="button"
                    onClick={async () => {
                        await sleep(100);
                        setInputFocus();
                    }}
                >
                    <span uk-icon="icon: search" />
                </button>
                <div
                    uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true; pos: bottom-right"
                >
                    <h4>Find part by manufacturer-nr or supplier-nr</h4>

                    <div className="uk-inline uk-width-expand">
                        <button
                            type="button"
                            className="uk-form-icon uk-form-icon-flip"
                            uk-icon="icon: search"
                            onClick={() => {
                                if (state.searchTerm.length >= 4) {
                                    onEnter();
                                }
                            }}
                        />
                        <input
                            ref={inputRef}
                            className="uk-input"
                            type="text"
                            onChange={value => setState({ ...state, searchTerm: value.currentTarget.value })}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter' && state.searchTerm.length >= 3) {
                                    onEnter();
                                }
                            }}
                            placeholder="Enter Term ( min. 4 Char ! )"
                            value={state.searchTerm}
                        />
                    </div>

                    <div className="uk-inline uk-width-expand uk-margin-bottom">
                        {state.searchLatest && 'Latest Terms: '}
                        {state.searchLatest && state.searchLatest.map((entry) => {
                            return (
                                <a
                                    aria-hidden="true"
                                    role="button"
                                    onClick={() => {
                                        setState({ ...state, searchTerm: entry });
                                    }}
                                >
                                    {`${entry} `}
                                </a>
                            );
                        })}
                    </div>

                    <Loader loading={state.loading} />

                    <div className="distributor uk-nav uk-dropdown-nav" uk-filter="target: .js-filter">

                        {state.result.oemsecret && !state.loading && (
                            <>
                                <div className="distributor--filter">
                                    <ul className="">
                                        <li>
                                            <span
                                                uk-filter-control=""
                                                className="uk-label uk-label-hollow uk-border-rounded uk-active "
                                            >
                                                All
                                            </span>
                                        </li>
                                        {
                                            state.result.distributors.map((distributor) => {
                                                return (
                                                    <li>
                                                        <span
                                                            uk-filter-control={`[data-distributor='${distributor}']`}
                                                            className="uk-label uk-label-hollow uk-border-rounded"
                                                            style={color(distributor)}
                                                        >
                                                            {distributor}
                                                        </span>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>

                                <div className="js-filter distributor--result uk-list uk-list-striped uk-list-divider">
                                    {
                                        state.result.oemsecret.map((item) => {
                                            // TODO: Should we enable ? Items without descr. or just a numeric descr.
                                            // const reg = /^\d+$/;
                                            // if (!item.description) return false;
                                            // if (reg.test(item.description)) return false;
                                            return (
                                                <ul className="distributor--item" data-distributor={item.distributor}>
                                                    <li className="distributor--image">
                                                        <img
                                                            src={item.image}
                                                            className="uk-border uk-border-rounded"
                                                            alt=""
                                                            uk-img="true"
                                                        />
                                                    </li>
                                                    <li className="distributor--logo">
                                                        <img src={item.logo} alt="" />
                                                    </li>

                                                    <li className="distributor--name">
                                                        <ul className="uk-iconnav">
                                                            <li>
                                                                <span
                                                                    // eslint-disable-next-line max-len
                                                                    className="uk-label uk-label-hollow uk-border-rounded"
                                                                    style={color(item.distributor)}
                                                                >
                                                                    {item.distributor}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span
                                                                    uk-icon="icon: plus"
                                                                    role="button"
                                                                    tabIndex="0"
                                                                    onKeyDown={() => {}}
                                                                    onClick={() => {
                                                                        setState({ ...state, selected: item });
                                                                    }}
                                                                />
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href={item.datasheet}
                                                                    disabled={item.datasheet === ''}
                                                                    target="_blank"
                                                                    title={
                                                                        (item.datasheet === '')
                                                                            ? 'No Datasheet provided'
                                                                            : 'Datasheet'
                                                                    }
                                                                    rel="noreferrer"
                                                                    uk-icon="icon: link"
                                                                >
                                                                    {' '}
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href={item.buy}
                                                                    disabled={item.buy === ''}
                                                                    target="_blank"
                                                                    title="Buy"
                                                                    rel="noreferrer"
                                                                    uk-icon="icon: cart"
                                                                >
                                                                    {' '}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="distributor--partnumber">
                                                        {item.partnumber}
                                                    </li>
                                                    <li className="distributor--description">
                                                        {item.description}
                                                    </li>
                                                </ul>
                                            );
                                        })
                                    }
                                </div>
                            </>
                        )}

                        <div className="distributor--status">
                            <div className="uk-nav-divider" />
                            {`Result Count: ${(state.result.oemsecret)
                                ? Object.keys(state.result.oemsecret).length
                                : 0
                            }`
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
