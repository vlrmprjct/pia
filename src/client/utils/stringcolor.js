export const stringToColour = (str, opacity = 'FF') => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var x = 0; x < 3; x++) {
        var value = (hash >> (x * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour + opacity;
};
