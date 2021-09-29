const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { validatePassword } = require('./utils')
const User = require('../../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            const isValid = validatePassword(password, user.hash, user.salt)
            if (!isValid) {
                return done(null, false)
            }
            return done(null, user)
        })
    }
))

module.exports = passport