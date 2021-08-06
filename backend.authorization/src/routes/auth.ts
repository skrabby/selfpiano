import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }

        req.logIn(user, { session: false }, (error) => {
            if (error) { return next(error); }
            const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
            return res.json({token});
        });
    })(req, res, next);
});

router.get('/verify',(req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return res.status(400).json({error: err})
        }
        if (!user) {
            return res.status(401).json({errorMessage: 'Invalid token received'})
        }
        return res.json(user);
    })(req, res, next);
});

export default router;