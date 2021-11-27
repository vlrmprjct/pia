import UIkit from 'uikit';

export const notification = ({
    expectedCode = 200,
    code = null,
    message = 'Success',
    timeout = 2000,
    pos = 'top-right',
    type = 'success',
}) => {

    UIkit.notification({
        message: (code === expectedCode)
            ? message
            : 'Oops, something went wrong!',
        status: (code === expectedCode)
            ? type
            : 'danger',
        pos,
        timeout,
    });

    return null;

};
