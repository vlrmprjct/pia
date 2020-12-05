import { Router } from 'express';
import request from 'request';
import os from 'os';
import { config } from 'dotenv-flow';
import databaseClientFactory from './databaseClient';

config();

const databaseClient = databaseClientFactory();
const apiRouter = Router();

apiRouter.get('/getUsername', (req, res) => {
    res.send({ username: os.userInfo().username });
});

apiRouter.get('/octopart/:query?', (req, res) => {
    request({
        uri: 'https://octopart.com/api/v3/parts/search',
        qs: {
            apikey: process.env.OCTOPART_API_KEY,
            q: req.params.query
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

apiRouter.get('/wikis/get/:id?', (req, res) => {
    const entries = databaseClient.getEntry(req.params.id);
    res.status(200).send(entries);
});

apiRouter.post('/part', (req, res) => {
    const updateEntry = databaseClient.updateEntry(req.body);
    res.status(200).send(updateEntry);
});

apiRouter.post('/addpart', (req, res) => {
    const addItem = databaseClient.addEntry(req.body);
    res.status(200).send(addItem);
});

export default apiRouter;
