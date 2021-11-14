export const prepareForm = (data) => {

    return Object.fromEntries(
        Object.entries(data).map(([, value]) =>
            [`${value.name}`, '']
        )
    );
};
