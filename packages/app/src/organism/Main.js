import styled from 'styled-components'
import { Switch, Route, useParams } from 'react-router-dom'
import { useForecastContext } from 'context/forecast'
import WeeklyForecast from './WeeklyForecast'

const CityTitle = styled.h2`
  text-align: center;
  font-size: 27px;
  font-weight: 400;
  margin: 0 0 22px;
  color: var(--color-primary);
`

const HourlyForecast = () => {
  const { city, day } = useParams()

  return (
    <div>
      {city} {day}{' '}
    </div>
  )
}

const Main = () => {
  const { city } = useForecastContext()
  return (
    <>
      <CityTitle>{city}</CityTitle>
      <Switch>
        <Route exact path="/">
          <WeeklyForecast />
        </Route>
        <Route path="/:city/:day">
          <HourlyForecast />
        </Route>
      </Switch>
    </>
  )
}

export default Main
