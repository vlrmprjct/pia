export const fetchAPI = async (apiUrl, callback) => {
    try {
        const response = await fetch(apiUrl);
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
