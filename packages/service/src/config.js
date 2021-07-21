module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  database: {
    uri:
      process.env.MONGODB_URL || 'mongodb://localhost:27017/weather-forecast',
  },
}
