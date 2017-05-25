import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Users } from './providers'

passport.use('local', new LocalStrategy(
  async (username, password, done) => {
    const { valid, user } = await authUser(username, password)
    if (valid) {
      return done(null, user)
    } else {
      return done(new Error('invalid username or password'))
    }
  }
))

passport.serializeUser(
  async (user, done) => {
    return done(null, user._id)
  }
)

passport.deserializeUser(
  async (id, done) => {
    const user = await Users.findOne({ _id: id })
    const err = !user ? new Error('user not found') : null
    return done(err, user)
  }
)
