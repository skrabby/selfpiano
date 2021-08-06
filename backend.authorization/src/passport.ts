import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
     (email, password, cb)  => {
        // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        // return UserModel.findOne({email, password})
        //     .then(user => {
        //         if (!user) {
        //             return cb(null, false, {message: 'Incorrect email or password.'});
        //         }
        //         return cb(null, user, {message: 'Logged In Successfully'});
        //     })
        //     .catch(err => cb(err));
         return cb(null, {username: 'user', email: 'user@gmail.com', firstName: 'Duc', lastName: 'Truong'});
    }
));

passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET_KEY
    },
    (jwtPayload, cb) => {
        return cb(null, jwtPayload);
    }
));


export default passport;