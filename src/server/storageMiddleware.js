import Gitrows from 'gitrows';
import cuid from 'cuid';
import date from 'date-and-time';

const storageMiddleware = (req, res, next) => {

    if (req.isAuthenticated()) {

        req.userID = req.session.passport.user.id;
        req.userName = req.session.passport.user.username;

        const now = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

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

        gitrows.get(process.env.DB_PATH + 'structure.json')
            .then((data) => {

                const getColumns = Object.fromEntries(
                    // eslint-disable-next-line no-unused-vars
                    Object.entries(data).map(([key, value]) =>
                        [`${value.name}`, '']
                    )
                );

                const exampleData = {
                    ...getColumns,
                    ...{
                        "id": cuid(),
                        'name': 'Example part',
                        'date_created': now,
                        'date_updated': now,
                    }
                };

                gitrows.create('@github/vlrmprjct/pia-database/' + req.userID + '/parts.json', [exampleData])
                    .then(() => {
                        gitrows.put('@github/vlrmprjct/pia-database/' + req.userID + '/projects.json', [{}])
                            .then(() => {
                                gitrows.put('@github/vlrmprjct/pia-database/' + req.userID + '/settings.json', [{}])
                                    .then(() => { })
                                    .catch(() => { });
                            })
                            .catch(() => { });
                    })
                    .catch(() => { });

            });
    }
    next();
};

export default storageMiddleware;
