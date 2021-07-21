import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import Header from 'atoms/Header'
import WeeklyForecast from 'organism/WeeklyForecast'
import HourlyForecast from 'organism/HourlyForecast'

const Root = styled.div`
  padding: 0 12px 12px;
  max-width: 980px;
  margin: auto;
`

function App() {
  return (
    <Root>
      <Header>Weather Forecast App</Header>
      <main>
        <Switch>
          <Route exact path="/">
            <WeeklyForecast />
          </Route>
          <Route path="/:id">
            <HourlyForecast />
          </Route>
        </Switch>
      </main>
    </Root>
  )
}

export default App
