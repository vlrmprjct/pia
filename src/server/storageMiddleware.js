import Gitrows from 'gitrows';

const storageMiddleware = (req, res, next) => {

    if (req.isAuthenticated()) {

        req.dbname = req.session.passport.user.id;

        req.userID = req.session.passport.user.id;
        req.userName = req.session.passport.user.username;

        // TODO: Add default initial data
        const data = { "id": "123", "name": "bar", "type": "ipsum" };

        const gitrows = new Gitrows({
            user: "vlrmprjct",
            author: {
                name: req.userID,
                email: req.userID,
            },
            message: 'user dir ' + req.userID + ' for ' + req.userName + ' created',
            token: process.env.GITHUB_ACCESS,
            strict: false,
        });

        gitrows.create('@github/vlrmprjct/pia-database/' + req.userID + '/parts.json', [data])
            .then(() => {
                gitrows.put('@github/vlrmprjct/pia-database/' + req.userID + '/projects.json', [{}])
                    .then(() => {
                        gitrows.put('@github/vlrmprjct/pia-database/' + req.userID + '/settings.json', [{}])
                            .then(() => {})
                            .catch(() => {});
                    })
                    .catch(() => {});
            })
            .catch(() => {});
    }
    next();
};

export default storageMiddleware;
