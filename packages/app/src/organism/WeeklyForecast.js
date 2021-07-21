import styled from 'styled-components'
import { useForecastContext } from 'context/forecast'
import Search from './Search'
import DayCard from 'atoms/DayCard'
import Title from 'atoms/Title'
import BaseGrid from 'atoms/Grid'
import Loading from 'atoms/Loading'
import NotFound from 'atoms/NotFound'

import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import getHours from 'date-fns/getHours'
import parseISO from 'date-fns/parseISO'
import addHours from 'date-fns/addHours'
import isEqual from 'date-fns/isEqual'
import { FORMAT_DATE, getPeriod, periods, weatherStatus } from 'utils/config'

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Grid = styled(BaseGrid)`
  grid-template-columns: minmax(80px, 170px) minmax(80px, 170px);
  grid-template-areas:
    'today today'
    '2 3';
`

function mapWeeklyForecasts(forecasts = []) {
  return forecasts.map(forecast => {
    const {
      location,
      date,
      weather: weatherProp,
      weatherHourly,
      _id,
    } = forecast
    const currentHour = getHours(new Date())
    const current = format(addHours(parseISO(date), currentHour), FORMAT_DATE)

    const currentParsed = parseISO(current)

    const today = isToday(currentParsed)

    let title = format(currentParsed, 'ccc')
    let subtitle = format(currentParsed, 'LLL dd')

    let temp,
      min,
      period,
      weather = weatherProp === 'clear' ? weatherStatus.sun : weatherProp

    if (today) {
      title = getPeriod(currentHour) === periods.day ? 'Today' : 'Tonight'
      subtitle = format(new Date(), 'LLL dd HH:mm')

      if (
        weather === weatherStatus.sun &&
        getPeriod(currentHour) === periods.night
      ) {
        weather = weatherStatus.moon
      }

      const currentWeather = weatherHourly.find(w =>
        isEqual(new Date(w.time), new Date(current)),
      )

      temp = currentWeather?.temp
    } else {
      min = Math.min(...weatherHourly.map(w => w.temp_min))
      const sum = weatherHourly.reduce((prev, curr) => prev + curr.temp, 0)
      temp = Math.round(sum / weatherHourly.length) || 0
    }

    return {
      id: _id,
      date,
      period,
      temp,
      min,
      title,
      subtitle,
      today,
      location,
      weather,
    }
  })
}

const WeekForecast = () => {
  const { search, city } = useForecastContext()

  const { isLoading, forecasts } = search

  return (
    <Root>
      <Search />
      {city && <Title>{city}</Title>}

      {isLoading ? (
        <Root>
          <Loading />
        </Root>
      ) : forecasts.length ? (
        <Grid>
          {mapWeeklyForecasts(forecasts).map(({ id, ...rest }) => (
            <DayCard key={id} id={id} {...rest} />
          ))}
        </Grid>
      ) : (
        city && <NotFound>Forecast not found</NotFound>
      )}
    </Root>
  )
}

export default WeekForecast
