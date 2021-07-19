import addDays from 'date-fns/addDays'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import format from 'date-fns/format'

import mongoose from './index'

const ForecastSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  rain: Boolean,
  snow: Boolean,
  weather: [
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

const list = ({
  location,
  from = startOfDay(new Date()),
  to = addDays(endOfDay(new Date()), 7),
}) => {
  const aggregation = [{ $sort: { date: 1 } }]
  const match = {}

  match.date = { $gte: from, $lte: to }

  if (location) {
    match['location.city'] = { $regex: new RegExp(location, 'i') }
  }

  aggregation.push({ $match: match })

  return ForecastModel.aggregate(aggregation)
}

const remove = id => {
  if (id) {
    return ForecastModel.deleteOne({ _id: id })
  }
  return ForecastModel.deleteMany()
}

const save = payload => {
  return new ForecastModel({
    ...payload,
  }).save()
}

export { ForecastModel as default, list, remove, save }
