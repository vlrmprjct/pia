import 'dotenv-flow/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-github';
import databaseMiddleware from './databaseMiddleware';
import authRouter from './authRouter';
import apiRouter from './apiRouter';

const app = express();

passport.use(new Strategy({
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: '/api/login',
    passReqToCallback: true,
},(req, accessToken, refreshToken, profile, cb) => {
    req.session.token = accessToken;
    return cb(null, profile);
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(session({
    name: 'pia.sid',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('dist'));

app.use(passport.initialize());
app.use(passport.session());

app.use(databaseMiddleware);

app.use((req, res, next) => {
    next();
});

app.use('/api', authRouter);
app.use('/api', apiRouter);
app.listen(process.env.PORT || 8080, () => {
    console.info(`Listening on port ${process.env.PORT || 8080}!`);
});
