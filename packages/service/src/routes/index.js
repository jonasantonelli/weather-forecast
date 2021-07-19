import express from 'express'
import { getForecastRouter } from './forecast'

function getRoutes() {
  const router = express.Router()
  router.use('/forecast', getForecastRouter())
  return router
}
export { getRoutes }
