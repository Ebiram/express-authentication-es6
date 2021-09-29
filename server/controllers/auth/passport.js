import passport from 'passport'
import passport_local from 'passport-local'
const LocalStrategy = passport_local('Strategy')
import { validatePassword } from './utils.js'
import User from '../../models/user.js'

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

export default passport