export const fetchAPI = async (apiUrl, callback, options = {}) => {

    const mapOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        ...options,
    };

    try {
        const response = await fetch(apiUrl, mapOptions);
        const data = await response.json();
        if (response.status === 401 && !response.url.includes('success')) {
            window.location.replace("/login");
            return false;
        }
        return callback(data, response);
    } catch (error) {
        throw error;
    }
};
