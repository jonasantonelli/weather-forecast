import express from 'express'
// this is all it takes to enable async/await for express middleware
import 'express-async-errors'
import cors from 'cors'
import logger from 'loglevel'
import errorMiddleware from './middlewares/error'

import config from './config'
import { getRoutes } from './routes'

const isProduction = process.env.NODE_ENV === 'production'

function startServer({ port = config.port } = {}) {
  const app = express()

  if (!isProduction) {
    app.use(cors())
  }

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use('/', getRoutes())

  app.use(errorMiddleware)

  app.listen(port, () => {
    console.log(`Express app started on port ${port}`)
  })
}

export { startServer }
