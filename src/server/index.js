import 'dotenv-flow/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-github';
import storageMiddleware from './storageMiddleware';
import authRouter from './authRouter';
import apiRouter from './apiRouter';

const app = express();

passport.use(new Strategy({
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "/api/login",
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
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    // cookie: { maxAge: 5000 },
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('dist'));

app.use(passport.initialize());
app.use(passport.session());

app.use(storageMiddleware);

app.use((req, res, next) => {
    next();
});

// app.use((req, res, next) => {
//     //Checking previously set cookie (if there is one)
//     const session = req.session.cookie._expires || '';
//     console.log(session);
//     console.log(new Date());

//     console.log(session.getTime());
//     console.log(new Date().getTime());


//     // var d1 = new Date();
//     // var d2 = new Date(d1);

//     console.log(session.getTime() < new Date().getTime()); // prints true (correct)


//     // res.redirect('/loginxx');
//     if (session && new Date(session) < new Date()) {
//         console.log('User session has expired.');
//         // res.redirect('/login');
//     }

//     //Resetting the cookie
//     // res.cookie('session', JSON.stringify({
//     //     session: <sessionIDKeyHere>, expires: Date.now() + 3600000 }), {
//     //         expires: new Date(2037, 0, 1),
//     //         httpOnly: true,
//     //         secure: true //Do you have https? If no, set to false
//     // });

//     next();
// });

app.use('/api', authRouter);
app.use('/api', apiRouter);

app.listen(process.env.PORT || 5000, () => {
    console.info(`Listening on port ${process.env.PORT || 5000}! 👾`);
});
