import logger from 'loglevel'

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else {
    if (error && error.error && error.error.isJoi) {
      return res.status(400).json({
        type: error.type,
        message: error.error.toString(),
        details: error.error.details,
      })
    }

    logger.error(error)

    // I do not provide information about
    // unknown errors for security reasons
    res.status(500).json({})
  }
}

export default errorMiddleware
