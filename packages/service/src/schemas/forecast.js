import joi from 'joi'

const bodyMetadataSchema = () =>
  joi.object({
    date: joi.date().required(),
    location: joi.object({
      city: joi.string().required(),
      country: joi.string().required(),
    }),
    weather: joi.string(),
    weatherHourly: joi.array().items(
      joi.object({
        time: joi.date().required(),
        temp: joi.number(),
        fells_like: joi.number(),
        temp_min: joi.number(),
        temp_max: joi.number(),
        humidity: joi.number(),
        clouds: joi.number().max(100),
        wind_speed: joi.number(),
      }),
    ),
  })

export { bodyMetadataSchema }
