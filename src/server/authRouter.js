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

// https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&scope=gist&client_id=f6b7044bab13d95678e3
