import React, { useState, useEffect } from 'react';
import cuid from 'cuid';
import { getLocalStorage, setLocalStorage } from './../../utils/localstorage';
import { sleep } from './../../utils/sleep';
import { useFocus } from './../../utils/usefocus';
import { stringToColour } from './../../utils/stringcolor';
import Loader from './../../components/Loader';

export const Search = ({
    onSelect= () => { },
}) => {

    const [inputRef, setInputFocus] = useFocus();

    const [state, setState] = useState({
        form: false,
        loading: false,
        result: {
            distributors: null,
            oemsecret: null,
            selected: null,
        },
        searchTerm: '',
        searchLatest: (getLocalStorage('latest')) ? getLocalStorage('latest').split(',') : [],
        selected: null,
    });

    // const mock = {
    //     "link": "https://analytics.oemsecrets.com/main.php?p=MF-NSMF110-2&m=Bourns%20Electronics&q=0&n=Avnet%20Europe&table=api&media=buynow&source=lokalnetz&event_link=https%3A%2F%2Fwww.avnet.com%2Fshop%2Femea%2Fproducts%2Fbourns%2Fmf-nsmf110-2-3074457345629218657%3Fc%3DEUR%26r%3DEMEA%26CMP%3DEMEA_OEMSecrets_inventoryfeed_VSE",
    //     "name": "PTC Resettable Fuse 100A 6V T/R",
    //     "image": "https://www.avnet.com/opasdata/d120001/derivates/2/072/217/004/PF-5111023-Image_web.jpg",
    //     "datasheet": "",
    //     "supplier": "Avnet Europe",
    //     "logo": "https://www.oemsecrets.com/images/logos/suppliers/avnet.png",
    //     "manufacturer_nr": "MFNSMF1102",
    //     "manufacturer": "Microchip Technology",
    //     "supplier_nr": "3131874",
    // };

    useEffect(() => {
        const delay = async () => await sleep(100);
        delay();
        setInputFocus();
    }, []);

    useEffect(() => {
        setLocalStorage({ 'latest': state.searchLatest.join(',') });
    }, [state.searchLatest]);

    const oemsecretRemap = (obj) => {
        const result = obj.stock.map((x) => {
            return {
                link: x.buy_now_url,
                name: x.description,
                image: x.image_url,
                datasheet: x.datasheet_url,
                supplier: x.distributor.distributor_name,
                supplier_nr: x.sku,
                logo: x.distributor.distributor_logo,
                manufacturer: x.manufacturer,
                manufacturer_nr: x.part_number,
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
                            return item.supplier;
                        }))],
                    }
                });
            });
    };

    return (
        <>
            <h4>Find part by manufacturer-nr or supplier-nr</h4>
            {/* <button
                type="button"
                onClick={() => {
                    onSelect(mock);
                    setState({ ...state, selected: mock });
                }}
            >
                MOCK SELECT

            </button> */}
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
                            key={cuid()}
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
                                        <ul className="distributor--item" data-distributor={item.supplier}>
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
                                                            style={color(item.supplier)}
                                                        >
                                                            {item.supplier}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span
                                                            uk-icon="icon: plus"
                                                            role="button"
                                                            tabIndex="0"
                                                            onKeyDown={() => { }}
                                                            onClick={() => {
                                                                onSelect(item);
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
                                                            href={item.link}
                                                            disabled={item.link === ''}
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
                                                {item.manufacturer_nr}
                                            </li>
                                            <li className="distributor--description">
                                                {item.name}
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

        </>
    );
};
