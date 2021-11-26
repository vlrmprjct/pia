import React, { useEffect } from 'react';
import { useFocus } from './../utils/usefocus';

export const Filter = ({
    count,
    value,
    onChange,
}) => {
    const [inputRef, setInputFocus] = useFocus();

    useEffect(() => {
        setInputFocus();
    }, []);

    return (
        <input
            ref={inputRef}
            className="filter uk-input"
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={`Search in ${count} records ...`}
        />
    );
};
