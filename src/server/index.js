import express from 'express';
import databaseMiddleware from './databaseMiddleware';
import apiRouter from './router';

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(databaseMiddleware);
app.use(express.static('dist'));
app.use('/api', apiRouter);
app.listen(process.env.PORT || 8080, () => {
    console.info(`Listening on port ${process.env.PORT || 8080}!`);
});
