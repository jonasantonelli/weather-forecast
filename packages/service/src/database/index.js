import mongoose from 'mongoose'
import ForecastModel from './forecast-model'
import forecastFixtures from '../fixtures/forecast.json'
import config from '../config'

async function connectDB() {
  try {
    await mongoose.connect(config.database.uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected!')

    if (process.env.SEED === 'forecast') {
      seedForecast()
    }
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

async function seedForecast() {
  await ForecastModel.deleteMany()
  if (forecastFixtures) {
    await ForecastModel.insertMany(forecastFixtures)
  }
  console.log('Collection seeded!')
}

export { connectDB, mongoose as default }
