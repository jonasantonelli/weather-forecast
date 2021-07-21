import addDays from 'date-fns/addDays'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import mongoose from './index'

const ForecastSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  weather: String,
  weatherHourly: [
    {
      time: { type: Date, required: true },
      temp: { type: Number, required: true },
      fells_like: Number,
      temp_min: Number,
      temp_max: Number,
      humidity: Number,
      clouds: Number,
      wind_speed: Number,
    },
  ],
})

const ForecastModel = mongoose.model('Forecast', ForecastSchema, 'forecast')

const getWeeklyByLocation = ({ location, date = startOfDay(new Date()) }) => {
  const aggregation = [{ $sort: { date: 1 } }]
  const match = {}

  const to = addDays(endOfDay(date), 6)

  match.date = { $gte: date, $lte: to }

  if (location) {
    match['location.city'] = { $regex: new RegExp(location, 'i') }
  }

  aggregation.push({ $match: match })

  return ForecastModel.aggregate(aggregation)
}

const getAll = () => {
  return ForecastModel.find()
}

const remove = () => {
  return ForecastModel.deleteMany()
}

const save = payload => {
  return new ForecastModel({
    ...payload,
  }).save()
}

export { ForecastModel as default, getAll, getWeeklyByLocation, remove, save }
