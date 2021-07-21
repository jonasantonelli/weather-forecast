import express from 'express'
import {
  getWeeklyByLocation,
  getAll,
  save,
  remove,
} from '../database/forecast-model'
import validator from '../middlewares/validator'
import { bodyMetadataSchema } from '../schemas/forecast'

function getForecastRouter() {
  const router = express.Router()
  router.post('/', post, validator.body(bodyMetadataSchema))
  router.get('/', get)
  router.get('/weekly', weekly)
  router.delete('/', deleteAll)
  return router
}

async function weekly(req, res) {
  try {
    let forecasts,
      error = false

    forecasts = await getWeeklyByLocation(req.query)

    if (forecasts && forecasts.length) {
      return res.status(200).send(forecasts)
    } else {
      return res.status(error ? 500 : 404).send('not found')
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}

async function get(req, res) {
  try {
    let forecasts,
      error = false

    forecasts = await getAll()

    if (forecasts && forecasts.length) {
      return res.status(200).send(forecasts)
    } else {
      return res.status(error ? 500 : 404).send('not found')
    }
  } catch (e) {
    return res.status(400).json(e)
  }
}

async function post(req, res) {
  const { date, location, weather, weatherHourly } = req.body

  const savedModel = await save({
    date,
    location,
    weather,
    weatherHourly,
  })

  return res.status(200).json(savedModel)
}

async function deleteAll(_, res) {
  await remove()
  return res.status(200).json({})
}

export { getForecastRouter }
