export const scroll = (() => {
    let timer;
    return (e) => {
        if (e.target.classList.contains('on-scrollbar') === false) {
            e.target.classList.add('on-scrollbar');
        }
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            e.target.classList.remove('on-scrollbar');
        }, 3000);
    };
})();
