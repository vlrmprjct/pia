import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/login/github', passport.authenticate('github', { scope: ['gist'] }));

authRouter.get('/logout', (req, res) => {
    delete req.session.token;
    delete req.session.passport;
    req.logout();
    res.redirect('/login');
});

authRouter.get('/login',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    });

export default authRouter;
