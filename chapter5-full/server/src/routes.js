import { initData, Questions } from './providers'

initData()

export default function (app) {
  app.get('/questions', async (req, res) => {
    const result = await Questions.find({})
    res.send(JSON.stringify(result))
  })
}
