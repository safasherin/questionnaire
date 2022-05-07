const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const passportJwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}

module.exports = async (passport) => {
    await passport.use(
        new JwtStrategy(
            passportJwtConfig,
            (jwt_payload, done) => {
                User.findById({ _id: jwt_payload.id },
                    (err, user) => {
                        if (err) {
                            return done(err, false);
                        }
                        if (user) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }
                );
                // console.log(jwt_payload)
            }
        )
    )
}
