export const fetchAPI = async (apiUrl, callback) => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return callback(data);
    } catch (error) {
        throw error;
    }
};
