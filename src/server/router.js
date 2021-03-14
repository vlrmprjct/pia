import 'dotenv-flow/config';
import { Router } from 'express';
import request from 'request';
import databaseClientFactory from './databaseClient';

const databaseClient = databaseClientFactory();
const apiRouter = Router();

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
    const entries = databaseClient.listEntries();
    res.status(200).send(entries);
});

apiRouter.get('/partcolumns', (req, res) => {
    const entries = databaseClient.getPartColumns();
    res.status(200).send(entries);
});

apiRouter.post('/part', (req, res) => {
    const updateEntry = databaseClient.updateEntry(req.body);
    res.status(200).send(updateEntry);
});

apiRouter.get('/part/:id?', (req, res) => {
    const entries = databaseClient.getEntry(req.params.id);
    res.status(200).send(entries);
});

apiRouter.post('/addpart', (req, res) => {
    const addItem = databaseClient.addEntry(req.body);
    res.status(200).send(addItem);
});

apiRouter.get('/latestentries', (req, res) => {
    const entries = databaseClient.latestEntries(req.body);
    res.status(200).send(entries);
});

export default apiRouter;
