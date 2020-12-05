const isObject = (objValue) => {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
};

export const initLocalStorage = () => {
    if (localStorage.getItem('pia') === null) {
        localStorage.setItem('pia', JSON.stringify({}));
    }
    return true;
};

export const getLocalStorage = (item) => {
    const retrieveObject = JSON.parse(localStorage.getItem('pia'));
    return retrieveObject[item];
};

export const setLocalStorage = (item) => {
    if (!isObject(item)) {
        return false;
    }
    const retrieveObject = JSON.parse(localStorage.getItem('pia'));
    localStorage.setItem('pia', JSON.stringify({
        ...retrieveObject,
        ...item,
    }));
    return true;
};
