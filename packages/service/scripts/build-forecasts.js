const faker = require('faker/locale/en')
const format = require('date-fns/format')
const addDays = require('date-fns/addDays')

const locations = [
  {
    city: 'Florianópolis',
    country: 'BR',
  },
  {
    city: 'Zaragoza',
    country: 'ES',
  },
  {
    city: 'London',
    country: 'GB',
  },
]

const averageWeather = ['rain', 'clear', 'snow']

function createWeeklyData() {
  const current = new Date().setHours(0, 0, 0, 0)
  const dates = []

  for (let day = 0; day < 14; day++) {
    dates.push(addDays(current, day))
  }

  return dates
}

function createHourlyData(date) {
  const hours = []
  for (let hour = 0; hour < 24; hour++) {
    const next = new Date(date).setHours(hour, 0, 0, 0)
    hours.push(format(next, "yyyy-MM-dd'T'HH:mm:ss'Z'"))
  }

  return hours
}

function createWeatherData(hour) {
  return {
    time: hour,
    temp: faker.datatype.number({ min: 8, max: 35 }),
    fells_like: faker.datatype.number({ min: 12, max: 35 }),
    temp_min: faker.datatype.number({ min: 8, max: 25 }),
    temp_max: faker.datatype.number({ min: 25, max: 35 }),
    humidity: faker.datatype.number({ min: 0, max: 100 }),
    clouds: faker.datatype.number({ min: 0, max: 100 }),
    wind_speed: faker.datatype.float({ min: 0, max: 10 }),
  }
}

function generate() {
  const week = createWeeklyData()
  const data = []

  locations.forEach(location => {
    week.forEach(date => {
      const hours = createHourlyData(date)
      data.push({
        date,
        location,
        weather:
          averageWeather[Math.floor(Math.random() * averageWeather.length)],
        weatherHourly: hours.map(hour => createWeatherData(hour)),
      })
    })
  })
  return data
}
const db = generate()

console.log(JSON.stringify(db))
