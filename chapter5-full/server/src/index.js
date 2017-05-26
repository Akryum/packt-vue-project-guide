import bodyParser from 'body-parser'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import uuid from 'uuid/v4'

import './auth'

import routes from './routes'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(session({
  genid: () => uuid(),
  secret: 'TR7_9cDZ5Re-@lT3Z1|58F',
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}))

routes(app)

app.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`)
})
