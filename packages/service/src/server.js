import express from 'express'
// this is all it takes to enable async/await for express middleware
import 'express-async-errors'
import cors from 'cors'
import logger from 'loglevel'

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

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose)
        })
      }
      setupCloseOnExit(server)
      resolve(server)
    })
  })
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production'
        ? null
        : { stack: error.stack }),
    })
  }
}

function setupCloseOnExit(server) {
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed')
      })
      .catch(e => {
        logger.warn('Something went wrong closing the server', e.stack)
      })
    if (options.exit) process.exit()
  }
  process.on('exit', exitHandler)
  process.on('SIGINT', exitHandler.bind(null, { exit: true }))
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }))
}

export { startServer }
