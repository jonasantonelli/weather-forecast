import express from 'express'
import { list, save, remove } from '../database/forecast-model'
import validator from '../middlewares/validator'
import { bodyMetadataSchema } from '../schemas/forecast'

function getForecastRouter() {
  const router = express.Router()
  router.post('/', post, validator.body(bodyMetadataSchema))
  router.get('/', get)
  router.delete('/', deleteAll)
  return router
}

async function get(req, res) {
  try {
    let forecasts,
      error = false

    forecasts = await list(req.query)

    if (forecasts) {
      return res.status(200).send(forecasts)
    } else {
      return res.status(error ? 500 : 404).send('not found')
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}

async function post(req, res) {
  const { date, location, weather } = req.body

  const savedModel = await save({
    date,
    location,
    weather,
  })

  return res.status(200).json(savedModel)
}

async function deleteAll(_, res) {
  await remove()
  return res.status(200).json({})
}

export { getForecastRouter }
