import styled from 'styled-components'
import { useForecastContext } from 'context/forecast'
import DayCard from 'organism/DayCard'

import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import getHours from 'date-fns/getHours'
import addHours from 'date-fns/addHours'
import isEqual from 'date-fns/isEqual'
import { FORMAT_DATE } from 'utils/config'

const Root = styled.div`
  width: 100%;
  grid-template-columns: minmax(80px, 170px) minmax(80px, 170px);
  grid-template-rows: auto;
  column-gap: 14px;
  row-gap: 14px;
  display: grid;
  grid-template-areas:
    'today today'
    '2 3'
    '4 5'
    '6 7';
`

function resolveForecasts({ location, date: dateProp, weather, _id }) {
  const date = new Date(dateProp).setHours(0, 0, 0, 0)
  const today = isToday(date)
  const dayWeek = format(date, 'ccc')
  const dayMonth = format(date, 'LLL dd')

  let temp, min, max

  if (today) {
    const current = format(addHours(date, getHours(new Date())), FORMAT_DATE, {
      timeZone: 'UTC',
    })

    const currentWeather = weather.find(w =>
      isEqual(new Date(w.time), new Date(current)),
    )
    temp = currentWeather?.temp
  } else {
    min = Math.min(...weather.map(w => w.temp_min))
    max = Math.max(...weather.map(w => w.temp_max))
  }

  return {
    key: _id,
    date: format(date, 'yyyy-MM-dd'),
    temp,
    min,
    max,
    dayWeek,
    dayMonth,
    today,
    location: location?.city,
  }
}

const WeekForecast = () => {
  const { search } = useForecastContext()

  const { isIdle, isLoading, forecasts } = search

  if (isIdle) {
    return null
  }

  if (isLoading || !forecasts) {
    return (
      <Root>
        <p>Loading...</p>
      </Root>
    )
  }

  return (
    <Root>
      {forecasts.map(resolveForecasts).map(props => (
        <DayCard {...props} />
      ))}
    </Root>
  )
}

export default WeekForecast
