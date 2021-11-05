import 'dotenv-flow/config';
import { Router } from 'express';
import Gitrows from 'gitrows';
import request from 'request';

const apiRouter = Router();

const userParts = (id) => process.env.DB_PATH + id + '/parts.json';

const gitrows = new Gitrows({
    user: 'vlrmprjct',
    author: {
        name: 'GitRows',
        email: 'api@gitrows.com',
    },
    token: process.env.GITHUB_ACCESS,
    strict: false,
});

const defaultRoute = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send({
            'status': 'unauthorized',
            'message': 'authentication is required',
        });
    } else {
        next();
    }
};

apiRouter.get("/*", defaultRoute);

apiRouter.get('/success', (req, res) => {
    request({
        method: 'get',
        uri: `https://api.github.com/user`,
        headers: {
            Authorization: 'token ' + req.session.token,
            'User-Agent': req.headers['user-agent'],
        }
    }).pipe(res);
});

apiRouter.get('/oemsecret/:query?', (req, res) => {
    request({
        uri: 'https://beta.api.oemsecrets.com/partsearch',
        qs: {
            apiKey: process.env.OEMSECRET_API_KEY,
            // currency: 'EUR',
            // countryCode: 'DE',
            // groupBy: 'distributor_name',
            searchTerm: req.params.query
        }
    }).pipe(res);
});

apiRouter.get('/mouser/:query?', (req, res) => {
    request({
        uri: 'https://api.mouser.com/api/v1.0/search/keyword',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "SearchByKeywordRequest": {
                "keyword": req.params.query,
                "records": 0,
                "startingRecord": 0,
                // "searchOptions": "string",
                // "searchWithYourSignUpLanguage": "string"
            }
        }),
        qs: {
            apikey: process.env.MOUSER_API_KEY
        }
    }).pipe(res);
});

apiRouter.get('/parts', (req, res) => {
    gitrows.get(userParts(req.dbname))
        .then((data) => {
            res.status(200).send(data && data);
        });
});

apiRouter.get('/partcolumns', (req, res) => {
    gitrows.get(process.env.DB_PATH + 'structure.json')
        .then((data) => {
            res.status(200).send(data);
        });
});

// apiRouter.post('/part', (req, res) => {
//     const updateEntry = databaseClient(req.dbname).updateEntry(req.body);
//     res.status(200).send(updateEntry);
// });

// apiRouter.get('/part/:id?', (req, res) => {
//     const entries = databaseClient(req.dbname).getEntry(req.params.id);
//     res.status(200).send(entries);
// });

// apiRouter.post('/addpart', (req, res) => {
//     const addItem = databaseClient(req.dbname).addEntry(req.body);
//     res.status(200).send(addItem);
// });

apiRouter.get('/latestentries', (req, res) => {
    gitrows.get(userParts(req.dbname))
        .then((data) => {
            res.status(200).send(data && data.slice(-5));
        });
});

export default apiRouter;
