import passport from 'passport'
import { initData } from './providers'
import * as Users from './connectors/users'
import * as Questions from './connectors/questions'
import * as Tickets from './connectors/tickets'

initData()

function sendUserInfo (req, res) {
  res.json({
    _id: req.user._id,
    username: req.user.username,
  })
}

export default function (app) {
  app.get('/questions', async (req, res) => {
    const result = await Questions.getAll()
    setTimeout(() => {
      res.json(result)
    }, 1500)
  })

  app.post('/signup', async (req, res) => {
    try {
      if (req.user) {
        throw Error('Unauthorized')
      } else {
        const newDoc = await Users.createUser({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        })
        res.send('ok')
      }
    } catch (e) {
      res.status(403).send(e.message)
    }
  })

  app.post('/login', (req, res, next) => {
    if (req.user) {
      res.status(403).send('Unauthorized')
    } else {
      next()
    }
  }, passport.authenticate('local', {
    failWithError: true,
  }), (req, res) => {
    sendUserInfo(req, res)
  }, (err, req, res, next) => {
    res.status(403).send(err)
  })

  app.post('/user', (req, res) => {
    if (req.user) {
      sendUserInfo(req, res)
    } else {
      res.status(403).send('Unauthorized')
    }
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.send('ok')
  })

  app.get('/tickets', async (req, res) => {
    if (!req.user) {
      res.status(403).send('Unauthorized')
    } else {
      const result = await Tickets.getAll(req.user)
      res.json(result)
    }
  })
}
